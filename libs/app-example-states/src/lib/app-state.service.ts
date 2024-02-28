import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

/**
 * Stores crucial information and functionalities for the app's full lifecycle
 */
@Injectable({
    providedIn: 'root',
})
export class AppStateService {
    private loadingSubject = new BehaviorSubject<boolean>(true)
    appName = 'Material Test'

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
