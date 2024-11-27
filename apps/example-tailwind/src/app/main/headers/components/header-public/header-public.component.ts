import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { LucideAngularModule } from 'lucide-angular'
import { HeaderUtilService } from '../../header-utils/header-util.service'
import { UIstate } from '../../header-utils/uiState-inteface'

@Component({
    selector: 'app-header-public',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    templateUrl: './header-public.component.html',
    styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent implements OnInit, OnDestroy {
    private authStateService = inject(AuthStateService)
    renderer: Renderer2 = inject(Renderer2)
    headerUtilService = inject(HeaderUtilService)

    uiState: UIstate = {
        imageLoaded: true,
        showProfileDropDown: false,
    }
    bodyClickListener: (() => void) | null = null

    userId = -10
    getUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }
    logOut() {
        this.authStateService.logout('/')
    }

    showFallback(event: Event) {
        this.headerUtilService.showFallbackText(event, this.uiState)
    }

    ngOnInit(): void {
        this.bodyClickListener = this.renderer.listen(
            document.body,
            'click',
            (e: Event) => {
                this.headerUtilService.toggleProfileMenu(e, this.uiState)
            },
        )

        const user = this.getUser()
        this.userId = user.id
        console.log(this.userId)
    }
    ngOnDestroy() {
        if (this.bodyClickListener) {
            this.bodyClickListener()
            this.bodyClickListener = null
        }
    }
}
