import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { UserLog, UserLogDto } from '@myorg/app-example-models'
import { ApiService } from '@myorg/common-services'

@Injectable({
    providedIn: 'root',
})
export class UserLogApiService extends ApiService<UserLog, UserLogDto> {
    constructor(
        protected override http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(http, `${env.apiUrl}/v1/user-logs`)
    }
}
