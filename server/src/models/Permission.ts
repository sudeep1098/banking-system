import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const permissionSchema = new Schema({
    name: { type: String, required: true, unique: true }, // e.g., 'view_account'
    description: { type: String },
}, {
    timestamps: true,
});

type IPermission = InferSchemaType<typeof permissionSchema>;
export type PermissionDocument = HydratedDocument<IPermission>;
export default model<PermissionDocument>('Permission', permissionSchema);
