import {
    Component,
    EventEmitter,
    inject,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderUtilService } from '../../header-utils/header-util.service'
import { UIstate } from '../../header-utils/ui-state-interface'

@Component({
    selector: 'app-header-lawyer-default',
    imports: [CommonModule],
    templateUrl: './header-lawyer-default.component.html',
    styleUrl: './header-lawyer-default.component.scss',
})
export class HeaderLawyerDefaultComponent implements OnInit, OnDestroy {
    @Output() sidebarToggle = new EventEmitter<void>()
    toggleSidebar() {
        this.sidebarToggle.emit()
    }

    renderer = inject(Renderer2)
    headerUtilService = inject(HeaderUtilService)

    uiState: UIstate = {
        imageLoaded: true,
        showProfileDropDown: false,
    }

    // toggle profile menu logic
    bodyClickListener: (() => void) | null = null
    ngOnInit() {
        this.bodyClickListener = this.renderer.listen(
            document,
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
