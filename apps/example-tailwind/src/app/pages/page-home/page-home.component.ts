import { CommonModule } from '@angular/common'
import { Component, type ElementRef, ViewChild } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SpartanModules } from '@myorg/spartan-modules'
import { NavbarInternalComponent } from '../../main/headers/components/navbar-internal/navbar-internal.component'

@Component({
    selector: 'app-page-home',
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
    radio = ''
    dateControl = new FormControl()

    @ViewChild('datePicker') datePicker!: ElementRef<HTMLInputElement>

    constructor() {
        this.dateControl.valueChanges.subscribe((value) => {
            console.log('dateControl valueChanges', value)
        })
    }

    ngAfterViewInit(): void {}

    openDialog() {}
}
