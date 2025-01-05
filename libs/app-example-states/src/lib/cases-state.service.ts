import { Injectable, inject } from '@angular/core'
import { SimpleStore } from '@myorg/store'
import { AlertService } from '@myorg/app-example-core'
import { combineLatest, debounceTime, switchMap, tap } from 'rxjs'
import { Case } from '@myorg/app-example-models'
import { CaseApiService } from '@myorg/app-example-api-services'

export type CasesState = {
    loading: boolean
    cases: Case[]
    searchTerm: string
    page: number
    size: number
    orderBy: 'desc' | 'asc'
    totalCases: number
    selectedCase: Case | null
}

const initialState: CasesState = {
    loading: false,
    cases: [],
    searchTerm: '',
    page: 1,
    size: 5,
    orderBy: 'desc',
    totalCases: 0,
    selectedCase: null,
}

@Injectable({
    providedIn: 'root',
})
export class CasesStateService extends SimpleStore<CasesState> {
    casesApiService = inject(CaseApiService)
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
            this.select('orderBy'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true })),
                switchMap(([searchTerm, page, size, orderBy]) => {
                    return this.casesApiService.getAllCases({
                        search: searchTerm,
                        page,
                        size,
                        orderBy,
                    })
                }),
            )
            .subscribe({
                next: (value) => {
                    this.setState({ loading: false, cases: value.data })
                },
                error: (err) => {
                    this.setState({ loading: false })
                    this.alertService.error(err.error.message)
                },
            })
    }

    saveCase(input: Case) {
        const { cases } = this.getState()
        this.setState({ loading: true })
        this.casesApiService.createCase(input).subscribe({
            next: ({ data }) => {
                if (!data) return
                this.alertService.success('Case created successfully')
                this.setState({
                    loading: false,
                    cases: [...cases, data],
                })
            },
            error: (err) => {
                this.alertService.error(err.error.message)
            },
        })
    }

    updateCase(id: string, data: Case) {
        const { cases } = this.getState()
        this.setState({ loading: true })
        this.casesApiService.updateCase(id, data).subscribe({
            next: (value) => {
                if (!value.data) return
                this.alertService.success('Case updated successfully')
                this.setState({
                    loading: false,
                    cases: [...cases.filter((c) => c.id !== id), value.data],
                })
            },
            error: (err) => {
                this.setState({ loading: false })
                console.log(err.error)
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
                this.alertService.warn(err.error.message)
            },
        })
    }
}
