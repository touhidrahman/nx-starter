import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '@myorg/common-services'
import { User } from '@myorg/app-example-models'

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService<User, unknown> {
    protected override http: HttpClient

    constructor() {
        const http = inject(HttpClient)

        super(http, 'v1/users')

        this.http = http
    }

    getMe(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`)
    }
}
