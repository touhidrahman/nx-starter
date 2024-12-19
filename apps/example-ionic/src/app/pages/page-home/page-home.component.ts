import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { BannerCarouselComponent } from '../../home/banner-carousel/banner-carousel.component'

@Component({
    selector: 'myorg-page-home',
    imports: [CommonModule, IonicModule, BannerCarouselComponent],
    templateUrl: './page-home.component.html',
    styleUrl: './page-home.component.scss'
})
export class PageHomeComponent implements OnInit {
    slides: any[] = []

    ngOnInit(): void {
        this.slides = [
            {
                content: 'Do things that make you happy ',
                imageUrl: '/assets/images/banner-1.png',
            },
            {
                content: 'The Law is hard, but it is the Law',
                imageUrl: '/assets/images/banner-2.png',
            },
            {
                content: 'Justice is merely incidental to law and order',
                imageUrl: '/assets/images/banner-3.png',
            },
            {
                content: 'The law sometimes sleeps; it never dies',
                imageUrl: '/assets/images/banner-4.png',
            },
            {
                content: 'Useless laws weaken the necessary laws',
                imageUrl: '/assets/images/banner-5.png',
            },
            {
                content: 'Law applied to its extreme is the greatest injustice',
                imageUrl: '/assets/images/banner-6.png',
            },
        ]
    }
}
