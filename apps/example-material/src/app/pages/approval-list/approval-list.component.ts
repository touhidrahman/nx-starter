import { Component } from '@angular/core'

import { MaterialModules } from '@myorg/material-modules'

@Component({
    selector: 'app-approval-list',
    standalone: true,
    imports: [...MaterialModules],
    templateUrl: './approval-list.component.html',
    styleUrl: './approval-list.component.scss',
})
export class ApprovalListComponent {}
