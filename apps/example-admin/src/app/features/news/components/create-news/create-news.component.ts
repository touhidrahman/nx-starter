import { Component, input } from '@angular/core'
import { Button } from 'primeng/button'
import { FileUpload } from 'primeng/fileupload'
import { InputText } from 'primeng/inputtext'
import { Textarea } from 'primeng/textarea'

@Component({
    selector: 'app-create-news',
    standalone: true,
    imports: [Button, FileUpload, InputText, Textarea],
    templateUrl: './create-news.component.html',
    styleUrl: './create-news.component.css',
})
export class CreateNewsComponent {
    title = input()
}
