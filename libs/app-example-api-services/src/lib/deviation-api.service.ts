import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_VALIDATION_ENVIRONMENT,
    AppValidationEnvironment,
} from '@my-nx-starter/app-example-core'
import { Deviation } from '@my-nx-starter/app-example-models'
import { ApiResponse } from '@my-nx-starter/common-models'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class DeviationApiService {
    constructor(
        private http: HttpClient,
        @Inject(APP_VALIDATION_ENVIRONMENT)
        private env: AppValidationEnvironment,
    ) {}

    find(): Observable<ApiResponse<Deviation[]>> {
        return of({
            data: [
                {
                    id: '1',
                    category: 'Low',
                    description: 'Description 1',
                    execution_test_step_id: '1',
                    parent_deviation_id: null,
                    resolution: 'Resolution 1',
                    retest_extra_steps_ids: ['1', '2'],
                    retest_extra_steps: [],
                    title: 'Title 1',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '2',
                    category: 'Medium',
                    description: 'Description 2',
                    execution_test_step_id: '2',
                    parent_deviation_id: '1',
                    resolution: 'Resolution 2',
                    retest_extra_steps_ids: ['3', '4'],
                    retest_extra_steps: [],
                    title: 'Title 2',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '3',
                    category: 'High',
                    description: 'Description 3',
                    execution_test_step_id: '3',
                    parent_deviation_id: '2',
                    resolution: 'Resolution 3',
                    retest_extra_steps_ids: ['5', '6'],
                    retest_extra_steps: [],
                    title: 'Title 3',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            status: 'success',
            message: 'Success',
            code: 200,
        })
        // return this.http.get<ApiResponse<Deviation[]>>(
        //     `${this.env.apiUrl}/deviations`,
        // )
    }
}
