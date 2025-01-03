import { Inject, inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'

@Injectable({
    providedIn: 'root',
})
export class AppointmentApiService {
    private http = inject(HttpClient)
    private apiUrl = this.env.apiUrl

    constructor(
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {}

    getAll() {
        return this.http.get(`${this.apiUrl}/appointments`)
    }

    getAppointment(id: string) {
        return this.http.get(`${this.apiUrl}/appointments/${id}`)
    }

    createAppointment(data: any) {
        return this.http.post(`${this.apiUrl}/appointments`, data)
    }

    updateAppointment(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/appointments/${id}`, data)
    }

    deleteAppointment(id: string) {
        return this.http.delete(`${this.apiUrl}/appointments/${id}`)
    }
}
