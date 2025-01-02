export type GroupInput = {
    name: string
    email: string
    address: string
    phone: string
    city: string
    state: string
    country: string
    postCode: string
}

export type Group = GroupInput & {
    id: string
    type: 'client' | 'vendor'
    status: 'active' | 'inactive' | 'pending'
    ownerId: string
    verified: boolean
    verifiedOn: Date
    createdAt: Date
    updatedAt: Date
}
