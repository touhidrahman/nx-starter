export interface OrganizationDto {
    type: string
    status: string
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    country: string
    postCode: string
    ownerId: string
    verified: string
}

export interface Organization extends OrganizationDto {
    id: string
    verifiedOn: string
    createdAt: string
    updatedAt: string
}
