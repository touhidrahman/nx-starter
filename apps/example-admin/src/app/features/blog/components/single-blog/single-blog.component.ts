import { Component, inject, input } from '@angular/core'
import { Router } from '@angular/router'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-single-blog',
    imports: [PrimeModules],
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
