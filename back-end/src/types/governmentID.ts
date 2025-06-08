export const IGovernmentIdTypes = {
    AADHAR: 'AADHAR',
    PAN: 'PAN',
    PASSPORT: 'PASSPORT',
    DRIVER_LICENSE: 'DRIVER_LICENSE',
} as const

export type GovernmentIdType = typeof IGovernmentIdTypes[keyof typeof IGovernmentIdTypes]