import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Case, Lawyer, LawyerDto } from '@myorg/app-example-models'
import { ApiResponse, OrderBy } from '@myorg/common-models'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class LawyerApiService {
    http = inject(HttpClient)
    apiUrl = this.env.apiUrl

    constructor(
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) { }

    getAllLawyers(filterOptions: {
        search: string
        size: number
        orderBy: OrderBy
        page: number
    }): Observable<ApiResponse<Lawyer[]>> {
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
        return this.http.get<ApiResponse<Lawyer[]>>(`${this.apiUrl}/lawyers`, {
            params,
        })
    }

    getLawyer(id: string): Observable<ApiResponse<Lawyer>> {
        return this.http.get<ApiResponse<Lawyer>>(`${this.apiUrl}/lawyer/${id}`)
    }

    createCase(data: LawyerDto): Observable<ApiResponse<Lawyer>> {
        return this.http.post<ApiResponse<Lawyer>>(`${this.apiUrl}/lawyer`, data)
    }

}
