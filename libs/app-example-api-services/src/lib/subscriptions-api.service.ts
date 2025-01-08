import { inject, Injectable } from '@angular/core'
import { environment } from '../../../../apps/example-tailwind/src/environment/environment'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class SubscriptionsApiService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAll() {
        return this.http.get(`${this.apiUrl}/subscriptions`)
    }

    get(id: string) {
        return this.http.get(`${this.apiUrl}/subscriptions/${id}`)
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/subscriptions`, data)
    }

    update(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/subscriptions/${id}`, data)
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/subscriptions/${id}`)
    }
}
