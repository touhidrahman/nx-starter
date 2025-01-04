import { Injectable } from '@angular/core'
import { UserApiService } from '@myorg/app-example-api-services'
import { AuthStateService } from '@myorg/app-example-auth'
import { Organization } from '@myorg/app-example-models'
import { SimpleStore } from '@myorg/store'
import { BehaviorSubject } from 'rxjs'

export interface AppState {
    currency: 'USD' | 'BDT'
    language: 'en' | 'bn'
    theme: 'dark' | 'light'
    organization: Organization | null
}

export const initialState: AppState = {
    currency: 'BDT',
    language: 'bn',
    theme: 'light',
    organization: null,
}

/**
 * Stores crucial information and functionalities for the app's full lifecycle
 */
@Injectable({
    providedIn: 'root',
})
export class AppStateService extends SimpleStore<AppState> {
    private loadingSubject = new BehaviorSubject<boolean>(true)
    appName = 'Material Test'

    constructor(
        private authStateService: AuthStateService,
        private userApiService: UserApiService,
    ) {
        super(initialState)
    }

    get loading(): boolean {
        return this.loadingSubject.value
    }

    startLoading(): void {
        this.loadingSubject.next(true)
    }

    stopLoading(): void {
        this.loadingSubject.next(false)
    }

    setLoading(loading: boolean): void {
        this.loadingSubject.next(loading)
    }
}
