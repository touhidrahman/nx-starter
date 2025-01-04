import { inject, Injectable } from '@angular/core'
import { Organization } from '@myorg/app-example-models'
import { SimpleStore } from '@myorg/store'
import { combineLatest, debounceTime, switchMap, tap } from 'rxjs'
import { OrganizationApiService } from '@myorg/app-example-api-services'
import { AlertService } from '@myorg/app-example-core'

export interface OrganizationListState {
    organizations: Organization[]
    loading: boolean
    page: number
    size: number
    orderBy: 'asc' | 'desc'
    query: string
    type: string
    status: string
}

const initialState: OrganizationListState = {
    organizations: [],
    loading: false,
    page: 1,
    size: 5,
    orderBy: 'asc',
    query: '',
    type: '',
    status: '',
}

@Injectable()
export class OrganizationStateService extends SimpleStore<OrganizationListState> {
    organizationApiService = inject(OrganizationApiService)
    alertService = inject(AlertService)

    constructor() {
        super(initialState)
        this.init()
    }

    init() {
        this.continueLoadingOrganizations()
    }

    continueLoadingOrganizations() {
        combineLatest([
            this.select('query'),
            this.select('size'),
            this.select('page'),
            this.select('orderBy'),
            this.select('status'),
            this.select('type'),
        ])
            .pipe(
                debounceTime(300),
                tap(() => this.setState({ loading: true })),
                switchMap(([query, size, page, orderBy, status, type]) => {
                    return this.organizationApiService.getAll({
                        query,
                        size,
                        page,
                        orderBy,
                        status,
                        type,
                    })
                }),
            )
            .subscribe({
                next: ({ data }) => {
                    this.setState({
                        loading: false,
                        organizations: data,
                    })
                },
                error: (err) => {
                    this.setState({ loading: false })
                    this.alertService.error(err.error.message)
                },
            })
    }
}
