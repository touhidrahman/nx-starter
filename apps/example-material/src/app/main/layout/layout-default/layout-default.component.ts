import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { InfoTreeComponent } from '../../headers/info-tree/info-tree.component'
import { HeaderInternalComponent } from '../../headers/header-internal/header-internal.component'
import { HeaderOneComponent } from '../../headers/header-one/header-one.component'

@Component({
    selector: 'app-layout-default',
    standalone: true,
    templateUrl: './layout-default.component.html',
    styleUrls: ['./layout-default.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        HeaderOneComponent,
        InfoTreeComponent,
        HeaderInternalComponent,
    ],
})
export class LayoutDefaultComponent {}
