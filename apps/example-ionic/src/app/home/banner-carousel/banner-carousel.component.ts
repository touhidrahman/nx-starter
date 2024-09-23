import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicSlides } from '@ionic/angular'

@Component({
    selector: 'myorg-banner-carousel',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    standalone: true,
    imports: [CommonModule],
    templateUrl: './banner-carousel.component.html',
    styleUrl: './banner-carousel.component.scss',
})
export class BannerCarouselComponent {
    @Input() slides: any[] = []
    swipeModules = [IonicSlides]
}
