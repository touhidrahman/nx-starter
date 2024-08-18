import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthStateService } from '../../auth/states/auth-state.service'
import { MaterialModules } from '@myorg/material-modules'
import { AppStateService } from '@myorg/app-example-states'

@Component({
    selector: 'app-header-one',
    standalone: true,
    imports: [RouterModule, ...MaterialModules],
    templateUrl: './header-one.component.html',
    styleUrls: ['./header-one.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderOneComponent implements OnInit {
    auth = inject(AuthStateService)
    appState = inject(AppStateService)

    @Input() sidenavToggleVisible = true
    @Output() sidenavToggle = new EventEmitter<void>()

    ngOnInit(): void {
        void 0
    }

    toggle(): void {
        this.sidenavToggle.next()
    }
}
