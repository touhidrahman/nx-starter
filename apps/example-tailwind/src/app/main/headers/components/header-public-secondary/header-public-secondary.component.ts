import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-header-public-secondary',
    imports: [CommonModule, RouterLink],
    templateUrl: './header-public-secondary.component.html',
    styleUrl: './header-public-secondary.component.scss',
})
export class HeaderPublicSecondaryComponent {}
