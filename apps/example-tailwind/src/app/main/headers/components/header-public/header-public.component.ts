import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-public',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header-public.component.html',
    styleUrl: './header-public.component.scss',
})
export class HeaderPublicComponent {
    toggleMobileMenu(mobilenav: HTMLDivElement) {
        mobilenav.classList.toggle('-right-80')
        mobilenav.classList.toggle('right-0')
    }
}
