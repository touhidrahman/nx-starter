import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModules } from '@my-nx-starter/material-modules'

@Component({
    selector: 'app-approval-list',
    standalone: true,
    imports: [CommonModule, ...MaterialModules],
    templateUrl: './approval-list.component.html',
    styleUrl: './approval-list.component.scss',
})
export class ApprovalListComponent {}
