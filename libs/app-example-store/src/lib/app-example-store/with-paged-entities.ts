import { ProviderToken, computed, inject } from '@angular/core'
import { tapResponse } from '@ngrx/operators'
import {
    patchState,
    signalStoreFeature,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { Observable, debounceTime, distinctUntilChanged, pipe } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { withLoading } from './with-loading'

export interface WithPagedEntityState<Entity> {
    entities: Entity[]
    page: number
    total: number
    selectedId: number | undefined
}

export function withPagedEntities<Entity extends { id: number }>(
    Loader: ProviderToken<{
        load: (
            page: number,
        ) => Observable<{ content: Entity[]; page: number; total: number }>
    }>,
) {
    return signalStoreFeature(
        withLoading(),
        withState<WithPagedEntityState<Entity>>({
            entities: [] as Entity[],
            page: 0,
            total: 0,
            selectedId: undefined,
        }),
        withMethods((state) => {
            const loader = inject(Loader)

            return {
                // idea: rxMethod, which is an RxJS operator that creates an observable to handle a specific task, integrates RxJS observables with NgRx Signal Store.
                load: rxMethod<number>(
                    // step 1: The pipe function is used to compose multiple RxJS operators. It takes an observable source and applies a series of operators to transform the data
                    pipe(
                        // step 2: The tap function is used to perform a side effect on each emission of the source Observable without affecting the stream. It takes a function that takes the current value of the Observable and returns a new Observable.In this case, it updates the state with the new page number.
                        tap((page) => patchState(state, { page })),

                        // step 3: The debounceTime function is used to wait for a specified amount of time before emitting the most recent value from the source Observable. It takes a time value in milliseconds and returns an Observable that emits a value from the source Observable after a specified delay.
                        debounceTime(1000),

                        // step 4: The distinctUntilChanged function is used to filter out emissions from the source Observable that are duplicates of previous emissions. It compares the current value with the previous value and returns an Observable that emits the current value only if it is different from the previous value.This prevents unnecessary requests if the same page number is emitted consecutively.
                        distinctUntilChanged(),
                        tap(() => state.setLoading(true)),

                        // step 5: The switchMap function is used to subscribe to a new Observable or Promise and return the results as an Observable. It takes a function that returns an Observable or a Promise and returns an Observable that emits the values from the returned Observable or Promise.In this case, it subscribes to the loader.load function and returns the Observable returned by the loader.load function.
                        switchMap((page) => loader.load(page)),
                        tap(() => state.setLoading(false)),

                        // step 6: The tapResponse function is used to handle the response from the Observable returned by the switchMap function. It takes an object with two properties: next and error. The next property is a function that takes the response object and performs some action on it. The error property is a function that takes an error object and performs some action on it.
                        tapResponse({
                            next: (response) => {
                                patchState(state, {
                                    entities: response.content,
                                    page: response.page,
                                    total: response.total,
                                })
                            },
                            error: console.error,
                        }),
                    ),
                ),

                nextPage() {
                    const page = state.page()
                    // if (page >= state.total()) {
                    //   return;
                    // }

                    this.load(page + 1)
                },

                previousPage() {
                    const page = state.page()
                    if (page <= 1) {
                        return
                    }

                    this.load(page - 1)
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
                            selected: entity.id === selectedId,
                        })),
                        page: state.page(),
                        total: state.total(),
                    }
                }),
            }
        }),
    )
}
