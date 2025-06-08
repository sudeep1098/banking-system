import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose';

const addressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
});

type IAddress = InferSchemaType<typeof addressSchema>;
export type AddressDocument = HydratedDocument<IAddress>;

export default model<AddressDocument>('Address', addressSchema);