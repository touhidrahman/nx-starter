import { ProviderToken, computed, inject } from '@angular/core'
import { ApiResponse } from '@myorg/common-models'
import { ApiService } from '@myorg/common-services'
import { tapResponse } from '@ngrx/operators'
import {
    patchState,
    signalStoreFeature,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { debounceTime, distinctUntilChanged, pipe } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { withLoading } from './with-loading'

export interface WithPagedEntityState<Entity> {
    entities: Entity[]
    page: number
    pageSize: number
    total: number
    totalPages: number
    selectedId: number | undefined
}

export function withPagedEntities<
    Entity extends { id: string },
    Service extends ApiService<Entity, any>,
>(Loader: ProviderToken<Service>) {
    return signalStoreFeature(
        withLoading(),
        withState<WithPagedEntityState<Entity>>({
            entities: [] as Entity[],
            page: 0,
            pageSize: 10,
            total: 0,
            totalPages: 0,
            selectedId: undefined,
        }),
        withMethods((state) => {
            const loader = inject(Loader)
            return {
                // idea: rxMethod, which is an RxJS operator that creates an observable to handle a specific task, integrates RxJS observables with NgRx Signal Store.
                load: rxMethod<{ page: number; pageSize: number }>(
                    pipe(
                        tap(({ page, pageSize }) =>
                            patchState(state, { page, pageSize }),
                        ),
                        debounceTime(1000),
                        distinctUntilChanged(),
                        tap(() => state.setLoading(true)),
                        switchMap(({ page, pageSize }) =>
                            loader.find({ page, pageSize }),
                        ),
                        tap(() => state.setLoading(false)),
                        tapResponse({
                            next: (response: ApiResponse<Entity[]>) => {
                                const { data, meta } = response
                                patchState(state, {
                                    entities: data || [],
                                    page: meta?.page || state.page(),
                                    total: meta?.total || state.total(),
                                })
                            },
                            error: console.error,
                        }),
                    ),
                ),

                nextPage() {
                    const page = state.page()
                    console.log('🚀 ~ nextPage ~ page:', page)
                    const totalPages = Math.ceil(
                        state.total() / state.entities().length,
                    )
                    console.log('🚀 ~ nextPage ~ totalPages:', totalPages)

                    if (page >= totalPages) {
                        return
                    }

                    this.load({ page: page + 1, pageSize: state.pageSize() })
                },

                previousPage() {
                    const page = state.page()
                    if (page <= 1) {
                        return
                    }

                    this.load({ page: page - 1, pageSize: state.pageSize() })
                },

                select(id: number) {
                    patchState(state, { selectedId: id })
                },

                unselect() {
                    patchState(state, { selectedId: undefined })
                },

                toggleSelect(id: number) {
                    const selectedId = state.selectedId()
                    if (selectedId === id) {
                        this.unselect()
                    } else {
                        this.select(id)
                    }
                },
            }
        }),

        withComputed((state) => {
            return {
                pagedEntities: computed(() => {
                    const selectedId = state.selectedId()

                    return {
                        entities: state.entities().map((entity) => ({
                            ...entity,
                            selected:
                                selectedId !== undefined &&
                                entity.id === selectedId.toString(),
                        })),
                        page: state.page(),
                        total: state.total(),
                    }
                }),
            }
        }),
    )
}
