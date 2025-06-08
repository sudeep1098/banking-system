// Account Types
export const AccountType = {
    SAVINGS: 'SAVINGS',
    SALARY: 'SALARY',
    BSBDA: 'BSBDA',
    CURRENT: 'CURRENT',
    FIXED_DEPOSIT: 'FIXED_DEPOSIT',
    RECURRING_DEPOSIT: 'RECURRING_DEPOSIT',
    NRE: 'NRE',
    NRO: 'NRO',
    FCNR: 'FCNR',
    DEMAT: 'DEMAT',
} as const;

// KYC Statuses
export const KycStatus = {
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED',
} as const;

export type TAccountType = (typeof AccountType)[keyof typeof AccountType];
export type TKycStatus = (typeof KycStatus)[keyof typeof KycStatus];