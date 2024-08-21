import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    getUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }

    getUserId(): number {
        const user = this.getUser()
        return user ? user.id : -1
    }
}
