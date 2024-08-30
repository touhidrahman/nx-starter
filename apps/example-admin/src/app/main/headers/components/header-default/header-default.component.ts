import { Component, OnInit, inject } from '@angular/core'

import { SpartanModules } from '@myorg/spartan-modules'
import { LucideAngularModule } from 'lucide-angular'
import { provideIcons } from '@ng-icons/core'
import {
    lucideAlignJustify,
    lucidePlusCircle,
    lucideSearch,
} from '@ng-icons/lucide'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { Router, RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { LocalStorageService } from '@myorg/common-services'
import { NgIf } from '@angular/common'

@Component({
    selector: 'app-header-default',
    standalone: true,
    imports: [
        ...SpartanModules,
        LucideAngularModule,
        HlmInputDirective,
        RouterModule,
        NgIf,
    ],
    templateUrl: './header-default.component.html',
    styleUrl: './header-default.component.scss',
    providers: [
        provideIcons({ lucideSearch, lucideAlignJustify, lucidePlusCircle }),
    ],
})
export class HeaderDefaultComponent implements OnInit {
    authState = inject(AuthStateService)
    router = inject(Router)
    localStorageService = inject(LocalStorageService)

    ngOnInit() {
        const user = JSON.parse(this.localStorageService.getItem('user') ?? '')
        this.authState.setState({
            user,
            isLoggedIn: user ? true : false,
        })
    }

    logout() {
        this.authState.logout()
        this.router.navigate(['/login'])
    }
}
