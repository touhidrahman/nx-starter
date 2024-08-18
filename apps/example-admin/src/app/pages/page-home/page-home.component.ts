import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewContainerRef,
    inject,
} from '@angular/core'

import { SpartanModules } from '@myorg/spartan-modules'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxSmartModalService } from 'ngx-smart-modal'
import { DialogApprovalComponent } from './dialog-approval/dialog-approval.component'
import { NavbarInternalComponent } from '../../main/headers/components/navbar-internal/navbar-internal.component'

@Component({
    selector: 'app-page-home',
    standalone: true,
    imports: [
        ...SpartanModules,
        FormsModule,
        ReactiveFormsModule,
        NavbarInternalComponent,
    ],
    templateUrl: './page-home.component.html',
    styleUrl: './page-home.component.scss',
})
export class PageHomeComponent {
    private modalService = inject(NgxSmartModalService)
    private cdr = inject(ChangeDetectorRef)
    private vcr = inject(ViewContainerRef)

    radio: string = ''
    dateControl = new FormControl()

    @ViewChild('datePicker') datePicker!: ElementRef<HTMLInputElement>

    constructor() {
        this.dateControl.valueChanges.subscribe((value) => {
            console.log('dateControl valueChanges', value)
        })
    }

    ngAfterViewInit(): void {}

    openDialog() {
        this.modalService
            .create('dialog', DialogApprovalComponent, this.vcr, {
                customClass: 'w-full max-w-screen-lg',
            })
            .open()
    }
}
