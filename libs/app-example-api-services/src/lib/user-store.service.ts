import { Injectable } from '@angular/core'
import { UserDto } from '@myorg/app-example-models'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UserStoreService {
    private userDetailsSubject = new BehaviorSubject<UserDto | null>(null)

    userDetails$ = this.userDetailsSubject.asObservable()

    storeUser(user: UserDto | null) {
        if (user) {
            this.userDetailsSubject.next(user)
        } else {
            this.userDetailsSubject.next(null)
        }
    }

    getUserDetails(): UserDto | null {
        return this.userDetailsSubject.getValue()
    }
}
