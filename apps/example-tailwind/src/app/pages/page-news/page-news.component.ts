import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardModule } from 'primeng/card'

interface news {
    image: string
    date: string
    title: string
    description: string
}
@Component({
    selector: 'app-page-news',
    imports: [CommonModule, CardModule],
    templateUrl: './page-news.component.html',
    styleUrl: './page-news.component.scss',
})
export class PageNewsComponent implements OnInit {
    breakingNews!: news
    topNews: news[] = []
    generalNews: news[] = []

    ngOnInit(): void {
        this.breakingNews = {
            image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
            date: 'February 19, 2021',
            title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
            description:
                'Explore the latest updates in employment lawand what they mean for both employers and employees Explore the latest updates in employment lawand what they mean for both employers and employees Explore the latest updates in employment lawand what they mean for both employers and employees Explore the latest updates in employment lawand what they mean for both employers and employees.',
        }

        this.topNews = [
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
        ]
        this.generalNews = [
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
            {
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                date: 'February 19, 2021',
                title: 'News Legal Reforms to Impact Corporate Taxation in 2024',
                description:
                    'Explore the latest updates in employment lawand what they mean for both employers and employees.',
            },
        ]
    }
}
