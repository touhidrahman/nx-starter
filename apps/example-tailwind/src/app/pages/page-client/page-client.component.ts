import { Component, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { KnobModule } from 'primeng/knob'
import { FormsModule, NgModel } from '@angular/forms'
@Component({
    selector: 'app-page-client',
    standalone: true,
    imports: [CommonModule, KnobModule, FormsModule],
    templateUrl: './page-client.component.html',
    styleUrl: './page-client.component.scss',
})
export class PageClientComponent {
    value!: number
}
