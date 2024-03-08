import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MaterialModules } from '@my-nx-starter/material-modules'
import { ApprovalDialogComponent } from '../../../approvals/components/approval-dialog/approval-dialog.component'

@Component({
    selector: 'app-requirement-card',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
    templateUrl: './requirement-card.component.html',
    styleUrl: './requirement-card.component.scss',
})
export class RequirementCardComponent {
    constructor(private dialog: MatDialog) {}

    openDialog() {
        this.dialog.open(ApprovalDialogComponent, {})
    }
}
