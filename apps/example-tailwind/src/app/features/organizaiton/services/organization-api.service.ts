import { inject, Injectable } from '@angular/core'
import { environment } from '../../../../environment/environment'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ApiResponse } from '@myorg/common-models'
import { Organization } from '../models/organization'

@Injectable({
    providedIn: 'root',
})
export class OrganizationApiService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAll(filterOptions: {
        query?: string
        size?: number
        orderBy?: 'asc' | 'desc'
        page?: number
        status?: string
        type?: string
    }): Observable<ApiResponse<Organization[]>> {
        let params = new HttpParams({})

        if (params) {
            if (filterOptions.query) {
                params = params.set('search', filterOptions.query)
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
            if (filterOptions.status !== undefined) {
                params = params.set('orderBy', filterOptions.status)
            }
            if (filterOptions.type !== undefined) {
                params = params.set('orderBy', filterOptions.type)
            }
        }
        return this.http.get<ApiResponse<Organization[]>>(
            `${this.apiUrl}/groups`,
            {
                params,
            },
        )
    }

    get(id: string): Observable<ApiResponse<Organization>> {
        return this.http.get<ApiResponse<Organization>>(
            `${this.apiUrl}/group/${id}`,
        )
    }

    create(data: Organization): Observable<ApiResponse<Organization>> {
        return this.http.post<ApiResponse<Organization>>(
            `${this.apiUrl}/group`,
            data,
        )
    }

    update(
        id: string,
        data: Organization,
    ): Observable<ApiResponse<Organization>> {
        return this.http.put<ApiResponse<Organization>>(
            `${this.apiUrl}/group/${id}`,
            data,
        )
    }

    delete(id: string): Observable<ApiResponse<Organization>> {
        return this.http.delete<ApiResponse<Organization>>(
            `${this.apiUrl}/group/${id}`,
        )
    }
}
