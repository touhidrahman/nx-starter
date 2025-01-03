import { HttpClient } from '@angular/common/http'
import { Inject, inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Area } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { ApiService } from '@myorg/common-services'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AreaApiService extends ApiService<Area, Area> {
    constructor(
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/v1/application-areas`)
    }

    createApplicationArea(data: Area): Observable<ApiResponse<Area[]>> {
        return this.http.post<ApiResponse<Area[]>>(`${this.apiUrl}`, data)
    }
}
