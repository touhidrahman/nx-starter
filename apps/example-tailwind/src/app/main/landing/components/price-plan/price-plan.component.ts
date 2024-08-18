import { ChangeDetectionStrategy, Component } from '@angular/core'
import { pricePlan, PricePlan } from './price-plan-data'
import { lucideCheck } from '@ng-icons/lucide'
import { provideIcons } from '@ng-icons/core'
import { LucideAngularModule } from 'lucide-angular'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-price-plan',
    standalone: true,
    imports: [LucideAngularModule, HlmInputDirective, ...SpartanModules],
    templateUrl: './price-plan.component.html',
    styleUrl: './price-plan.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideIcons({ lucideCheck })],
})
export class PricePlanComponent {
    pricePlan: PricePlan[] = pricePlan
}
