import { Component } from '@angular/core'

import { SpartanModules } from '@myorg/spartan-modules'
import { FormsModule } from '@angular/forms'
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal'

@Component({
    selector: 'app-dialog-approval',
    standalone: true,
    imports: [...SpartanModules, FormsModule, NgxSmartModalModule],
    templateUrl: './dialog-approval.component.html',
    styleUrl: './dialog-approval.component.scss',
})
export class DialogApprovalComponent {
    radio = ''
}
