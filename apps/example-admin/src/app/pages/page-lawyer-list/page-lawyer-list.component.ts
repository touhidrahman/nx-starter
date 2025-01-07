import { Component } from '@angular/core'
import { Button } from 'primeng/button'
import { InputText } from 'primeng/inputtext'
import { Select } from 'primeng/select'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AddLawyerDialogComponent } from '../../main/lawyer/components/add-lawyer-dialog/add-lawyer-dialog.component'


@Component({
    selector: 'app-page-lawyer-list',
    imports: [
        Button,
        InputText,
        Select,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './page-lawyer-list.component.html',
    styleUrl: './page-lawyer-list.component.css',
    providers: [DialogService]
})
export class PageLawyerListComponent {
    constructor(public dialogService: DialogService) { }

    ref: DynamicDialogRef | undefined;



    openDialog() {
        const config = {
            header: 'Add new Lawyer',
            width: '70vw',
            modal: true,
            dismissableMask: false,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },

        }
        this.ref = this.dialogService.open(AddLawyerDialogComponent, config);
    }

}
