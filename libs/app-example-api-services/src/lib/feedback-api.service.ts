import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Feedback, FeedbackDto } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { ApiService } from '@myorg/common-services'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class FeedbackApiService extends ApiService<Feedback, FeedbackDto> {
    constructor(
        protected override http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(http, `${env.apiUrl}/v1/feedbacks`)
    }

    sendFeedback(
        dto: FeedbackDto & { attachments: File[] },
    ): Observable<ApiResponse<Feedback>> {
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
        })

        const formData = new FormData()
        formData.append('userId', dto.userId)
        formData.append('feedbackType', dto.feedbackType)
        formData.append('feedbackText', dto.feedbackText)
        formData.append('activePage', dto.activePage)
        // biome-ignore lint/complexity/noForEach: <explanation>
        dto.attachments.forEach((file) => formData.append('attachments', file))

        return this.http.post<ApiResponse<Feedback>>(`${this.apiUrl}`, formData)
    }

    markAsRead(feedbackId: string): Observable<ApiResponse<Feedback>> {
        return this.update(feedbackId, { isRead: true })
    }

    replyFeedback(
        feedbackId: string,
        replyText: string,
    ): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.apiUrl}/${feedbackId}/reply`,
            {
                replyText,
            },
        )
    }
}
