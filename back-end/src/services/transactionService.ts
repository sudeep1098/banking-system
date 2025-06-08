import mongoose from 'mongoose';
import Account from '../models/Account';
import Transaction from '../models/Transaction';
import { TransactionType, TransactionStatus } from '../types/transaction';
import { validateTransfer } from './transactionValidator';
import { ValidationError } from '../errors/ValidationError';

export async function transferMoney(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    description?: string
) {
    const session = await mongoose.startSession();

    try {
        // This automatically retries on transient transaction errors internally (up to 3 times)
        const result = await session.withTransaction(async () => {
            const [fromAccount, toAccount] = await Promise.all([
                Account.findById(fromAccountId).session(session),
                Account.findById(toAccountId).session(session),
            ]);

            if (!fromAccount) throw new ValidationError('From account not found');
            if (!toAccount) throw new ValidationError('To account not found');

            validateTransfer(fromAccount, toAccount, amount);

            fromAccount.balance -= amount;
            toAccount.balance += amount;

            await fromAccount.save({ session });
            await toAccount.save({ session });

            const transaction = await new Transaction({
                fromAccount: fromAccount._id,
                toAccount: toAccount._id,
                type: TransactionType.TRANSFER,
                amount,
                status: TransactionStatus.COMPLETED,
                description,
            }).save({ session });

            return {
                message: 'Transfer successful',
                transactionId: transaction._id,
                amount: transaction.amount,
                status: transaction.status,
            };
        });

        return result;
    } catch (error) {
        console.error('Transaction failed:', error);
        if (error instanceof ValidationError) {
            throw error;
        }
        throw new Error('Transaction failed due to a server error');
    } finally {
        session.endSession();
    }
}

export async function runTransactionWithRetry(txFunc: () => Promise<any>, maxRetries = 3) {
    let retries = 0;

    while (true) {
        try {
            return await txFunc();
        } catch (error: any) {
            const isTransient = error?.hasErrorLabel?.('TransientTransactionError');

            if (retries >= maxRetries || !isTransient) {
                throw error;
            }

            retries++;
            console.warn(`Transient error. Retrying transaction... Attempt ${retries}`);
        }
    }
}
