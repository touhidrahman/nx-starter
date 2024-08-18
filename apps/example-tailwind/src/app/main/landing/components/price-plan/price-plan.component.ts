import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import { lucideCheck } from '@ng-icons/lucide'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { LucideAngularModule } from 'lucide-angular'
import { pricePlan, PricePlan } from './price-plan-data'

@Component({
    selector: 'app-price-plan',
    standalone: true,
    imports: [
        LucideAngularModule,
        HlmInputDirective,
        ...SpartanModules,
        NgClass,
    ],
    templateUrl: './price-plan.component.html',
    styleUrl: './price-plan.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideIcons({ lucideCheck })],
})
export class PricePlanComponent {
    pricePlan: PricePlan[] = pricePlan
}
