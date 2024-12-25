import { Injectable, inject } from '@angular/core'
import { SimpleStore } from '@myorg/store'
import { CasesApiService } from '../services/cases-api.service'
import { AlertService } from '@myorg/app-example-core'
import { combineLatest, debounceTime, switchMap, tap } from 'rxjs'
import { Case } from '../models/case.model'

export type CasesState = {
    loading: boolean
    cases: any[]
    searchTerm: string
    page: number
    size: number
    totalCases: number
}

const initialState: CasesState = {
    loading: false,
    cases: [],
    searchTerm: '',
    page: 1,
    size: 5,
    totalCases: 0,
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
                debounceTime(300),
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

    saveCase(data: Case) {
        const { cases } = this.getState()
        this.setState({ loading: true })
        this.casesApiService.createCase(data).subscribe({
            next: (value) => {
                this.alertService.success('Case created successfully')
                this.setState({
                    loading: false,
                    cases: [...cases, value.data],
                })
            },
            error: (err) => {
                this.alertService.error(err.error.message)
            },
        })
    }

    deleteCase(id: string) {
        const { cases } = this.getState()
        this.setState({ loading: true })
        this.casesApiService.deleteCase(id).subscribe({
            next: (value) => {
                this.alertService.success('Case deleted successfully')
                this.setState({
                    loading: false,
                    cases: cases.filter((c) => c.id !== id),
                })
            },
            error: (err) => {
                console.log(err.error)
                this.alertService.warn(err.error.message)
            },
        })
    }
}
