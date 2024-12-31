export type Group = GroupInput & {
    id: string
    type: 'client' | 'vendor'
    status: 'active' | 'inactive' | 'pending'
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postCode: string;
    ownerId: string
    verified: boolean
    verifiedOn: Date
    createdAt: Date
    updatedAt: Date
}

export type GroupInput = {
    name: string
    email: string
    phone: string
    address: string
    city: string
    country: string
}
