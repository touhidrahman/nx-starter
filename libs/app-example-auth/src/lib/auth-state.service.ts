import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import {
    User,
    UserLevel,
    UserPermissionKeys,
    UserRole,
} from '@myorg/app-example-models'
import {
    AuthApiService,
    SignupInput,
    TokenStorageService,
} from '@myorg/common-auth'
import { SimpleStore } from '@myorg/store'
import { catchError, debounceTime, map, of, timer } from 'rxjs'

export interface AuthState {
    isLoggedIn: boolean
    accessToken: string
    refreshToken: string
    userId: string | null
    groupId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    role: UserRole | null
    lastUpdated: Date | null
    level: UserLevel | null
}

export const initialAuthState: AuthState = {
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    userId: null,
    groupId: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    level: null,
    lastUpdated: null,
}

@Injectable({
    providedIn: 'root',
})
export class AuthStateService extends SimpleStore<AuthState> {
    private refreshTokenTimeout?: any
    private jwtHelper = new JwtHelperService()
    private tokenStorageService = inject(TokenStorageService)
    private authApiService = inject<AuthApiService<User>>(AuthApiService)
    private router = inject(Router)

    constructor() {
        super(initialAuthState)
    }

    getUserId(): string | null {
        return this.getState().userId
    }
    getUserEmail(): string | null {
        return this.getState().email
    }

    getUserRole(): UserRole | null {
        return this.getState().role
    }

    getLoginStatus(): boolean {
        return this.getState().isLoggedIn
    }

    getGroupId(): string | null {
        return this.getState().groupId
    }

    isLoggedIn(): boolean {
        return this.getState().isLoggedIn
    }

    isSuperAdmin(): boolean {
        return this.getState().level === UserLevel.Admin
    }

    isAdmin(): boolean {
        return this.getState().role === UserRole.Admin
    }

    canAccess(key: UserPermissionKeys | '') {
        if (key === '') return true
        return this.canDelete(key) || this.canRead(key) || this.canWrite(key)
    }

    /**
     * TODO: to be implemented
     */
    canRead(key: UserPermissionKeys) {
        return false
    }

    /**
     * TODO: to be implemented
     */
    canWrite(key: UserPermissionKeys) {
        return false
    }

    /**
     * TODO: to be implemented
     */
    canDelete(key: UserPermissionKeys) {
        return false
    }

    login(username: string, password: string) {
        return this.authApiService.login(username, password).pipe(
            map(({ data }) => {
                data &&
                    this.setStateAfterLogin(data.accessToken, data.refreshToken)
                return data
            }),
        )
    }

    register(signupInput: SignupInput) {
        return this.authApiService.register(signupInput).pipe()
    }

    initAuthFromStorage() {
        const accessToken = this.tokenStorageService.getAccessToken()
        const refreshToken = this.tokenStorageService.getRefreshToken()

        if (!accessToken || !refreshToken) {
            return
        }

        this.setStateAfterLogin(accessToken, refreshToken)
    }

    refreshAccessToken() {
        const refreshToken = this.tokenStorageService.getRefreshToken()

        return this.authApiService.refreshAccessToken(refreshToken ?? '').pipe(
            map(({ data }) => {
                data &&
                    this.setStateAfterLogin(data.accessToken, data.refreshToken)
                return data
            }),
            catchError((err) => {
                console.error(err)
                // this.logout()
                return of(null)
            }),
        )
    }

    setStateAfterLogin(accessToken: string, refreshToken: string) {
        const decoded = this.jwtHelper.decodeToken(accessToken)
        console.log('TCL: AuthStateService -> decoded', decoded)

        this.setState({
            accessToken,
            refreshToken,
            isLoggedIn: true,
            userId: decoded.sub,
            groupId: decoded.groupId,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            role: decoded.role,
            level: decoded.level,
            lastUpdated: new Date(),
        })
        this.saveInLocalStorage()
        this.startRefreshTokenTimer()
    }

    logout(redirectPath = '', reload = false) {
        this.authApiService.logout().subscribe()
        this.reset()
        this.stopRefreshTokenTimer()
        this.tokenStorageService.clear()
        this.router.navigate([redirectPath])
        timer(1000).subscribe(() => reload && window.location.reload())
    }

    private saveInLocalStorage() {
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
        // this.refreshTokenTimeout = setTimeout(
        //     () => this.refreshAccessToken().subscribe(),
        //     timeout,
        // )
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout)
    }
}
