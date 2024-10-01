import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-public2',
    standalone: true,
    imports: [CommonModule,RouterModule],
    templateUrl: './header-public2.component.html',
    styleUrl: './header-public2.component.scss',
})
export class HeaderPublic2Component {}
