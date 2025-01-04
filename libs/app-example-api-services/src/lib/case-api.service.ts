import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Inject, Injectable } from '@angular/core'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Case } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CaseApiService {
    http = inject(HttpClient)
    apiUrl = this.env.apiUrl

    constructor(
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {}

    getAllCases(filterOptions: {
        search: string
        size: number
        orderBy: any
        page: number
    }): Observable<ApiResponse<Case[]>> {
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
        return this.http.get<ApiResponse<Case[]>>(`${this.apiUrl}/cases`, {
            params,
        })
    }

    getCase(id: string): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/case/${id}`)
    }

    createCase(data: Case): Observable<ApiResponse<Case>> {
        return this.http.post<ApiResponse<Case>>(`${this.apiUrl}/cases`, data)
    }

    updateCase(id: string, data: Case): Observable<ApiResponse<Case>> {
        return this.http.put<ApiResponse<Case>>(
            `${this.apiUrl}/cases/${id}`,
            data,
        )
    }

    deleteCase(id: string): Observable<ApiResponse<Case>> {
        return this.http.delete<ApiResponse<Case>>(`${this.apiUrl}/cases/${id}`)
    }
}
