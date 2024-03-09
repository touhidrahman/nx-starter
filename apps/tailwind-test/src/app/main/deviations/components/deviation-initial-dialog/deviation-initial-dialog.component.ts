import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-deviation-initial-dialog',
    standalone: true,
    imports: [CommonModule, ...SpartanModules],
    templateUrl: './deviation-initial-dialog.component.html',
    styleUrl: './deviation-initial-dialog.component.scss',
})
export class DeviationInitialDialogComponent {}
