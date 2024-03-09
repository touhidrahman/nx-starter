import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { TestProtocol } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TestProtocolApiService {
    constructor(
        private http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {}

    find(): Observable<ApiResponse<TestProtocol[]>> {
        return of({
            code: 200,
            message: 'Success',
            status: 'success',
            data: [
                {
                    id: '1',
                    test_protocol_steps: [],
                    test_protocol_steps_ids: [],
                },
                {
                    id: '2',
                    test_protocol_steps: [],
                    test_protocol_steps_ids: [],
                },
            ],
        })
    }

    x_find(): Observable<ApiResponse<TestProtocol[]>> {
        return this.http.get<ApiResponse<TestProtocol[]>>(
            `${this.env.apiUrl}/test-protocol`,
        )
    }
}
