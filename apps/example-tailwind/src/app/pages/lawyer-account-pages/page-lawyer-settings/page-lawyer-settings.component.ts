import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
@Component({
    selector: 'app-page-lawyer-settings',
    imports: [CommonModule, FormsModule],
    templateUrl: './page-lawyer-settings.component.html',
    styleUrl: './page-lawyer-settings.component.scss',
})
export class PageLawyerSettingsComponent {
    togglebtnState = true
}
