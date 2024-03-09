import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import {
    ApprovalDocument,
    ExecutionTest,
} from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ExecutionTestApiService {
    constructor(
        private http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {}

    find(): Observable<ApiResponse<ExecutionTest[]>> {
        return of({
            data: [
                {
                    id: '1',
                    author_id: '1',
                    date: new Date(),
                    execution_test_steps: [],
                    execution_test_steps_ids: [],
                    test_protocol: {
                        id: '1',
                        test_protocol_steps: [],
                        test_protocol_steps_ids: [],
                    },
                    test_protocol_id: '1',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '2',
                    author_id: '2',
                    date: new Date(),
                    execution_test_steps: [],
                    execution_test_steps_ids: [],
                    test_protocol: {
                        id: '2',
                        test_protocol_steps: [],
                        test_protocol_steps_ids: [],
                    },
                    test_protocol_id: '2',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '3',
                    author_id: '3',
                    date: new Date(),
                    execution_test_steps: [],
                    execution_test_steps_ids: [],
                    test_protocol: {
                        id: '3',
                        test_protocol_steps: [],
                        test_protocol_steps_ids: [],
                    },
                    test_protocol_id: '3',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            message: 'Success',
            status: 'success',
            code: 200,
        })

        // return this.http.get<ApiResponse<ExecutionTest[]>>(
        //     `${this.env.apiUrl}/execution-tests`,
        // )
    }
}
