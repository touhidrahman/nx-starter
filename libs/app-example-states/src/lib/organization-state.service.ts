import { inject, Injectable } from '@angular/core'
import { Organization } from '@myorg/app-example-models'
import { SimpleStore } from '@myorg/store'
import {
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    tap,
} from 'rxjs'
import { OrganizationApiService } from '@myorg/app-example-api-services'
import { AlertService } from '@myorg/app-example-core'

export interface OrganizationListState {
    organizations: Organization[]
    selectedOrganization: Organization | null
    loading: boolean
    page: number
    size: number
    orderBy: 'asc' | 'desc'
    query: string
    type: string | undefined
    status: string | undefined
}

const initialState: OrganizationListState = {
    organizations: [],
    selectedOrganization: null,
    loading: false,
    page: 1,
    size: 5,
    orderBy: 'asc',
    query: '',
    type: undefined,
    status: undefined,
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
                debounceTime(500),
                distinctUntilChanged(),
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
                    console.log(err)
                    this.setState({ loading: false })
                    this.alertService.error(err.error.message)
                },
            })
    }

    deleteOrganization(id: string) {
        const { organizations } = this.getState()
        this.setState({ loading: true })
        this.organizationApiService.delete(id).subscribe({
            next: (value) => {
                this.alertService.success('Organization deleted successfully')
                this.setState({
                    loading: false,
                    organizations: organizations.filter((c) => c.id !== id),
                })
            },
            error: (err) => {
                console.log(err.error)
                this.alertService.warn(err.error.message)
            },
        })
    }
}
