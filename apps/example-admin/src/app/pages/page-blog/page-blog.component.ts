import { Component, signal } from '@angular/core'
import { Button } from 'primeng/button'
import { InputText } from 'primeng/inputtext'
import { Select } from 'primeng/select'
import { FormsModule } from '@angular/forms'
import { Tag } from 'primeng/tag'
import { Chip } from 'primeng/chip'
import { SingleBlogComponent } from '../../features/blog/components/single-blog/single-blog.component'
import { RouterLink } from '@angular/router'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-blog',
    imports: [PrimeModules, FormsModule, SingleBlogComponent, RouterLink],
    templateUrl: './page-blog.component.html',
    styleUrl: './page-blog.component.css'
})
export class PageBlogComponent {
    status = ['Ordered', 'Unpaid', 'Paid', 'Confirmed', 'Cancelled']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    posts = signal([
        {
            image: 'https://picsum.photos/200/300',
            title: 'Understanding Intellectual Property Law',
            description:
                'An in-depth look at the different types of intellectual property and how they can protect your creations...',
            tags: ['law', 'sports', 'land law'],
            writtenBy: 'Hmmurad',
        },
        {
            image: 'https://picsum.photos/200/300',
            title: 'Understanding Intellectual Property Law',
            description:
                'An in-depth look at the different types of intellectual property and how they can protect your creations...',
            tags: ['law', 'sports', 'land law'],
            writtenBy: 'Hmmurad',
        },
        {
            image: 'https://picsum.photos/200/300',
            title: 'Understanding Intellectual Property Law',
            description:
                'An in-depth look at the different types of intellectual property and how they can protect your creations...',
            tags: ['law', 'sports', 'land law'],
            writtenBy: 'Hmmurad',
        },
    ])
}
