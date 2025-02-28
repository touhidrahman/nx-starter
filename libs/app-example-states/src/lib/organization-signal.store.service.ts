// import { computed, inject } from '@angular/core'
// import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs'
// import {
//     patchState,
//     signalStore,
//     withState,
//     withMethods,
//     withComputed,
//     withHooks,
// } from '@ngrx/signals'
// import { rxMethod } from '@ngrx/signals/rxjs-interop'
// import { tapResponse } from '@ngrx/operators'
// import { AlertService } from '@myorg/app-example-core'
// import { Organization } from '../../../../apps/example-tailwind/src/app/features/organizaiton/models/organization'
// import { OrganizationApiService } from '@myorg/app-example-api-services'
//
// export type OrganizationSignalStoreService = {
//     loading: boolean
//     organizations: Organization[]
//     organization: Organization | null
//     filter: {
//         query: string
//         page: number
//         size: number
//         orderBy: 'asc' | 'desc'
//         status: string
//         type: string
//     }
// }
//
// const initialState: OrganizationSignalStoreService = {
//     loading: false,
//     organizations: [],
//     organization: null,
//     filter: {
//         query: '',
//         page: 1,
//         size: 10,
//         orderBy: 'asc',
//         status: '',
//         type: '',
//     },
// }
//
// export const OrganizationsStore = signalStore(
//     { providedIn: 'root' },
//     withState(initialState),
//
//     withMethods((store) => {
//         const organizationsService = inject(OrganizationApiService)
//         const alertService = inject(AlertService)
//
//         return {
//             updateQuery(query: string): void {
//                 patchState(store, (state) => ({
//                     filter: { ...state.filter, query },
//                 }))
//             },
//             updateFilter(
//                 filterUpdates: Partial<OrganizationSignalStoreService['filter']>,
//             ): void {
//                 patchState(store, (state) => ({
//                     filter: { ...state.filter, ...filterUpdates },
//                 }))
//             },
//
//             loadOrganizations: rxMethod<{
//                 query: string
//                 page: number
//                 size: number
//                 orderBy: 'asc' | 'desc'
//                 status: string
//                 type: string
//             }>(
//                 pipe(
//                     debounceTime(300),
//                     distinctUntilChanged(),
//                     tap(() => patchState(store, { loading: true })),
//                     switchMap(({ query }) => {
//                         return organizationsService.getAll({ query }).pipe(
//                             tapResponse({
//                                 next: ({ data }) => {
//                                     console.log(data)
//                                     patchState(store, {
//                                         // organizations: data,
//                                         loading: false,
//                                         // filter: { ...store.filter(), query },
//                                     })
//                                 },
//
//                                 error: (error: any) => {
//                                     patchState(store, { loading: false })
//                                     alertService.error(error.error.message)
//                                 },
//                             }),
//                         )
//                     }),
//                 ),
//             ),
//             create: rxMethod<Organization>(
//                 pipe(
//                     tap(() => patchState(store, { loading: true })),
//                     switchMap((data) => {
//                         return organizationsService.create(data).pipe(
//                             tapResponse({
//                                 next: (response) => {
//                                     alertService.success(
//                                         'Organization created successfully',
//                                     )
//                                     patchState(store, {
//                                         loading: false,
//                                         organizations: response.data
//                                             ? [
//                                                   ...store.organizations(),
//                                                   response.data,
//                                               ]
//                                             : store.organizations(),
//                                     })
//                                 },
//                                 error: (error: any) => {
//                                     patchState(store, { loading: false })
//                                     alertService.error(error.error.message)
//                                 },
//                             }),
//                         )
//                     }),
//                 ),
//             ),
//         }
//     }),
//     withHooks((store) => {
//         return {
//             onInit() {
//                 store.loadOrganizations({
//                     query: '',
//                     page: 1,
//                     size: 10,
//                     orderBy: 'asc',
//                     status: '',
//                     type: '',
//                 })
//             },
//         }
//     }),
// )
