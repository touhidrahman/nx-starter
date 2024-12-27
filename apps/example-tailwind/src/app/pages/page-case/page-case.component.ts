import { Component, OnInit, inject, input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { CasesApiService } from '../../features/case/services/cases-api.service'
import { Case } from '../../features/case/models/case.model'
import { AlertService } from '@myorg/app-example-core'

@Component({
    selector: 'app-page-case',
    imports: [CommonModule],
    templateUrl: './page-case.component.html',
    styleUrl: './page-case.component.scss',
})
export class PageCaseComponent implements OnInit {
    casesApiService = inject(CasesApiService)
    alertService = inject(AlertService)
    id = input('')
    casedata = signal<Case | null>(null)

    ngOnInit() {
        this.casesApiService.getCase(this.id() ?? '').subscribe({
            next: (value) => {
                this.casedata.set(value.data)
                console.log(value)
            },
            error: (err) => {
                this.alertService.error(err.error.message)
                console.log(err)
            },
        })
    }
}
