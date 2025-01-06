import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { GroupType } from '@myorg/app-example-models'
import { PrimeModules } from '@myorg/prime-modules'

//! to do remove model file

export type Group = {
    groupId: string
    groupType: GroupType
}

@Component({
    selector: 'app-page-organization-list',
    imports: [CommonModule, PrimeModules, RouterModule],
    templateUrl: './page-organization-list.component.html',
    styleUrl: './page-organization-list.component.css',
})
export class PageOrganizationListComponent {
    authStateService = inject(AuthStateService)
    groupType = GroupType

    // group: Group | null = null

    // ngOnInit(): void {
    //   // this.group = this.authStateService.getState()
    //   sasas

    // }
}
