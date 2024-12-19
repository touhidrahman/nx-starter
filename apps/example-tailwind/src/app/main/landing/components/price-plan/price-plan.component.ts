import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { pricePlan, PricePlan } from './price-plan-data'

@Component({
    selector: 'app-price-plan',
    imports: [NgClass],
    templateUrl: './price-plan.component.html',
    styleUrl: './price-plan.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricePlanComponent {
    pricePlan: PricePlan[] = pricePlan
}
