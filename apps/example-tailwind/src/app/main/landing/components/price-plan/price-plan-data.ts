export type PricePlan = {
    id: number
    title: string
    price: number
    description: string
    features: string[]
    isPopular?: boolean
}

export const pricePlan: PricePlan[] = [
    {
        id: 1,
        title: 'Essential Counsel',
        price: 1000,
        description:
            'Start with this packages while you learn more About our services',

        features: [
            'Legal consultation (30 min per month)',
            'Legal document review (up to 5 pages )',
            ' Response time: 48 hours',
            ' Case management tools (basic)',
            'Monthly legal updates',
        ],
    },
    {
        id: 2,
        isPopular: true,
        title: 'Professional Counsel',
        price: 1500,
        description:
            'Start with this packages while you learn more About our services',

        features: [
            'Legal consultation: 1 hour per month',
            'Legal document review: up to 10 pages',
            'Response time: 24 hours',
            'Case management tools: standard',
            'Legal updates: bi-weekly',
        ],
    },
    {
        id: 3,
        title: 'Ultimate Counsel',
        price: 2000,
        description:
            'Start with this packages while you learn more About our services',

        features: [
            'Legal consultation: 2 hours per month',
            'Legal document review: up to 20 pages',
            'Response time: 12 hours',
            'Case management tools: premium',
            'Legal updates: weekly',
        ],
    },
]
