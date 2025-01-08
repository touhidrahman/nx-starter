import { inject, Injectable } from '@angular/core'
import { LawyerApiService } from '@myorg/app-example-api-services'
import { Lawyer } from '@myorg/app-example-models'
import { OrderBy } from '@myorg/common-models'
import { SimpleStore } from '@myorg/store'
import { combineLatest, debounceTime, switchMap, tap } from 'rxjs'

export type LawyerState = {
    lawyers: Lawyer[]
    loading: boolean
    error: boolean
    orderBy: OrderBy
    pageNumber: number
    pageSize: number
    search: string
    totalItems: number
    totalPages: number
}

const initialLawyerState: LawyerState = {
    lawyers: [],
    loading: false,
    error: false,
    orderBy: OrderBy.Asc,
    pageNumber: 1,
    pageSize: 10,
    search: '',
    totalItems: 0,
    totalPages: 1,
}

@Injectable()
export class LawyerStateService extends SimpleStore<LawyerState> {
    private lawyerApiService = inject(LawyerApiService)

    constructor() {
        super(initialLawyerState)
    }

    init() {
        this.continueLoadingLawyers()
    }

    private continueLoadingLawyers() {
        combineLatest([
            this.select('search'),
            this.select('pageNumber'),
            this.select('pageSize'),
            this.select('orderBy'),
        ])
            .pipe(
                debounceTime(200),
                tap(() => this.setState({ loading: true })),
                switchMap(([search, pageNumber, pageSize, orderBy]) => {
                    const size = pageSize
                    const page = pageNumber
                    return this.lawyerApiService.getAllLawyers({
                        search,
                        page,
                        size,
                        orderBy,
                    })
                }),
            )
            .subscribe({
                next: (res) => {
                    this.setState({
                        lawyers: res.data,
                        loading: false,
                        totalItems: res.meta?.page,
                        totalPages: res.meta?.size,
                    })
                },
                error: () => {
                    this.setState({
                        loading: false,
                        error: true,
                    })
                },
            })
    }
}
