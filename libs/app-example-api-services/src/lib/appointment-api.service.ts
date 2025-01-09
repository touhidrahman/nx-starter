import { Inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Observable } from 'rxjs'
import { ApiResponse } from '@myorg/common-models'
import { Appointment, AppointmentDto } from '@myorg/app-example-models'
import { ApiService } from '@myorg/common-services'

@Injectable({
    providedIn: 'root',
})
export class AppointmentApiService extends ApiService<
    Appointment,
    AppointmentDto
> {
    constructor(
        protected override http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(http, `${env.apiUrl}/appointments`)
    }

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
        return this.find(params)
    }

    getAppointment(id: string): Observable<ApiResponse<Appointment>> {
        return this.findById(id)
    }

    createAppointment(data: Appointment): Observable<ApiResponse<Appointment>> {
        return this.create(data)
    }

    updateAppointment(
        id: string,
        data: Partial<Appointment>,
    ): Observable<ApiResponse<Appointment>> {
        return this.update(id, data)
    }

    deleteAppointment(id: string): Observable<ApiResponse<unknown>> {
        return this.delete(id)
    }
}
