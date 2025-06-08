export const UserRoles = {
    CUSTOMER: 'CUSTOMER',
    MERCHANT: 'MERCHANT',
    TELLER: 'TELLER',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN',
    AUDITOR: 'AUDITOR',
    SUPPORT: 'SUPPORT_OFFICER',
    KYC: 'KYC_OFFICER',
    LOAN: 'LOAN_OFFICER',
} as const;

export type TUserRole = (typeof UserRoles)[keyof typeof UserRoles];
