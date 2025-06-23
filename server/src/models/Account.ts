import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose';
import { AccountType, KycStatus } from '../types/account';

const accountSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accountNumber: { type: String, required: true, unique: true },
    accountType: {
        type: String,
        required: true,
        enum: Object.values(AccountType),
    },
    balance: { type: Number, default: 0 },
    currency: { type: String, required: true, default: 'INR' },
    isActive: { type: Boolean, default: true },
    kycStatus: {
        type: String,
        enum: Object.values(KycStatus),
        default: KycStatus.PENDING,
    }, openedAt: { type: Date, default: Date.now }
});

type IAccount = InferSchemaType<typeof accountSchema>;
export type AccountDocument = HydratedDocument<IAccount>;

export default model<AccountDocument>('Account', accountSchema);
