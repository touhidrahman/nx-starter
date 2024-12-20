import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PublicFooterComponent } from '../../main/footer/public-footer/public-footer.component'
import { DownloadAppComponent } from '../../main/landing/components/download-app/download-app.component'
import { FeaturesComponent } from '../../main/landing/components/features/features.component'
import { HeroComponent } from '../../main/landing/components/hero/hero.component'
import { PricePlanComponent } from '../../main/landing/components/price-plan/price-plan.component'
import { PrimeModules } from '@myorg/prime-modules'
import { CountingComponent } from '../../main/landing/components/counting/counting.component'
import { LawyerSearchComponent } from '../../main/landing/components/lawyer-search/lawyer-search.component'
import { ServiceSectionComponent } from '../../main/landing/components/service-section/service-section.component'
import { TestimonialComponent } from '../../main/landing/components/testimonial/testimonial.component'
import { FaqComponent } from '../../main/landing/components/FAQ/faq.component'

@Component({
    selector: 'app-page-landing',
    imports: [
        ...PrimeModules,
        HeroComponent,
        CountingComponent,
        LawyerSearchComponent,
        ServiceSectionComponent,
        TestimonialComponent,
        FaqComponent,
    ],
    templateUrl: './page-landing.component.html',
    styleUrl: './page-landing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLandingComponent {}
