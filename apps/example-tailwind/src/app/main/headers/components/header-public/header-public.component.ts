import { AsyncPipe } from '@angular/common'
import { Component, HostListener, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-header-public',
    imports: [RouterModule, PrimeModules, AsyncPipe],
    templateUrl: './header-public.component.html',
    styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent {
    authStateService = inject(AuthStateService)
    isScrolled = false

    //! TODO: Move to global css file and change implementation
    toggleMobileMenu(mobilenav: HTMLDivElement) {
        mobilenav.classList.toggle('-right-80')
        mobilenav.classList.toggle('right-0')
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollPosition =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
        this.isScrolled = scrollPosition > 50
    }
}
