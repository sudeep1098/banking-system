export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    roles: string[];
    accounts?: any[];
    addresses?: any[];
    governmentIds?: any[];
    status?: UserStatus;
    balance?: number;
    lastLogin?: string;
    createdAt?: string;
    updatedAt?: string;
}
