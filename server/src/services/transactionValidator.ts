import { AccountDocument } from '../models/Account';
import { KycStatus } from '../types/account';
import { ValidationError } from '../errors/ValidationError';

const MIN_TRANSFER = 1;
const MAX_TRANSFER = 1_000_000;

export function validateTransfer(
    fromAccount: AccountDocument,
    toAccount: AccountDocument,
    amount: number
) {
    if (!fromAccount.isActive) throw new ValidationError('From account is inactive');
    if (!toAccount.isActive) throw new ValidationError('To account is inactive');

    if (fromAccount.kycStatus !== KycStatus.VERIFIED) {
        throw new ValidationError('From account KYC not verified');
    }

    if (toAccount.kycStatus !== KycStatus.VERIFIED) {
        throw new ValidationError('To account KYC not verified');
    }

    if (fromAccount.currency !== toAccount.currency) {
        throw new ValidationError('Currency mismatch between accounts');
    }

    if (fromAccount.balance < amount) {
        throw new ValidationError('Insufficient balance in source account');
    }

    if (fromAccount._id?.equals(toAccount._id)) {
        throw new ValidationError('Cannot transfer to the same account');
    }

    if (amount < MIN_TRANSFER || amount > MAX_TRANSFER) {
        throw new ValidationError(`Amount must be between ${MIN_TRANSFER} and ${MAX_TRANSFER}`);
    }
}
