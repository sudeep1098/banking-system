import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose';
import { IGovernmentIdTypes } from '../types/governmentID';

const governmentIdSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: Object.values(IGovernmentIdTypes),
        required: true,
    },
    number: { type: String, required: true },
    issuedDate: { type: Date },
    expiryDate: { type: Date },
}, {
    timestamps: true,
});

type IGovernmentId = InferSchemaType<typeof governmentIdSchema>;
export type GovernmentIdDocument = HydratedDocument<IGovernmentId>;

export default model<GovernmentIdDocument>('GovernmentId', governmentIdSchema);
