export enum PlanRenewalType {
    Auto = 'auto',
    Manually = 'manually',
}

export interface PlanDto {
    name: string;
    description?: string;
    monthlyPrice: number;
    yearlyPrice?: number;
    discountPrice?: number;
    isActive: boolean;
    features?: string[];
    tier?: string;
    trialPeriodDays?: number;
    renewalType: string;
}

export interface Plan extends PlanDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
