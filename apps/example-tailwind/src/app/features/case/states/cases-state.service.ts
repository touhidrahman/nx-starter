import { Injectable, inject } from '@angular/core'
import { SimpleStore } from '@myorg/store'
import { CasesApiService } from '../services/cases-api.service'
import { AlertService } from '@myorg/app-example-core'

export type CasesState = {
    loading: boolean
    cases: any[]
    caseId:
}

const initialState: CasesState = {
    loading: false,
    cases: [],
}

@Injectable({
    providedIn: 'root',
})
export class CasesStateService extends SimpleStore<CasesState> {
    casesApiService = inject(CasesApiService)
    alertService = inject(AlertService)

    constructor() {
        super(initialState)
        this.continueLoadingCases()
    }

    continueLoadingCases() {
        this.setState({ loading: true })
        this.casesApiService.getAllCases().subscribe({
            next: (value) => {
                console.log(value)
                this.setState({ loading: false, cases: value.data })
            },
            error: (err) => {
                this.setState({ loading: false })
                this.alertService.error(err.error.message)
            },
        })
    }

    deleteCase(id:string) {
        
    }
}
