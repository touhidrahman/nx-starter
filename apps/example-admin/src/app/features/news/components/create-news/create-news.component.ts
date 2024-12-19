import { Component, input } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-create-news',
    imports: [PrimeModules],
    templateUrl: './create-news.component.html',
    styleUrl: './create-news.component.css',
})
export class CreateNewsComponent {
    title = input()
}
