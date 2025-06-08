import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const roleSchema = new Schema({
    name: { type: String, required: true, unique: true }, // e.g., 'manager'
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    inherits: [{ type: Schema.Types.ObjectId, ref: 'Role' }], // for hierarchy
}, {
    timestamps: true,
});

type IRole = InferSchemaType<typeof roleSchema>;
export type RoleDocument = HydratedDocument<IRole>;
export default model<RoleDocument>('Role', roleSchema);
