import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NxWelcomeComponent } from './nx-welcome.component'

@Component({
    standalone: true,
    imports: [CommonModule, NxWelcomeComponent],
    selector: 'jsat-validation-entry',
    template: `<jsat-nx-welcome></jsat-nx-welcome>`,
})
export class RemoteEntryComponent {}
