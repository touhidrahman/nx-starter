import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-select-role',
    imports: [CommonModule, RouterModule, PrimeModules],
    templateUrl: './page-select-role.component.html',
    styleUrl: './page-select-role.component.scss',
})
export class PageSelectRoleComponent {}
