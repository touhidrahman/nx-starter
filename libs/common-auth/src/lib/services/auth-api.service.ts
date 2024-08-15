import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'
import { AUTH_API_URL } from '../auth-api-url.injector'
import { LoginResponse } from '../models/login-response'
import { SignupInput } from '../models/signup-input'

@Injectable({
    providedIn: 'root',
})
export class AuthApiService<TUser> {
    constructor(
        private http: HttpClient,
        @Inject(AUTH_API_URL) private apiUrl: string,
    ) {}

    getMe(): Observable<ApiResponse<TUser>> {
        return this.http.get<ApiResponse<TUser>>(`${this.apiUrl}/me`)
    }

    isSuperAdmin(userId: string): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.apiUrl}/${userId}/is-admin`,
            {},
        )
    }

    login(
        email: string,
        password: string,
    ): Observable<ApiResponse<LoginResponse<TUser>>> {
        return this.http.post<ApiResponse<LoginResponse<TUser>>>(
            `${this.apiUrl}/login`,
            {
                email,
                password,
            },
        )
    }

    register(input: SignupInput): Observable<ApiResponse<TUser>> {
        return this.http.post<ApiResponse<TUser>>(
            `${this.apiUrl}/register`,
            input,
        )
    }

    refreshAccessToken(
        refreshToken: string,
    ): Observable<ApiResponse<LoginResponse<TUser>>> {
        return this.http.post<ApiResponse<LoginResponse<TUser>>>(
            `${this.apiUrl}/refresh-access-token`,
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
            `${this.apiUrl}/change-password`,
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
            `${this.apiUrl}/forgot-password`,
            { email },
        )
    }

    resetPassword(
        token: string,
        email: string,
        password: string,
    ): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.apiUrl}/reset-password/${token}'`,
            {
                email,
                password,
            },
        )
    }

    logout(): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/logout`, {})
    }

    verifyEmail(token: string): Observable<ApiResponse<boolean>> {
        return this.http.get<ApiResponse<boolean>>(
            `${this.apiUrl}/verify-email/${token}`,
        )
    }
}
