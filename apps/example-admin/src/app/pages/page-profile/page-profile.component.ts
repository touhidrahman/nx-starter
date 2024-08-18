import { Component } from '@angular/core'

import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'

@Component({
    selector: 'app-page-profile',
    standalone: true,
    imports: [...SpartanModules, HlmInputDirective],
    templateUrl: './page-profile.component.html',
    styleUrl: './page-profile.component.scss',
})
export class PageProfileComponent {}
