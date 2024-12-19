import { Component, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SingleNewsComponent } from '../../features/news/components/single-news/single-news.component'
import { RouterLink } from '@angular/router'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-news',
    imports: [PrimeModules, FormsModule, SingleNewsComponent, RouterLink],
    templateUrl: './page-news.component.html',
    styleUrl: './page-news.component.css',
})
export class PageNewsComponent {
    status = ['Ordered', 'Unpaid', 'Paid', 'Confirmed', 'Cancelled']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    news = signal([
        {
            image: 'https://picsum.photos/200/300',
            title: 'Understanding Intellectual Property Law',
            description:
                'An in-depth look at the different types of intellectual property and how they can protect your creations...',
        },
        {
            image: 'https://picsum.photos/200/300',
            title: 'Understanding Intellectual Property Law',
            description:
                'An in-depth look at the different types of intellectual property and how they can protect your creations...',
        },
        {
            image: 'https://picsum.photos/200/300',
            title: 'Understanding Intellectual Property Law',
            description:
                'An in-depth look at the different types of intellectual property and how they can protect your creations...',
        },
    ])

    onEdit() {}
}
