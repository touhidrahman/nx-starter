import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@my-nx-starter/spartan-modules'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxSmartModalService } from 'ngx-smart-modal'
import { DialogApprovalComponent } from './dialog-approval/dialog-approval.component'
import { NavbarInternalComponent } from '../../main/headers/components/navbar-internal/navbar-internal.component'

@Component({
    selector: 'jsat-page-home',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        FormsModule,
        ReactiveFormsModule,
        NavbarInternalComponent,
    ],
    templateUrl: './page-home.component.html',
    styleUrl: './page-home.component.scss',
})
export class PageHomeComponent {
    radio: string = ''
    dateControl = new FormControl()

    @ViewChild('datePicker') datePicker!: ElementRef<HTMLInputElement>

    constructor(
        private modalService: NgxSmartModalService,
        private cdr: ChangeDetectorRef,
        private vcr: ViewContainerRef,
    ) {
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
