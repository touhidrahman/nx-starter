import { Inject, inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Observable } from 'rxjs'
import { ApiResponse } from '@myorg/common-models'
import { Appointment } from '@myorg/app-example-models'

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

    getAll(filterOptions: {
        search: string
        size: number
        orderBy: any
        page: number
    }): Observable<ApiResponse<Appointment[]>> {
        let params = new HttpParams({})

        if (params) {
            if (filterOptions.search) {
                params = params.set('search', filterOptions.search)
            }
            if (filterOptions.page !== undefined) {
                params = params.set('page', filterOptions.page)
            }
            if (filterOptions.size !== undefined) {
                params = params.set('size', filterOptions.size)
            }
            if (filterOptions.orderBy !== undefined) {
                params = params.set('orderBy', filterOptions.orderBy)
            }
        }
        return this.http.get<ApiResponse<Appointment[]>>(
            `${this.apiUrl}/appointments`,
            { params },
        )
    }

    getAppointment(id: string): Observable<ApiResponse<Appointment>> {
        return this.http.get<ApiResponse<Appointment>>(
            `${this.apiUrl}/appointments/${id}`,
        )
    }

    createAppointment(data: Appointment): Observable<ApiResponse<Appointment>> {
        return this.http.post<ApiResponse<Appointment>>(
            `${this.apiUrl}/appointments`,
            data,
        )
    }

    updateAppointment(
        id: string,
        data: Partial<Appointment>,
    ): Observable<ApiResponse<Appointment>> {
        return this.http.put<ApiResponse<Appointment>>(
            `${this.apiUrl}/appointments/${id}`,
            data,
        )
    }

    deleteAppointment(id: string): Observable<ApiResponse<Appointment>> {
        return this.http.delete<ApiResponse<Appointment>>(
            `${this.apiUrl}/appointments/${id}`,
        )
    }
}
