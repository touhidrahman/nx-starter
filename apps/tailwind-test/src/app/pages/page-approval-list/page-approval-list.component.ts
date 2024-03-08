import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { SpartanModules } from '@my-nx-starter/spartan-modules'
import { NavbarInternalComponent } from '../../main/headers/components/navbar-internal/navbar-internal.component'
import { SearchableSelectComponent } from '../../main/searchable-select/searchable-select.component'

@Component({
    selector: 'app-page-approval-list',
    standalone: true,
    templateUrl: './page-approval-list.component.html',
    styleUrl: './page-approval-list.component.scss',
    imports: [
        CommonModule,
        ...SpartanModules,
        SearchableSelectComponent,
        NavbarInternalComponent,
    ],
})
export class PageApprovalListComponent {}
