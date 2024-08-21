import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { LucideAngularModule } from 'lucide-angular'
import { UserService } from '../util/auth-util'

@Component({
    selector: 'app-header-public',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ...SpartanModules,
        LucideAngularModule,
        HlmInputDirective,
    ],
    templateUrl: './header-public.component.html',
    styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent implements OnInit {
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
