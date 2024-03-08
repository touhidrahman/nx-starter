import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SpartanModules } from '@my-nx-starter/spartan-modules'

@Component({
    selector: 'app-validation-test-links',
    standalone: true,
    imports: [CommonModule, RouterModule, ...SpartanModules],
    templateUrl: './validation-test-links.component.html',
    styleUrl: './validation-test-links.component.scss',
})
export class ValidationTestLinksComponent {}
