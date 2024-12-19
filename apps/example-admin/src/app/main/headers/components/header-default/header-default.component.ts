import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    inject,
} from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { LocalStorageService } from '@myorg/common-services'
import { UIstate } from '../../header-utils/uiState-inteface'
import { HeaderUtilService } from '../../header-utils/header-util.service'

@Component({
    selector: 'app-header-default',
    imports: [RouterModule],
    templateUrl: './header-default.component.html',
    styleUrl: './header-default.component.scss'
})
export class HeaderDefaultComponent implements OnInit, OnDestroy {
    authState = inject(AuthStateService)
    router = inject(Router)
    localStorageService = inject(LocalStorageService)
    renderer: Renderer2 = inject(Renderer2)
    headerUtilService = inject(HeaderUtilService)
    bodyClickListener: (() => void) | null = null

    @Output() sidebarToggle = new EventEmitter<void>()

    toggleSidebar() {
        this.sidebarToggle.emit()
    }

    ngOnInit() {
        this.bodyClickListener = this.renderer.listen(
            document,
            'click',
            (e: Event) => {
                this.headerUtilService.toggleProfileMenu(e, this.uiState)
            },
        )

        const user = JSON.parse(this.localStorageService.getItem('user') ?? '')
        this.authState.setState({
            user,
            isLoggedIn: user ? true : false,
        })
    }

    logout() {
        this.authState.logout()
        this.router.navigate(['/login'])
    }

    uiState: UIstate = {
        imageLoaded: true,
        showProfileDropDown: false,
    }
    showFallback(event: Event) {
        this.headerUtilService.showFallbackText(event, this.uiState)
    }

    // toggle profile menu logic
    ngOnDestroy() {
        if (this.bodyClickListener) {
            this.bodyClickListener()
            this.bodyClickListener = null
        }
    }
}
