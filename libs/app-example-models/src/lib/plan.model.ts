export interface PlanDto {
    allowedUsage: string
    cost: number
    name: string
    stripeId: string
}

export interface Plan extends PlanDto {
    id: string
    createdAt: Date
    updatedAt: Date
}
