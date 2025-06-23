import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
}, {
    timestamps: true,
});

userSchema.virtual('accounts', {
    ref: 'Account',
    localField: '_id',
    foreignField: 'userId',
    justOne: false,
});

userSchema.virtual('addresses', {
    ref: 'Address',
    localField: '_id',
    foreignField: 'userId',
    justOne: false,
});

userSchema.virtual('governmentIds', {
    ref: 'GovernmentId',
    localField: '_id',
    foreignField: 'userId',
    justOne: false,
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

type IUser = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<IUser>;

export default model<UserDocument>('User', userSchema);
