import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PublicFooterComponent } from '../../main/footer/public-footer/public-footer.component'
import { DownloadAppComponent } from '../../main/landing/components/download-app/download-app.component'
import { FeaturesComponent } from '../../main/landing/components/features/features.component'
import { HeroComponent } from '../../main/landing/components/hero/hero.component'
import { PricePlanComponent } from '../../main/landing/components/price-plan/price-plan.component'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-landing',
    standalone: true,
    imports: [...PrimeModules,
        HeroComponent,
        PricePlanComponent,
        PublicFooterComponent,
        DownloadAppComponent,
        FeaturesComponent,
    ],
    templateUrl: './page-landing.component.html',
    styleUrl: './page-landing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLandingComponent {}
