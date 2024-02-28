import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '@my-nx-starter/common-services'
import { User } from '@my-nx-starter/app-validation-models'

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService<User, unknown> {
    constructor(protected override http: HttpClient) {
        super(http, 'v1/users')
    }

    getMe(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`)
    }
}
