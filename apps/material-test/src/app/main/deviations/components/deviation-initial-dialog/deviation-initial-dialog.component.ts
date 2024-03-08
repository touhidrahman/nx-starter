import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModules } from '@my-nx-starter/material-modules'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-deviation-initial-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './deviation-initial-dialog.component.html',
    styleUrl: './deviation-initial-dialog.component.scss',
})
export class DeviationInitialDialogComponent {}
