import { Component } from '@angular/core'
import { Dialog } from 'primeng/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TitleCasePipe } from '@angular/common'

@Component({
    selector: 'app-create-organization',
    standalone: true,
    imports: [Dialog, FormsModule, ReactiveFormsModule, TitleCasePipe],
    templateUrl: './create-organization.component.html',
    styleUrl: './create-organization.component.css',
})
export class CreateOrganizationComponent {}
