import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Params } from '@angular/router'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { User, UserDto, UserPermissions } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { ApiService } from '@myorg/common-services'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UserApiService extends ApiService<User, UserDto> {
    private isAdmin = false

    constructor(
        protected override http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(http, `${env.apiUrl}/v1/users`)
    }

    useAdminEndpoint(): void {
        this.isAdmin = true
    }

    private getApiUrl(): string {
        return this.isAdmin ? `${this.env.apiUrl}/v1/admin/users` : this.apiUrl
    }

    getUsers(params: Params = {}): Observable<ApiResponse<User[]>> {
        return this.http.get<ApiResponse<User[]>>(this.getApiUrl(), {
            params,
        })
    }

    getUnapprovedUsers(
        organizationId: string,
    ): Observable<ApiResponse<User[]>> {
        return this.http.get<ApiResponse<User[]>>(this.getApiUrl(), {
            params: { organizationId, isApproved: false },
        })
    }

    setPermissions(
        id: string,
        permissions: UserPermissions,
    ): Observable<ApiResponse<User>> {
        return this.http.patch<ApiResponse<User>>(
            `${this.getApiUrl()}/${id}/permissions`,
            { ...permissions },
        )
    }

    changeRole(id: string, role: string): Observable<ApiResponse<User>> {
        return this.http.patch<ApiResponse<User>>(
            `${this.getApiUrl()}/${id}/change-role`,
            { role },
        )
    }
}
