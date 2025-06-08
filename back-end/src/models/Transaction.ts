import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose';
import { TransactionStatus, TransactionType } from '../types/transaction';

const transactionSchema = new Schema({
    fromAccount: { type: Schema.Types.ObjectId, ref: 'Account' },
    toAccount: { type: Schema.Types.ObjectId, ref: 'Account' },
    type: {
        type: String,
        enum: Object.values(TransactionType),
        required: true,
    },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(TransactionStatus),
        default: TransactionStatus.PENDING,
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

type ITransaction = InferSchemaType<typeof transactionSchema>;
export type TransactionDocument = HydratedDocument<ITransaction>;

export default model<TransactionDocument>('Transaction', transactionSchema);
