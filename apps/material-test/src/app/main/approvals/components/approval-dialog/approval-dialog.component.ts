import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModules } from '@my-nx-starter/material-modules'

@Component({
    selector: 'app-approval-dialog',
    standalone: true,
    imports: [CommonModule, ...MaterialModules, ReactiveFormsModule],
    templateUrl: './approval-dialog.component.html',
    styleUrl: './approval-dialog.component.scss',
})
export class ApprovalDialogComponent {}
