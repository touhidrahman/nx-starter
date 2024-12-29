import { IonicModule } from '@ionic/angular'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'myorg-page-public-news',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-public-news.component.html',
    styleUrls: [
        './page-public-news.component.scss',
        './../page-public-blogs/page-public-blogs.component.scss',
    ],
})
export class PagePublicNewsComponent {}
