import { Component, HostListener, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AvatarModule } from 'primeng/avatar'
import { AuthStateService } from '@myorg/app-example-auth'

@Component({
    selector: 'app-header-public',
    imports: [RouterModule, AvatarModule],
    templateUrl: './header-public.component.html',
    styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent {
    authStateService = inject(AuthStateService)
    @HostListener('window:scroll', [])
    isScrolled = false

    toggleMobileMenu(mobilenav: HTMLDivElement) {
        mobilenav.classList.toggle('-right-80')
        mobilenav.classList.toggle('right-0')
    }

    onWindowScroll() {
        const scrollPosition =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
        this.isScrolled = scrollPosition > 50
    }
}
