import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicSlides } from '@ionic/angular';

@Component({
    selector: 'myorg-case-date-carousel',
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './case-date-carousel.component.html',
    styleUrl: './case-date-carousel.component.scss'
})
export class CaseDateCarouselComponent implements OnInit {
    @Input() slides: any[]=[];
    swipeModules = [IonicSlides]

    ngOnInit() {

    }
}
