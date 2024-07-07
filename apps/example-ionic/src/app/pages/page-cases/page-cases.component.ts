import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { CaseDateCarouselComponent } from '../../cases/case-date-carousel/case-date-carousel.component'
import { CasesCarouselComponent } from "../../cases/cases-carousel/cases-carousel.component";

@Component({
    selector: 'myorg-page-cases',
    standalone: true,
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
    imports: [CommonModule, IonicModule, CaseDateCarouselComponent, CasesCarouselComponent]
})
export class PageCasesComponent implements OnInit {
    slides: any[] = []

    ngOnInit(): void {
        this.slides = [
            {
                title: '29/5',
                content:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
            },
            {
                title: '03/6',
                content:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English..',
            },
            {
                title: '20/6',
                content:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
            },
            {
                title: '05/7',
                content:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
            },
            {
                title: '10/7',
                content:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
            },
            {
                title: '10/8',
                content:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
            },
        ]
    }
}
