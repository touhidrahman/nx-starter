import { inject, Injectable } from '@angular/core'
import { environment } from '../../../../environment/environment'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CourtService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAll() {
        return this.http.get(`${this.apiUrl}/courts`)
    }

    get(id: string) {
        return this.http.get(`${this.apiUrl}/courts/${id}`)
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/courts`, data)
    }

    update(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/courts/${id}`, data)
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/courts/${id}`)
    }
}
