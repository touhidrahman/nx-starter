import { Usage } from './organization.model'

export interface PlanDto {
    allowedUsage: Usage
    cost: number
    name: string
    stripeId: string
}

export interface Plan extends PlanDto {
    id: string
    createdAt: Date
    updatedAt: Date
}
