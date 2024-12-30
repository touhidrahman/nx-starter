import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TabsModule } from 'primeng/tabs'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-page-blogs',
    imports: [TabsModule, CommonModule, FormsModule],
    templateUrl: './page-blogs.component.html',
    styleUrl: './page-blogs.component.scss',
})
export class PageBlogsComponent implements OnInit {
    tabTags: string[] = []
    data: {
        tabTag: string[]
        image: string
        tags: string[]
        title: string
        description: string
        avatorImage: string
        name: string
        date: string
    }[] = []
    searchText!: string
    ngOnInit() {
        this.tabTags = ['All', 'Law', 'Legal Advice', 'Intellectual Property']

        this.data = [
            {
                tabTag: ['All', 'Law'],
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Legal Advice'],
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Intellectual Property'],
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Law'],
                image: 'https://img.freepik.com/free-photo/man-making-his-move_53876-64862.jpg?semt=ais_hybrid',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Legal Advice'],
                image: 'https://t3.ftcdn.net/jpg/02/03/20/66/360_F_203206616_G4fxzVYG6Q19PfoBTGf8tTh83KwRg5Sn.jpg',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Intellectual Property'],
                image: 'https://img.freepik.com/free-photo/man-making-his-move_53876-64862.jpg?semt=ais_hybrid',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Law'],
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Legal Advice'],
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
            {
                tabTag: ['All', 'Intellectual Property'],
                image: 'https://img.freepik.com/premium-photo/business-people-lawyers-discussing-contract-papers-sitting-table-concepts-law-advice-legal-services-morning-lightxa_1090013-584.jpg?w=1060',
                tags: ['Intellectual Property', 'Law', 'Legal Advice'],
                title: 'The Impact of Recent Changes in Employment Law',
                description:
                    'Explore the latest updates in employment law andwhat they mean for both employers and employees...',
                avatorImage:
                    'https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg',
                name: 'John Doe',
                date: 'Oct 25, 2924',
            },
        ]
    }

    onSearch() {
        console.log('Searching for:', this.searchText)
    }
}
