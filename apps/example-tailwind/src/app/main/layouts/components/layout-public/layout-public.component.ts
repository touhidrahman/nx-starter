import { Component, OnInit } from '@angular/core'

import { HeaderPublicComponent } from '../../../headers/components/header-public/header-public.component'
import { AuthStateService } from '@myorg/app-example-auth'
import { PublicFooterComponent } from '../../../footer/public-footer/public-footer.component'

@Component({
    selector: 'app-layout-public',
    standalone: true,
    imports: [HeaderPublicComponent, PublicFooterComponent],
    templateUrl: './layout-public.component.html',
    styleUrl: './layout-public.component.scss',
})
export class LayoutPublicComponent implements OnInit {
    isLoggedIn = false

    constructor(private authStateService: AuthStateService) {}

    ngOnInit(): void {
        if (this.authStateService.getLoginStatus()) {
            this.isLoggedIn = true
        }
    }
}
