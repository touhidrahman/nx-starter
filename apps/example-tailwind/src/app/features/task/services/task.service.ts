import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environment/environment'

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAll() {
        return this.http.get(`${this.apiUrl}/tasks`)
    }

    get(id: string) {
        return this.http.get(`${this.apiUrl}/tasks/${id}`)
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/tasks`, data)
    }

    update(id: string, data: any) {
        return this.http.patch(`${this.apiUrl}/tasks/${id}`, data)
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/tasks/${id}`)
    }

    deleteAll() {
        return this.http.delete(`${this.apiUrl}/tasks`)
    }
}
