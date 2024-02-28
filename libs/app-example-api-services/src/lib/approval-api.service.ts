import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_VALIDATION_ENVIRONMENT,
    AppValidationEnvironment,
} from '@my-nx-starter/app-example-core'
import { ApprovalDocument } from '@my-nx-starter/app-example-models'
import { ApiResponse } from '@my-nx-starter/common-models'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ApprovalApiService {
    constructor(
        private http: HttpClient,
        @Inject(APP_VALIDATION_ENVIRONMENT)
        private env: AppValidationEnvironment,
    ) {}

    find(): Observable<ApiResponse<ApprovalDocument[]>> {
        return of({
            data: [
                {
                    id: '1',
                    author_id: '1',
                    date_due: new Date(),
                    draft_number: '1',
                    requirement_id: 'Requirement 1',
                    requirement_version: '1',
                    resolution: 'Resolution 1',
                    reviewer_emails: ['a@b.com', 'b@c.com'],
                    type: 'Parallel',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '2',
                    author_id: '2',
                    date_due: new Date(),
                    draft_number: '2',
                    requirement_id: 'Requirement 2',
                    requirement_version: '2',
                    resolution: 'Resolution 2',
                    reviewer_emails: ['a@b.com'],
                    type: 'Serial',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '3',
                    author_id: '3',
                    date_due: new Date(),
                    draft_number: '3',
                    requirement_id: 'Requirement 3',
                    requirement_version: '3',
                    resolution: 'Resolution 3',
                    reviewer_emails: ['a@b.com', 'b@c.com'],
                    type: 'Parallel',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            message: 'Success',
            status: 'success',
            code: 200,
        })

        // return this.http.get<ApiResponse<Requirement[]>>(
        //     `${this.env.apiUrl}/requirements`,
        // )
    }
}
