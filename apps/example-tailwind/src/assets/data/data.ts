export type Hero = {
    title: string
    description: string
    image: string
}

export class Data {
    static readonly hero: Hero = {
        title: 'Resolve legal issues fast with Seresta.',
        description:
            'Connect with trusted legal experts, get instant advice, compare quotes, and resolve your legal issues—all in one easy-to-use app.',
        image: './../images/hero/2.png',
    }
}
