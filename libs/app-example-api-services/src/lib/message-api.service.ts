import { inject, Injectable } from '@angular/core'
import { environment } from '../../../../apps/example-tailwind/src/environment/environment'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class MessageServices {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAll() {
        return this.http.get(`${this.apiUrl}/messages`)
    }

    get(id: string) {
        return this.http.get(`${this.apiUrl}/messages/${id}`)
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/messages`, data)
    }

    update(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/messages/${id}`, data)
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/messages/${id}`)
    }

    deleteAll() {
        return this.http.delete(`${this.apiUrl}/messages`)
    }
}
