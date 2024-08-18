import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { LucideAngularModule } from 'lucide-angular'

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

    userId = -1

    getUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }

    ngOnInit(): void {
        const user = this.getUser()
        this.userId = user.id
        console.log(this.userId)
    }
    logOut() {
        this.authStateService.logout('/')
    }
}
