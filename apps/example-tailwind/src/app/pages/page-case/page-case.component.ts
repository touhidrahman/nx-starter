import { Component, OnInit, inject, input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AlertService } from '@myorg/app-example-core'
import { CaseApiService } from '@myorg/app-example-api-services'
import { Case } from '@myorg/app-example-models'

@Component({
    selector: 'app-page-case',
    imports: [CommonModule],
    templateUrl: './page-case.component.html',
    styleUrl: './page-case.component.scss',
})
export class PageCaseComponent implements OnInit {
    casesApiService = inject(CaseApiService)
    alertService = inject(AlertService)
    id = input('')
    casedata = signal<Case | null>(null)

    ngOnInit() {
        this.casesApiService.getCase(this.id() ?? '').subscribe({
            next: ({ data }) => {
                data && this.casedata.set(data)
            },
            error: (err) => {
                this.alertService.error(err.error.message)
            },
        })
    }
}
