import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MaterialModules } from '@myorg/material-modules'
import { isSmallScreen } from '@myorg/utils'
import { AuthStateService } from '../../auth/states/auth-state.service'
import { HeaderOneComponent } from '../../headers/header-one/header-one.component'
import { AppStateService } from '@myorg/app-example-states'

@Component({
    selector: 'app-layout-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, MaterialModules, HeaderOneComponent],
    templateUrl: './layout-sidebar.component.html',
    styleUrls: ['./layout-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSidebarComponent {
    @Input() opened = true

    menuToggles = {
        home: false,
        account: false,
    }

    appName = this.appState.appName
    isSmallScreen = false

    constructor(
        public auth: AuthStateService,
        private appState: AppStateService,
    ) {
        this.isSmallScreen = isSmallScreen()
        if (this.isSmallScreen) {
            this.opened = false
        }
    }
}
