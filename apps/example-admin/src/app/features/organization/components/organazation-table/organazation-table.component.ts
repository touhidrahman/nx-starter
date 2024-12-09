import { Component, input } from '@angular/core'
import { Button } from 'primeng/button'
import { Table } from 'primeng/table'

@Component({
    selector: 'app-organazation-table',
    standalone: true,
    imports: [Button, Table],
    templateUrl: './organazation-table.component.html',
    styleUrl: './organazation-table.component.css',
})
export class OrganazationTableComponent {
    organizations = input<any>([])
}
