import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@my-nx-starter/spartan-modules'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NavbarInternalComponent } from '../../main/headers/components/navbar-internal/navbar-internal.component'
import { ValidationTestLinksComponent } from '../../main/headers/components/validation-test-links/validation-test-links.component'

@Component({
    selector: 'jsat-page-test-protocol',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        ReactiveFormsModule,
        FormsModule,
        NavbarInternalComponent,
        ValidationTestLinksComponent,
    ],
    templateUrl: './page-test-protocol.component.html',
    styleUrl: './page-test-protocol.component.scss',
})
export class PageTestProtocolComponent {
    data = [
        {
            step: '001',
            description: '',
            expected: '',
            actual: '',
            requirements: ['Req 101', 'Req 102', 'Req 103'],
        },
        {
            step: '002',
            description: '',
            expected: '',
            actual: '',
            requirements: ['Req 201', 'Req 202', 'Req 303'],
        },
        {
            step: '003',
            description: '',
            expected: '',
            actual: '',
            requirements: ['Req 301', 'Req 302', 'Req 303'],
        },
        {
            step: '004',
            description: '',
            expected: '',
            actual: '',
            requirements: ['Req 401', 'Req 402', 'Req 403'],
        },
        {
            step: '005',
            description: '',
            expected: '',
            actual: '',
            requirements: ['Req 501', 'Req 502', 'Req 503'],
        },
        {
            step: '006',
            description: '',
            expected: '',
            actual: '',
            requirements: ['Req 601', 'Req 602', 'Req 603'],
        },
        {
            step: '007',
            description: '',
            expected: '',
            actual: '',
            requirements: ['Req 701', 'Req 702', 'Req 703'],
        },
    ]
}
