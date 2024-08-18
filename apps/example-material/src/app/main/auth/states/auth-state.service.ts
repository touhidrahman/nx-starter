import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { WINDOW } from '@ng-web-apis/common'
import { Observable, map, of, timer } from 'rxjs'
import { LocalStorageService } from '@myorg/common-services'
import { SimpleStore } from '@myorg/store'
import { getAuthRoutes } from '../../../pages/auth/auth.routes'
import {
    AuthApiService,
    LoginResponse,
    TokenStorageService,
} from '@myorg/common-auth'
import { User } from '@myorg/app-example-models'

export interface AuthState {
    isLoggedIn: boolean
    accessToken: string
    refreshToken: string
    user: User | null
    lastUpdated: Date | null
    isAdmin: boolean
    isSuperAdmin: boolean
}

export const initialAuthState: AuthState = {
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    user: null,
    lastUpdated: null,
    isAdmin: false,
    isSuperAdmin: false,
}

@Injectable({
    providedIn: 'root',
})
export class AuthStateService extends SimpleStore<AuthState> {
    private windowRef = inject(WINDOW)
    private tokenStorageService = inject(TokenStorageService)
    private authApiService = inject<AuthApiService<User>>(AuthApiService)
    private localStorageService = inject(LocalStorageService)
    private router = inject(Router)

    private refreshTokenTimeout?: ReturnType<typeof setTimeout>
    private jwtHelper = new JwtHelperService()

    constructor() {
        super(initialAuthState)
    }

    getUser(): User | null {
        return this.getState().user ?? null
    }

    getUserId(): string | null {
        return this.getState().user?.id ?? null
    }

    isLoggedIn(): boolean {
        return this.getState().isLoggedIn
    }

    isAdmin(): boolean {
        return this.getState().isAdmin ?? false
    }

    isSuperAdmin(): boolean {
        return this.getState().isSuperAdmin ?? false
    }

    login(username: string, password: string) {
        return this.authApiService.login(username, password).pipe(
            map(({ data }) => {
                data &&
                    this.setStateAfterLogin(
                        data.accessToken,
                        data.refreshToken,
                        data.user,
                    )
                return data
            }),
        )
    }

    refreshAccessToken(): Observable<LoginResponse<User> | undefined> {
        const refreshToken = this.tokenStorageService.getRefreshToken()
        if (!refreshToken) return of(undefined)

        return this.authApiService.refreshAccessToken(refreshToken).pipe(
            map(({ data }) => {
                data &&
                    this.setStateAfterLogin(
                        data.accessToken,
                        data.refreshToken,
                        data.user,
                    )
                return data
            }),
        )
    }

    setStateAfterLogin(accessToken: string, refreshToken: string, user: User) {
        const decoded = this.jwtHelper.decodeToken(accessToken)

        this.setState({
            accessToken,
            refreshToken,
            isLoggedIn: true,
            user,
            lastUpdated: new Date(),
            isSuperAdmin: decoded?.['superAdmin'] ?? false,
        })
        this.saveInLocalStorage(user)
        this.startRefreshTokenTimer()
    }

    logout() {
        this.authApiService.logout().subscribe()
        this.reset()
        this.stopRefreshTokenTimer()
        this.localStorageService.removeItem('user')
        this.tokenStorageService.clear()
        this.router.navigate([getAuthRoutes().login.path])
        timer(1000).subscribe(() => this.windowRef.location.reload())
    }

    setUser(user: User) {
        this.setState({ user, lastUpdated: new Date() })
        this.saveInLocalStorage(user)
    }

    private saveInLocalStorage(user: User) {
        this.localStorageService.setItem('user', JSON.stringify(user))
        this.tokenStorageService.saveAccessToken(this.getState().accessToken)
        this.tokenStorageService.saveRefreshToken(this.getState().refreshToken)
    }

    private startRefreshTokenTimer() {
        const { accessToken } = this.getState()
        const decoded = this.jwtHelper.decodeToken(accessToken)

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(decoded.exp * 1000)
        const timeout = expires.getTime() - Date.now() - 60 * 1000
        this.refreshTokenTimeout = setTimeout(
            () => this.refreshAccessToken().subscribe(),
            timeout,
        )
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout)
    }
}
