import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthStateService } from '../../auth/states/auth-state.service'
import { MaterialModules } from '@my-nx-starter/material-modules'
import { AppStateService } from '@my-nx-starter/app-validation-states'

@Component({
    selector: 'app-header-one',
    standalone: true,
    imports: [CommonModule, RouterModule, ...MaterialModules],
    templateUrl: './header-one.component.html',
    styleUrls: ['./header-one.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderOneComponent implements OnInit {
    @Input() sidenavToggleVisible = true
    @Output() sidenavToggle = new EventEmitter<void>()

    constructor(
        public auth: AuthStateService,
        public appState: AppStateService,
    ) {}

    ngOnInit(): void {
        void 0
    }

    toggle(): void {
        this.sidenavToggle.next()
    }
}
