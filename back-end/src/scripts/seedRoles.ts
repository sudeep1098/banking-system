// scripts/seedRoles.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/Role';
import Permission from '../models/Permission';
import { UserRoles } from '../types/role';

dotenv.config();

const payload = [
    {
        name: UserRoles.ADMIN,
        permissions: [
            { name: 'manage_users', description: 'Create, update, delete users' },
            { name: 'view_all_accounts', description: 'Access all accounts in the system' },
            { name: 'manage_roles', description: 'Create and assign roles' }
        ],
        inherits: []
    },
    {
        name: UserRoles.MANAGER,
        permissions: [
            { name: 'approve_loans', description: 'Approve loan applications' },
            { name: 'view_branch_accounts', description: 'View accounts in branch' }
        ],
        inherits: [UserRoles.ADMIN]
    },
    {
        name: UserRoles.TELLER,
        permissions: [
            { name: 'deposit_cash', description: 'Deposit cash for customers' },
            { name: 'withdraw_cash', description: 'Withdraw cash for customers' }
        ],
        inherits: [UserRoles.MANAGER]
    },
    {
        name: UserRoles.CUSTOMER,
        permissions: [
            { name: 'view_own_account', description: 'View own account details' },
            { name: 'initiate_transaction', description: 'Start a transaction' }
        ],
        inherits: []
    },
    {
        name: UserRoles.LOAN,
        permissions: [
            { name: 'approve_loans', description: 'Approve loan applications' },
            { name: 'view_branch_accounts', description: 'View accounts in branch' }
        ],
        inherits: [UserRoles.ADMIN]
    },
    {
        name: UserRoles.KYC,
        permissions: [
            { name: 'verify_kyc', description: 'Verify KYC documents' }
        ],
        inherits: [UserRoles.ADMIN]
    },
    {
        name: UserRoles.AUDITOR,
        permissions: [
            { name: 'view_branch_accounts', description: 'View accounts in branch' },
            { name: 'view_logs', description: 'View system logs and audit trails' }
        ],
        inherits: [UserRoles.ADMIN]
    },
    {
        name: UserRoles.SUPPORT,
        permissions: [
            { name: 'respond_to_tickets', description: 'Handle customer support queries' },
            { name: 'view_branch_accounts', description: 'View accounts in branch' }
        ],
        inherits: [UserRoles.ADMIN]
    },
    {
        name: UserRoles.MERCHANT,
        permissions: [
            { name: 'manage_merchant_account', description: 'Manage merchant settings and transactions' },
            { name: 'view_branch_accounts', description: 'View accounts in branch' }
        ],
        inherits: [UserRoles.ADMIN]
    }
];

async function seedRolesAndPermissions() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to DB');

        const permissionMap = new Map<string, any>();
        const roleMap = new Map<string, any>();

        // Insert Permissions
        for (const role of payload) {
            for (const perm of role.permissions) {
                if (!permissionMap.has(perm.name)) {
                    const permission = await Permission.findOneAndUpdate(
                        { name: perm.name },
                        { $setOnInsert: perm },
                        { upsert: true, new: true }
                    );
                    permissionMap.set(perm.name, permission._id);
                }
            }
        }

        // Insert Roles
        for (const role of payload) {
            const permissionIds = role.permissions.map(p => permissionMap.get(p.name));
            const roleDoc = await Role.findOneAndUpdate(
                { name: role.name },
                { name: role.name, permissions: permissionIds },
                { upsert: true, new: true }
            );
            roleMap.set(role.name, roleDoc._id);
        }

        // Set Inheritance
        for (const role of payload) {
            const roleId = roleMap.get(role.name);
            const inheritedRoleIds = role.inherits.map(inherited => roleMap.get(inherited));
            await Role.findByIdAndUpdate(roleId, { inherits: inheritedRoleIds });
        }

        console.log('Roles and permissions seeded successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seedRolesAndPermissions();
