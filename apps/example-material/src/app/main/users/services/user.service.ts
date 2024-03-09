import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '@myorg/common-services'
import { User } from '@myorg/app-example-models'

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
