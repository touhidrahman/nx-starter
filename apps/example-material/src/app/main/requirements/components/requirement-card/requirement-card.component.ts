import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MaterialModules } from '@myorg/material-modules'
import { ApprovalDialogComponent } from '../../../approvals/components/approval-dialog/approval-dialog.component'

@Component({
    selector: 'app-requirement-card',
    standalone: true,
    imports: [ReactiveFormsModule, ...MaterialModules],
    templateUrl: './requirement-card.component.html',
    styleUrl: './requirement-card.component.scss',
})
export class RequirementCardComponent {
    private dialog = inject(MatDialog)

    openDialog() {
        this.dialog.open(ApprovalDialogComponent, {})
    }
}
