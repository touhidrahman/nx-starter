import { Component, OnChanges, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EmblaCarouselDirective, EmblaCarouselType } from 'embla-carousel-angular'
import { IonicModule } from '@ionic/angular'
import { BehaviorSubject, combineLatest, filter, interval } from 'rxjs'

@Component({
    selector: 'myorg-cases-carousel',
    standalone: true,
    imports: [CommonModule,EmblaCarouselDirective,IonicModule],
    templateUrl: './cases-carousel.component.html',
    styleUrl: './cases-carousel.component.scss',
})
export class CasesCarouselComponent implements OnChanges {

    @ViewChild(EmblaCarouselDirective) emblaRef!: EmblaCarouselDirective

    options = { loop: true }
    testimonials = []



    private emblaApi?: EmblaCarouselType
    private haltSubject = new BehaviorSubject<boolean>(false)

    ngOnChanges(): void {

    }
    ngAfterViewInit() {
        this.emblaApi = this.emblaRef.emblaApi

        combineLatest([interval(8000), this.haltSubject.asObservable()])
            .pipe(filter(([_, halt]) => !halt))
            .subscribe(() => {
                if (this.emblaApi) {
                    this.emblaApi.scrollNext()
                }
            })
    }

    halt() {
        this.haltSubject.next(true)
    }

    unHalt() {
        this.haltSubject.next(false)
    }

}
