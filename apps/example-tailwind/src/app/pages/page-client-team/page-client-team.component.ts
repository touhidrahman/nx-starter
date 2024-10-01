import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    BrnRadioComponent,
    BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain'
import {
    HlmRadioDirective,
    HlmRadioGroupDirective,
    HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm'
import { HlmSmallDirective } from '@spartan-ng/ui-typography-helm'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-client-team',
    standalone: true,
    imports: [CommonModule,
        RouterModule,
        BrnRadioGroupComponent,
        BrnRadioComponent,
        HlmRadioIndicatorComponent,
        HlmRadioDirective,
        HlmRadioGroupDirective,
        HlmSmallDirective,],
    templateUrl: './page-client-team.component.html',
    styleUrl: './page-client-team.component.scss',
})
export class PageClientTeamComponent {
    teams = [
        { name: 'Team-1', value: 'team-1' },
        { name: 'Team-2', value: 'team-2' },
        { name: 'Team-3', value: 'team-3' },
        { name: 'Team-4', value: 'team-4' },
        { name: 'Team-5', value: 'team-5' },
    ]
}
