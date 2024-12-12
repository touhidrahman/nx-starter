import { Component, input } from '@angular/core'
import { InputTextModule } from 'primeng/inputtext'
import { TextareaModule } from 'primeng/textarea'
import { Button } from 'primeng/button'
import { RouterLink } from '@angular/router'
import { FileUpload } from 'primeng/fileupload'

@Component({
    selector: 'app-create-blog',
    standalone: true,
    imports: [InputTextModule, TextareaModule, Button, RouterLink, FileUpload],
    templateUrl: './create-blog.component.html',
    styleUrl: './create-blog.component.css',
})
export class CreateBlogComponent {
    title = input()

    protected readonly input = input
}
