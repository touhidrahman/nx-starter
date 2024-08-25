import { Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ButtonGroupComponent } from '../../main/headers/button-group/button-group.component'
import { InfoTreeComponent } from '../../main/headers/info-tree/info-tree.component'
import { HeaderInternalComponent } from '../../main/headers/header-internal/header-internal.component'
import { RequirementCardComponent } from '../../main/requirements/components/requirement-card/requirement-card.component'
import { ApprovalDialogComponent } from '../../main/approvals/components/approval-dialog/approval-dialog.component'
import { MaterialModules } from '@myorg/material-modules'

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        InfoTreeComponent,
        HeaderInternalComponent,
        RequirementCardComponent,
        ButtonGroupComponent,
        ...MaterialModules,
    ],
})
export default class HomeComponent {
    private dialog = inject(MatDialog)

    openDialog() {
        this.dialog.open(ApprovalDialogComponent, {})
    }
}
