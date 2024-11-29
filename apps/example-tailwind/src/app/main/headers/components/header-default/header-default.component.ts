import {
    Component,
    EventEmitter,
    inject,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { HeaderUtilService } from '../../header-utils/header-util.service'
import { UIstate } from '../../header-utils/uiState-inteface'

@Component({
    selector: 'app-header-default',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header-default.component.html',
    styleUrl: './header-default.component.scss',
})
export class HeaderDefaultComponent implements OnInit, OnDestroy {
    renderer: Renderer2 = inject(Renderer2)
    headerUtilService = inject(HeaderUtilService)

    @Output() sidebarToggle = new EventEmitter<void>()
    toggleSidebar() {
        this.sidebarToggle.emit()
    }
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
