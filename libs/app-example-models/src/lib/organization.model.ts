export interface Address {
    line1: string
    line2: string
    city: string
    state: string
    postalCode: string
    country: string
}

export interface OrganizationDto {
    name: string
    franchiseLevel?: number
}

export interface Organization extends OrganizationDto {
    id: string
    address?: Address
    cost: number
    isAdvertiser: boolean
    isTrialing: boolean
    planId?: string
    // plan?: Plan
    purchaseDate?: Date
    renewalDate?: Date
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    stripePlanId?: string
    stripeProductId?: string
    usage: Usage
    usageLimit: Usage
}

export interface Usage {
    aiUsageCount: number
    contentsCount: number
    usersCount: number
}
