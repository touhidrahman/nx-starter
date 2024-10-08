import { Component, inject } from '@angular/core'

import { MaterialModules } from '@myorg/material-modules'
import { ButtonGroupComponent } from '../../main/headers/button-group/button-group.component'
import { InfoTreeComponent } from '../../main/headers/info-tree/info-tree.component'
import { HeaderInternalComponent } from '../../main/headers/header-internal/header-internal.component'
import { MatDialog } from '@angular/material/dialog'
import { DeviationInitialDialogComponent } from '../../main/deviations/components/deviation-initial-dialog/deviation-initial-dialog.component'

@Component({
    selector: 'app-execution-test',
    standalone: true,
    imports: [
        ...MaterialModules,
        InfoTreeComponent,
        HeaderInternalComponent,
        ButtonGroupComponent,
    ],
    templateUrl: './execution-test.component.html',
    styleUrl: './execution-test.component.scss',
})
export class ExecutionTestComponent {
    private dialog = inject(MatDialog)

    columnNamesMap = {
        step: 'Step',
        description: 'Description',
        linkedRequirements: 'Linked Requirements',
        expectedResult: 'Expected Result',
        actualResult: 'Actual Result',
        passFail: 'Pass/Fail',
        signature: 'Signature',
        assignments: 'Assignments',
    }

    displayedColumns = [
        'step',
        'description',
        'linkedRequirements',
        'expectedResult',
        'actualResult',
        'passFail',
        'signature',
        'assignments',
    ]
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

    openDeviationDialog() {
        this.dialog.open(DeviationInitialDialogComponent, {
            width: '400px',
        })
    }
}
