import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { User } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ProfileApiService {
    private readonly apiUrl: string = ''

    constructor(
        private http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        this.apiUrl = `${env.apiUrl}/v1/profile`
    }

    uploadProfilePic(attachments: FormData): Observable<ApiResponse<User>> {
        return this.http.post<ApiResponse<User>>(
            `${this.apiUrl}/image`,
            attachments,
        )
    }

    deleteProfilePic(): Observable<ApiResponse<User>> {
        return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/image`)
    }
}
