import { Component } from '@angular/core'
import { SpartanModules } from '@myorg/spartan-modules'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-dialog-approval',
    standalone: true,
    imports: [...SpartanModules, FormsModule],
    templateUrl: './dialog-approval.component.html',
    styleUrl: './dialog-approval.component.scss',
})
export class DialogApprovalComponent {
    radio = ''
}
