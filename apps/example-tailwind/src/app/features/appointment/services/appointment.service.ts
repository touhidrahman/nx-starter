import { inject, Injectable } from '@angular/core'
import { environment } from '../../../../environment/environment'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AppointmentService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

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
