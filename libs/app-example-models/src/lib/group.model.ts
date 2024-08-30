export interface GroupDto {
    id?: number
    name: string
    address?: string
    city?: string
    phone?: string
    postcode?: string
    type?: GroupType
    status?: GroupStatus
    email?: string
    country?: string
    updatedAt?: Date
    verified?: boolean
    verifiedOn?: Date
    createdAt?: Date
}

export enum GroupType {
    client = 'client',
    vendor = 'vendor',
}
export enum GroupStatus {
    active = 'active',
    inactive = 'inactive',
    pending = 'pending',
}
