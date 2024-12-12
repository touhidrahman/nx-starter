import { Component, inject, input } from '@angular/core'
import { Button } from 'primeng/button'
import { Router, RouterModule } from '@angular/router'

@Component({
    selector: 'app-single-blog',
    standalone: true,
    imports: [Button],
    templateUrl: './single-blog.component.html',
    styleUrl: './single-blog.component.css',
})
export class SingleBlogComponent {
    post = input<any>()
    router = inject(Router)

    onEdit(post: any) {
        this.router.navigate([`/blogs/edit/${post.title}`])
    }
}
