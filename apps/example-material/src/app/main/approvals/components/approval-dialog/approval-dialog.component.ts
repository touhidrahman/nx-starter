import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModules } from '@myorg/material-modules'

@Component({
    selector: 'app-approval-dialog',
    standalone: true,
    imports: [...MaterialModules, ReactiveFormsModule],
    templateUrl: './approval-dialog.component.html',
    styleUrl: './approval-dialog.component.scss',
})
export class ApprovalDialogComponent {}
