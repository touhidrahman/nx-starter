import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LawyerApiService } from '@myorg/app-example-api-services'
import { LawyerFormService } from '@myorg/app-example-forms'
import { Lawyer, LawyerDto } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { PrimeModules } from '@myorg/prime-modules'
import { MessageService } from 'primeng/api'
import { DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
    selector: 'app-add-lawyer-dialog',
    imports: [CommonModule, PrimeModules, ReactiveFormsModule],
    templateUrl: './add-lawyer-dialog.component.html',
    styleUrl: './add-lawyer-dialog.component.css',
    providers: [LawyerFormService, MessageService],
})
export class AddLawyerDialogComponent implements OnDestroy {
    private lawyerApiService = inject(LawyerApiService)
    private messageService = inject(MessageService)
    lawyerFormService = inject(LawyerFormService)
    ref: DynamicDialogRef | undefined

    isLoading = signal(false)

    onSubmit(event: Event) {
        this.isLoading.set(true)
        event?.preventDefault()
        const fromValue = this.lawyerFormService.getValue()
        const lawyer: LawyerDto = {
            ...fromValue,
            sponsored: fromValue.sponsored[0],
        }

        this.lawyerApiService.createLawyer(lawyer).subscribe({
            next: (res: ApiResponse<Lawyer>) => {
                if (res.data) {
                    this.lawyerFormService.form.reset()
                    this.isLoading.set(false)
                    this.messageService.add({
                        severity: 'Success',
                        summary: 'Lawyer added successfully',
                    })
                    this.ref?.close()
                }
            },
            error: () => {
                this.isLoading.set(false)
                this.messageService.add({
                    severity: 'Error',
                    summary: 'Lawyer add failed',
                })
            },
        })
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close()
        }
    }
}
