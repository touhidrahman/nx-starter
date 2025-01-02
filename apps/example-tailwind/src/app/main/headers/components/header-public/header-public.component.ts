import { Component, HostListener, inject, OnInit, signal } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { JwtService, TokenStorageService } from '@myorg/common-auth'
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-header-public',
    imports: [RouterModule, AvatarModule],
    templateUrl: './header-public.component.html',
    styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent implements OnInit {
    private jwtService = inject(JwtService)
    private tokenStorageService = inject(TokenStorageService)
    private router = inject(Router)
    @HostListener('window:scroll', [])
    isScrolled = false

    isUserLoggedIn = signal<boolean>(false)
    email = signal<string | null>(null)

    ngOnInit(): void {
        const token = this.tokenStorageService.getAccessToken()
        if (token) {
            const decoded = this.jwtService.getUnexpiredDecoded(token)
            this.isUserLoggedIn.set(true)
            this.email.set(decoded.email)
            console.log(decoded)
        } else {
            this.isUserLoggedIn.set(false)
            this.email.set(null)
        }
    }

    logout() {
        this.tokenStorageService.clear()
        this.isUserLoggedIn.set(false)
        this.router.navigate(['/login'])
    }


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
