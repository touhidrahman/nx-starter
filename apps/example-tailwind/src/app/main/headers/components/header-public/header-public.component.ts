import { Component, HostListener } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-public',
    imports: [RouterModule],
    templateUrl: './header-public.component.html',
    styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent {
    isScrolled = false

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
