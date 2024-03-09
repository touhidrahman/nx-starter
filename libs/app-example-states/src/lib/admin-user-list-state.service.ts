import { Injectable } from '@angular/core'
import { UserApiService } from '@myorg/app-example-api-services'
import { User } from '@myorg/app-example-models'
import { QueryResultStore } from '@myorg/store'
import { shake, toInt } from 'radash'
import { Observable, debounceTime, map, of, switchMap } from 'rxjs'

interface AdminUserListStateQueryParams {
    orderBy: 'asc' | 'desc'
    sortBy: keyof User | ''
    isOwner?: true
    organizationId?: string
    search: string
    page: number
    size: number
}

interface AdminUserListStateResults {
    users: User[]
    totalPages: number
    totalResults: number
}

const initialQuery: AdminUserListStateQueryParams = {
    orderBy: 'desc',
    sortBy: 'createdAt',
    isOwner: undefined,
    organizationId: undefined,
    search: '',
    page: 1,
    size: 10,
}

const initialResult: AdminUserListStateResults = {
    users: [],
    totalPages: 1,
    totalResults: 0,
}

@Injectable()
export class AdminUserListStateService extends QueryResultStore<
    AdminUserListStateQueryParams,
    AdminUserListStateResults,
    { loading: boolean }
> {
    constructor(private userApiService: UserApiService) {
        super({
            query: initialQuery,
            result: initialResult,
            transient: { loading: true },
        })
        this.init()
    }

    init() {
        this.continueFiltering()
    }

    setQueryParams(queryParams: Partial<AdminUserListStateQueryParams>) {
        const {
            search,
            orderBy,
            sortBy,
            isOwner: incomingIsOwner,
            organizationId,
            page,
            size,
        } = queryParams
        const existing = this.getState().query
        const isOwner = incomingIsOwner === true || incomingIsOwner === 'true' ? true : undefined
        const shouldResetPage =
            search !== existing.search ||
            isOwner !== existing.isOwner ||
            organizationId !== existing.organizationId

        this.setQuery({
            isOwner,
            ...(organizationId ? { organizationId } : {}),
            ...(search ? { search } : {}),
            ...(orderBy ? { orderBy } : {}),
            ...(sortBy ? { sortBy } : {}),
            // ...(page ? { page: toInt(page) } : {}),
            // ...(size ? { size: toInt(size) } : {}),
            ...(shouldResetPage ? { page: 1 } : {}),
        })
    }

    private getResults(
        query: AdminUserListStateQueryParams,
    ): Observable<AdminUserListStateResults> {
        const result = this.getCachedResult()
        if (result) {
            return of(result)
        }

        this.setTransient({ loading: true })

        return this.userApiService.find(shake(query)).pipe(
            map((response) => {
                return {
                    users: response?.data ?? [],
                    totalPages: Math.ceil(response.meta?.total ?? 0 / query.size),
                    totalResults: response.meta?.total ?? 0,
                }
            }),
        )
    }

    private continueFiltering() {
        this.select('query')
            .pipe(
                debounceTime(500),
                switchMap((query) => this.getResults(query)),
            )
            .subscribe({
                next: (results) => {
                    this.setResult(results)
                    this.setTransient({ loading: false })
                    this.cacheResult(results)
                },
                error: (error) => {
                    this.setTransient({ loading: false })
                },
            })
    }
}
