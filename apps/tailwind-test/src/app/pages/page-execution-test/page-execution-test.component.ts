import { CommonModule } from '@angular/common'
import { Component, ViewContainerRef } from '@angular/core'
import { SpartanModules } from '@my-nx-starter/spartan-modules'
import { NgxSmartModalService } from 'ngx-smart-modal'
import { DeviationInitialDialogComponent } from '../../main/deviations/components/deviation-initial-dialog/deviation-initial-dialog.component'
import { NavbarInternalComponent } from '../../main/headers/components/navbar-internal/navbar-internal.component'
import { ValidationTestLinksComponent } from '../../main/headers/components/validation-test-links/validation-test-links.component'

@Component({
    selector: 'jsat-page-execution-test',
    standalone: true,
    templateUrl: './page-execution-test.component.html',
    styleUrl: './page-execution-test.component.scss',
    imports: [
        CommonModule,
        ...SpartanModules,
        NavbarInternalComponent,
        ValidationTestLinksComponent,
    ],
})
export class PageExecutionTestComponent {
    dataSource = [
        {
            step: 1,
            description: 'Test',
            linkedRequirements: ['Req 102', 'Req 103'],
            expectedResult: 'Test',
            actualResult: 'Test',
            passFail: 'Pass',
            signature: '',
            assignments: '',
        },
        {
            step: 2,
            description: '',
            linkedRequirements: ['Req 104', 'Req 105'],
            expectedResult: '',
            actualResult: '',
            passFail: 'Fail',
            signature: '',
            assignments: '',
        },
        {
            step: 3,
            description: '',
            linkedRequirements: ['Req 106', 'Req 107'],
            expectedResult: '',
            actualResult: '',
            passFail: 'Pass',
            signature: '',
            assignments: '',
        },
        {
            step: 4,
            description: '',
            linkedRequirements: ['Req 108', 'Req 109'],
            expectedResult: '',
            actualResult: '',
            passFail: 'Fail',
            signature: '',
            assignments: '',
        },
    ]

    constructor(
        private modalService: NgxSmartModalService,
        private vcr: ViewContainerRef,
    ) {}

    openDeviationDialog() {
        this.modalService
            .create('dialog', DeviationInitialDialogComponent, this.vcr, {
                customClass: 'w-full max-w-screen-md',
            })
            .open()
    }
}
