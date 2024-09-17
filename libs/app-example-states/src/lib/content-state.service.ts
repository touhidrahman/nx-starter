// import { Injectable, OnDestroy } from '@angular/core'
// import { ContentApiService } from '@myorg/app-example-api-services'
// import { Content } from '@myorg/app-example-models'
// import { SimpleStore } from '@myorg/store'
// import {
//     Subject,
//     combineLatest,
//     distinctUntilChanged,
//     filter,
//     shareReplay,
//     switchMap,
//     takeUntil,
//     tap,
// } from 'rxjs'
// import { AppStateService } from './app-state.service'

// export interface ContentState {
//     contents: Content[]
//     selectedContent: Content | null
//     loading: boolean
//     search: string
//     selectedContentId: string
// }

// const initialState: ContentState = {
//     contents: [],
//     selectedContent: null,
//     loading: false,
//     search: '',
//     selectedContentId: '',
// }

// @Injectable({
//     providedIn: 'root',
// })
// export class ContentStateService extends SimpleStore<ContentState> implements OnDestroy {
//     private destroyed$$ = new Subject<void>()

//     constructor(
//         private contentApiService: ContentApiService,
//         private appStateService: AppStateService,
//     ) {
//         super(initialState)
//     }

//     init() {
//         this.continueLoadingContents()
//         this.continueLoadingContentFromId()
//     }

//     prependContent(content: Content) {
//         this.setState({ contents: [content, ...this.getState().contents] })
//     }

//     ngOnDestroy(): void {
//         this.destroyed$$.next()
//         this.destroyed$$.complete()
//         super.destroy()
//     }

//     private continueLoadingContentFromId() {
//         this.select('selectedContentId')
//             .pipe(
//                 filter((id) => !!id),
//                 switchMap((id) => this.contentApiService.findById(id)),
//                 takeUntil(this.destroyed$$),
//             )
//             .subscribe({
//                 next: ({ data: content }) => {
//                     this.setState({ selectedContent: content })
//                 },
//             })
//     }

//     private continueLoadingContents() {
//         combineLatest([
//             this.select('search').pipe(distinctUntilChanged()),
//         ])
//             .pipe(
//                 tap(() => this.setState({ loading: true })),
//                 switchMap(([search]) => {
//                     return this.contentApiService.find({
//                         search,
//                         page: 1,
//                         size: 20,
//                         sortBy: 'createdAt',
//                         orderBy: 'desc',
//                         organizationId: this.appStateService.getState().organization?.id ?? '',
//                     })
//                 }),
//                 shareReplay({ refCount: true, bufferSize: 1 }),
//                 takeUntil(this.destroyed$$),
//             )
//             .subscribe({
//                 next: ({ data }) => {
//                     this.setState({ contents: data, loading: false })
//                 },
//             })
//     }
// }
