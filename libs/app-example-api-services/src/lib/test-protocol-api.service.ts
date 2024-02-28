import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_VALIDATION_ENVIRONMENT,
    AppValidationEnvironment,
} from '@my-nx-starter/app-example-core'
import { TestProtocol } from '@my-nx-starter/app-example-models'
import { ApiResponse } from '@my-nx-starter/common-models'
import { Observable, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TestProtocolApiService {
    constructor(
        private http: HttpClient,
        @Inject(APP_VALIDATION_ENVIRONMENT)
        private env: AppValidationEnvironment,
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
