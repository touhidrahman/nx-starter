import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Data, Hero } from '../../../../../assets/data/data'

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
    public hero: Hero = Data.hero
}
