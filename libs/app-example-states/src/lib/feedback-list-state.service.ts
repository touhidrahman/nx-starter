// import { Injectable } from '@angular/core'
// import { FeedbackApiService } from '@myorg/app-example-api-services'
// import { AlertService } from '@myorg/app-example-core'
// import { Feedback, FeedbackOptionRadioItem, FEEDBACK_OPTIONS } from '@myorg/app-example-models'
// import { SimpleStore } from '@myorg/store'
// import { FeedbackType } from 'libs/app-example-models/src/lib/feedback-type.enum'
// import { shake } from 'radash'
// import { combineLatest, debounceTime, switchMap, tap } from 'rxjs'

// export interface FeedbackListState {
//     feedbacks: Feedback[]
//     loading: boolean
//     filterType: FeedbackType | null
//     filterActivePage: string // it is the value from where the feedback was created by the user
//     filterIsRead: boolean
//     filterIsReplied: boolean
//     currentPage: number
//     totalPages: number
//     totalResults: number
// }

// const initialFilterListState: FeedbackListState = {
//     feedbacks: [],
//     loading: false,
//     filterType: null,
//     filterActivePage: '',
//     filterIsRead: false,
//     filterIsReplied: false,
//     currentPage: 1,
//     totalPages: 1,
//     totalResults: 0,
// }

// const PAGE_SIZE = 24

// @Injectable()
// export class FeedbackListStateService extends SimpleStore<FeedbackListState> {
//     feedbackOptions: FeedbackOptionRadioItem[] = FEEDBACK_OPTIONS

//     constructor(
//         private feedbackApiService: FeedbackApiService,
//         private alertService: AlertService,
//     ) {
//         super(initialFilterListState)
//         this.init()
//     }

//     init() {
//         this.continueLoadingFeedbacks()
//     }

//     private continueLoadingFeedbacks() {
//         combineLatest([
//             this.select('filterType'),
//             this.select('filterActivePage'),
//             this.select('currentPage'),
//             this.select('filterIsRead'),
//             this.select('filterIsReplied'),
//         ])
//             .pipe(
//                 debounceTime(300),
//                 tap(() => this.setState({ loading: true })),
//                 switchMap(([type, activePage, currentPage, isRead, isReplied]) => {
//                     return this.feedbackApiService.find(
//                         shake({
//                             feedbackType: type ?? undefined,
//                             activePage: activePage,
//                             page: currentPage,
//                             sortBy: 'createdAt',
//                             orderBy: 'desc',
//                             size: PAGE_SIZE, // for now using fixed value. In future we can make it dynamic
//                             isRead,
//                             isReplied,
//                         }),
//                     )
//                 }),
//             )
//             .subscribe({
//                 next: (data) => {
//                     this.setState({
//                         feedbacks: data.data,
//                         loading: false,
//                         totalResults: data.meta?.total,
//                         totalPages: Math.ceil(data.meta?.total ?? 0 / PAGE_SIZE),
//                     })
//                 },
//                 error: (error) => {
//                     this.alertService.error(error.message)
//                     this.setState({ loading: false })
//                 },
//             })
//     }

//     markAsRead(id: string) {
//         this.feedbackApiService.markAsRead(id).subscribe((obj) => {
//             this.alertService.success('Feedback marked as read')
//         })
//     }

//     replySubmit(id: string, replyText: string) {
//         this.feedbackApiService.replyFeedback(id, replyText).subscribe(() => {
//             this.alertService.success('Success. Your reply will be sent to the user via email')
//         })
//     }
// }
