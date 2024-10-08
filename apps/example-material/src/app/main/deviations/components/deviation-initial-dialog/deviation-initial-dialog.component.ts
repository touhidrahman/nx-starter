import { Component } from '@angular/core'

import { MaterialModules } from '@myorg/material-modules'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-deviation-initial-dialog',
    standalone: true,
    imports: [...MaterialModules, FormsModule, ReactiveFormsModule],
    templateUrl: './deviation-initial-dialog.component.html',
    styleUrl: './deviation-initial-dialog.component.scss',
})
export class DeviationInitialDialogComponent {}
