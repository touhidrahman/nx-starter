import { inject, Injectable } from '@angular/core'
import { environment } from '../../../../environment/environment'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAll() {
        return this.http.get(`${this.apiUrl}/events`)
    }

    get(id: string) {
        return this.http.get(`${this.apiUrl}/events/${id}`)
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/events`, data)
    }

    update(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/events/${id}`, data)
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/events/${id}`)
    }
}
