import { Injectable, OnDestroy } from '@angular/core'
import { ContentApiService } from '@myorg/app-example-api-services'
import { Content } from '@myorg/app-example-models'
import { QueryResultStore } from '@myorg/store'
import { shake } from 'radash'
import { Observable, debounceTime, map, of, switchMap, tap } from 'rxjs'
import { AppStateService } from './app-state.service'

const DEFAULT_PAGE_SIZE = 24

interface ContentListStateQueryParams {
    orderBy: 'asc' | 'desc'
    sortBy: keyof Content | ''
    managerId?: string
    siteId?: string
    status?: string
    type?: string
    search: string
    page: number
    size: number
}

const initialQueryState: ContentListStateQueryParams = {
    orderBy: 'desc',
    sortBy: 'createdAt',
    managerId: undefined,
    siteId: undefined,
    status: undefined,
    type: undefined,
    search: '',
    page: 1,
    size: DEFAULT_PAGE_SIZE,
}

interface ContentListStateResults {
    contents: Content[]
    totalPages: number
    totalResults: number
}

const initialResultState: ContentListStateResults = {
    contents: [],
    totalPages: 1,
    totalResults: 0,
}

@Injectable()
export class ContentListStateService
    extends QueryResultStore<
        ContentListStateQueryParams,
        ContentListStateResults,
        { loading: boolean }
    >
    implements OnDestroy
{
    get loading$() {
        return this.select('transient').pipe(map((transientState) => transientState.loading))
    }

    constructor(
        private contentApiService: ContentApiService,
        private appStateService: AppStateService,
    ) {
        super({
            query: initialQueryState,
            result: initialResultState,
            transient: { loading: true },
        })
        this.init()
    }

    init() {
        this.runFiltering()
        this.onChangeSelectedSite()
    }

    ngOnDestroy(): void {
        this.destroy()
    }

    deleteContent(contentId: string) {
        return this.contentApiService.delete(contentId).pipe(
            tap(() => {
                this.setResult({
                    contents: this.getResult().contents.filter((c) => c.id !== contentId),
                    totalResults: this.getResult().totalResults - 1,
                })
            }),
        )
    }

    private getResults(query: ContentListStateQueryParams): Observable<ContentListStateResults> {
        const cached = this.getCachedResult()
        if (cached) {
            return of(cached)
        }

        this.setTransient({ loading: true })

        return this.contentApiService
            .findByOrganizationId(
                this.appStateService.getState().organization?.id,
                shake({
                    siteId: query.siteId,
                    managerId: query.managerId,
                    type: query.type,
                    status: query.status,
                    search: query.search,
                    page: query.page,
                    size: query.size,
                    sortBy: query.sortBy,
                    orderBy: query.orderBy,
                }),
            )
            .pipe(
                map(({ data: contents, meta }) => {
                    return {
                        contents:
                            query.page === 1
                                ? contents
                                : [...this.getResult().contents, ...contents],
                        totalPages: tuiCeil(meta.total / query.size),
                        totalResults: meta.total,
                    }
                }),
            )
    }

    private runFiltering() {
        this.select('query')
            .pipe(
                debounceTime(300),
                switchMap((queryParams) => this.getResults(queryParams)),
            )
            .subscribe({
                next: (results) => {
                    this.setResult(results)
                    this.setTransient({ loading: false })
                    this.cacheResult(results)
                },
                error: () => {
                    this.setTransient({ loading: false })
                },
            })
    }

    private onChangeSelectedSite() {
        this.siteStateService.select('selectedSite').subscribe({
            next: (selectedSite) => {
                this.setQuery({ siteId: selectedSite?.id, page: 1 })
            },
        })
    }
}
