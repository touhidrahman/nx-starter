import { Component, OnInit, inject } from '@angular/core'

import { HeaderPublicComponent } from '../../../headers/components/header-public/header-public.component'
import { AuthStateService } from '@myorg/app-example-auth'
import { PublicFooterComponent } from '../../../footer/public-footer/public-footer.component'

@Component({
    selector: 'app-layout-public',
    imports: [HeaderPublicComponent, PublicFooterComponent],
    templateUrl: './layout-public.component.html',
    styleUrl: './layout-public.component.scss'
})
export class LayoutPublicComponent implements OnInit {
    private authStateService = inject(AuthStateService)

    isLoggedIn = false

    ngOnInit(): void {
        if (this.authStateService.getLoginStatus()) {
            this.isLoggedIn = true
        }
    }
}
