import { Injectable, inject } from '@angular/core'
import { SimpleStore } from '@myorg/store'
import { CasesApiService } from '../services/cases-api.service'
import { AlertService } from '@myorg/app-example-core'
import { combineLatest, switchMap, tap } from 'rxjs'

export type CasesState = {
    loading: boolean
    cases: any[]
    searchTerm: string
    page: number
    size: number
}

const initialState: CasesState = {
    loading: false,
    cases: [],
    searchTerm: '',
    page: 1,
    size: 10,
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
        combineLatest([
            this.select('searchTerm'),
            this.select('page'),
            this.select('size'),
        ])
            .pipe(
                tap(() => this.setState({ loading: true })),
                switchMap(([searchTerm, page, size]) => {
                    return this.casesApiService.getAllCases({
                        search: searchTerm,
                        page,
                        size,
                    })
                }),
            )
            .subscribe({
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

    deleteCase(id: string) {}
}
