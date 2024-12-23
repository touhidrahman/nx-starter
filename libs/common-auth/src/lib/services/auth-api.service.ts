import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'
import { AUTH_API_URL } from '../auth-api-url.injector'
import { LoginResponse } from '../models/login-response'
import { SignupInput } from '../models/signup-input'
import { GroupInput } from '../models/group'

@Injectable({
    providedIn: 'root',
})
export class AuthApiService<TUser> {
    constructor(
        private http: HttpClient,
        @Inject(AUTH_API_URL) private authApiUrl: string,
    ) { }

    getMe(): Observable<ApiResponse<TUser>> {
        return this.http.get<ApiResponse<TUser>>(`${this.authApiUrl}/me`)
    }

    isSuperAdmin(userId: string): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.authApiUrl}/${userId}/is-admin`,
            {},
        )
    }

    login(
        email: string,
        password: string,
    ): Observable<ApiResponse<LoginResponse>> {
        return this.http.post<ApiResponse<LoginResponse>>(
            `${this.authApiUrl}/login`,
            {
                email,
                password,
            },
        )
    }

    register(input: SignupInput): Observable<ApiResponse<TUser>> {
        return this.http.post<ApiResponse<TUser>>(
            `${this.authApiUrl}/register`,
            input,
        )
    }

    adminRegister(input: SignupInput): Observable<ApiResponse<TUser>> {
        return this.http.post<ApiResponse<TUser>>(
            `${this.authApiUrl}/admin/register`,
            input,
        )
    }

    refreshAccessToken(
        refreshToken: string,
    ): Observable<ApiResponse<LoginResponse>> {
        return this.http.post<ApiResponse<LoginResponse>>(
            `${this.authApiUrl}/refresh-access-token`,
            {
                token: refreshToken,
            },
        )
    }

    changePassword(
        userId: number,
        currentPassword: string,
        password: string,
        // passwordConfirmation?: string,
    ): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.authApiUrl}/change-password`,
            {
                userId,
                password,
                currentPassword,
                // passwordConfirmation,
            },
        )
    }

    forgotPassword(email: string): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.authApiUrl}/forgot-password`,
            { email },
        )
    }

    resetPassword(
        token: string,
        email: string,
        password: string,
    ): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.authApiUrl}/reset-password/${token}'`,
            {
                email,
                password,
            },
        )
    }

    logout(): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.authApiUrl}/logout`,
            {},
        )
    }

    verifyEmail(token: string): Observable<ApiResponse<boolean>> {
        return this.http.get<ApiResponse<boolean>>(
            `${this.authApiUrl}/verify-email/${token}`,
        )
    }

    setDefaultGroupToAuthUser(
        userId: string,
        groupId: string,
    ): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.authApiUrl}/set-default-group`,
            { userId, groupId },
        )
    }

    createGroupAndProfile(input: Partial<GroupInput>, type: 'client' | 'vendor'): Observable<ApiResponse<{}>> {
        return this.http.post<ApiResponse<{}>>(
            `${this.authApiUrl}/create-profile/${type}`,
            input,
        )
    }
}
