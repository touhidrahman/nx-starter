import { Component, inject, input } from '@angular/core'
import { Router } from '@angular/router'
import { Button } from 'primeng/button'

@Component({
    selector: 'app-single-news',
    standalone: true,
    imports: [Button],
    templateUrl: './single-news.component.html',
    styleUrl: './single-news.component.css',
})
export class SingleNewsComponent {
    post = input<any>()
    router = inject(Router)

    onEdit(post: any) {
        this.router.navigate([`/news/edit/${post.title}`])
    }
}
