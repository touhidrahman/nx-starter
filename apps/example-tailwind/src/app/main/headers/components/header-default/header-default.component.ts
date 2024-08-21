import { Component, inject, OnInit } from '@angular/core'

import { RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import {
    lucideAlignJustify,
    lucidePlusCircle,
    lucideSearch,
} from '@ng-icons/lucide'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { LucideAngularModule } from 'lucide-angular'
import { UserService } from '../util/auth-util'

@Component({
    selector: 'app-header-default',
    standalone: true,
    imports: [
        ...SpartanModules,
        LucideAngularModule,
        HlmInputDirective,
        RouterModule,
    ],
    templateUrl: './header-default.component.html',
    styleUrl: './header-default.component.scss',
    providers: [
        provideIcons({ lucideSearch, lucideAlignJustify, lucidePlusCircle }),
    ],
})
export class HeaderDefaultComponent implements OnInit {
    private authStateService = inject(AuthStateService)
    private userService = inject(UserService)

    userId = -1

    ngOnInit(): void {
        this.userId = this.userService.getUserId()
    }

    logOut() {
        this.authStateService.logout('/')
    }
}
