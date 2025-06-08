// Transaction Statuses
export const TransactionStatus = {
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED',
} as const;

// Transaction Types
export const TransactionType = {
    DEPOSIT: 'DEPOSIT',
    WITHDRAWAL: 'WITHDRAWAL',
    TRANSFER: 'TRANSFER',
} as const;

export type TKycStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export type TTransactionType = (typeof TransactionType)[keyof typeof TransactionType];