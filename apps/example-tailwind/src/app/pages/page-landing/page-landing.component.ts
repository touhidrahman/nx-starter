import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HeroComponent } from '../../main/landing/components/hero/hero.component'
import { PrimeModules } from '@myorg/prime-modules'
import { CountingComponent } from '../../main/landing/components/counting/counting.component'
import { LawyerSearchComponent } from '../../main/landing/components/lawyer-search/lawyer-search.component'
import { TestimonialComponent } from '../../main/landing/components/testimonial/testimonial.component'
import { FaqComponent } from '../../main/landing/components/FAQ/faq.component'
import { ServiceSectionComponent } from '../../main/landing/components/service-section/service-section.component'

@Component({
    selector: 'app-page-landing',
    imports: [
        ...PrimeModules,
        HeroComponent,
        CountingComponent,
        LawyerSearchComponent,
        TestimonialComponent,
        FaqComponent,
        ServiceSectionComponent,
    ],
    templateUrl: './page-landing.component.html',
    styleUrl: './page-landing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLandingComponent {}
