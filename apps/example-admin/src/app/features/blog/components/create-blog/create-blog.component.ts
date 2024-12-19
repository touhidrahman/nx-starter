import { Component, input } from '@angular/core'

import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-create-blog',
    imports: [PrimeModules],
    templateUrl: './create-blog.component.html',
    styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {
    title = input()

    protected readonly input = input
}
