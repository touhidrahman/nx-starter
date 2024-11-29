import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HeaderUtilService } from '../../header-utils/header-util.service'
import { UIstate } from '../../header-utils/uiState-inteface'

@Component({
    selector: 'app-header-admin',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header-admin.component.html',
    styleUrl: './header-admin.component.scss',
})
export class HeaderAdminComponent implements OnInit, OnDestroy {
    renderer: Renderer2 = inject(Renderer2)
    headerUtilService = inject(HeaderUtilService)

    uiState: UIstate = {
        imageLoaded: true,
        showProfileDropDown: false,
    }
    showFallback(event: Event) {
        this.headerUtilService.showFallbackText(event, this.uiState)
    }

    // toggle profile menu logic
    bodyClickListener: (() => void) | null = null
    ngOnInit() {
        this.bodyClickListener = this.renderer.listen(
            document.body,
            'click',
            (e: Event) => {
                this.headerUtilService.toggleProfileMenu(e, this.uiState)
            },
        )
    }
    ngOnDestroy() {
        if (this.bodyClickListener) {
            this.bodyClickListener()
            this.bodyClickListener = null
        }
    }
}
