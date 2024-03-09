import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Invitation, InvitationDto } from '@myorg/app-example-models'
import { ApiService } from '@myorg/common-services'

@Injectable({
    providedIn: 'root',
})
export class InvitationApiService extends ApiService<
    Invitation,
    InvitationDto
> {
    constructor(
        protected override http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(http, `${env.apiUrl}/v1/invitations`)
    }
}
