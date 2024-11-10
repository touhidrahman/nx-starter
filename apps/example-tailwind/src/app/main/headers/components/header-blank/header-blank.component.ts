import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-blank',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header-blank.component.html',
    styleUrl: './header-blank.component.scss',
})
export class HeaderBlankComponent {}
