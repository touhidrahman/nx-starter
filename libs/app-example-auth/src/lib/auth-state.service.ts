import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import {
    Permission,
    User,
    UserPermissionKeys,
    UserRole,
} from '@myorg/app-example-models'
import {
    AuthApiService,
    SignupInput,
    TokenStorageService,
} from '@myorg/common-auth'
import { LocalStorageService } from '@myorg/common-services'

import { SimpleStore } from '@myorg/store'
import { debounceTime, map, timer } from 'rxjs'

export interface AuthState {
    isLoggedIn: boolean
    accessToken: string
    refreshToken: string
    user: User | null
    lastUpdated: Date | null
    isSuperAdmin: boolean
}

export const initialAuthState: AuthState = {
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    user: null,
    lastUpdated: null,
    isSuperAdmin: false,
}

@Injectable({
    providedIn: 'root',
})
export class AuthStateService extends SimpleStore<AuthState> {
    private refreshTokenTimeout?: any
    private jwtHelper = new JwtHelperService()
    private tokenStorageService = inject(TokenStorageService)
    private authApiService = inject<AuthApiService<User>>(AuthApiService)
    private localStorageService = inject(LocalStorageService)
    private router = inject(Router)

    constructor() {
        super(initialAuthState)
    }

    getUser(): User | null {
        return this.getState().user ?? null
    }

    getUserId(): string | null {
        return this.getState().user?.id ?? null
    }

    getUserRole(): UserRole | null {
        return this.getState().user?.role ?? null
    }

    getLoginStatus(): boolean {
        return this.getState().isLoggedIn
    }

    getOrganizationId(): string | null {
        return this.getState().user?.organizationId ?? null
    }

    isAuthenticated(): boolean {
        return this.getState().isLoggedIn
    }

    isLoggedIn(): boolean {
        return this.getState().isLoggedIn
    }

    isSuperAdmin(): boolean {
        return this.getState().isSuperAdmin ?? false
    }

    isOwner(): boolean {
        return this.getUser()?.isOwner ?? false
    }

    canAccess(key: UserPermissionKeys | '') {
        if (key === '') return true
        return this.canDelete(key) || this.canRead(key) || this.canWrite(key)
    }

    canRead(key: UserPermissionKeys) {
        return (
            this.getUser()?.permissions[key].includes(Permission.Read) ?? false
        )
    }

    canWrite(key: UserPermissionKeys) {
        return (
            this.getUser()?.permissions[key].includes(Permission.Write) ?? false
        )
    }

    canDelete(key: UserPermissionKeys) {
        return (
            this.getUser()?.permissions[key].includes(Permission.Delete) ??
            false
        )
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

    register(signupInput: SignupInput) {
        return this.authApiService.register(signupInput).pipe(
        )
    }

    refreshAccessToken() {
        const refreshToken = this.tokenStorageService.getRefreshToken()

        return this.authApiService.refreshAccessToken(refreshToken ?? '').pipe(
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
        console.log(decoded)

        this.setState({
            accessToken,
            refreshToken,
            isLoggedIn: true,
            user,
            lastUpdated: new Date(),
            isSuperAdmin: decoded.superAdmin,
        })
        this.saveInLocalStorage(user)
        this.startRefreshTokenTimer()
    }

    logout(redirectPath = '') {
        this.authApiService.logout().subscribe()
        this.reset()
        this.stopRefreshTokenTimer()
        this.localStorageService.removeItem('user')
        this.tokenStorageService.clear()
        this.router.navigate([redirectPath])
        timer(1000).subscribe(() => window.location.reload())
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

    private logging() {
        this.selectAll()
            .pipe(debounceTime(300))
            .subscribe({
                next: (state) => console.log(state),
            })
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
