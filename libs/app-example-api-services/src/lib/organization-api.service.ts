import { inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ApiResponse } from '@myorg/common-models'
import { Organization } from '@myorg/app-example-models'
import { environment } from '../../../../apps/example-tailwind/src/environment/environment'

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
                params = params.set('status', filterOptions.status)
            }
            if (filterOptions.type !== undefined) {
                params = params.set('type', filterOptions.type)
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
            `${this.apiUrl}/groups/${id}`,
        )
    }

    create(data: Organization): Observable<ApiResponse<Organization>> {
        return this.http.post<ApiResponse<Organization>>(
            `${this.apiUrl}/groups`,
            data,
        )
    }

    update(
        id: string,
        data: Organization,
    ): Observable<ApiResponse<Organization>> {
        return this.http.put<ApiResponse<Organization>>(
            `${this.apiUrl}/groups/${id}`,
            data,
        )
    }

    delete(id: string): Observable<ApiResponse<Organization>> {
        return this.http.delete<ApiResponse<Organization>>(
            `${this.apiUrl}/groups/${id}`,
        )
    }

    addUserToOrganization(id: string, email: string) {
        return this.http.post(`${this.apiUrl}/groups/${id}/add-user`, { email })
    }

    updateUserRoleInOrganization(id: string, userId: string, role: string) {
        return this.http.post(`${this.apiUrl}/groups/${id}/update-user-role`, {
            userId,
            role,
        })
    }

    removeUserFromOrganization(id: string, userId: string) {
        return this.http.delete(
            `${this.apiUrl}/groups/${id}/remove-user/${userId}`,
        )
    }

    leaveGroup(id: string) {
        return this.http.delete(`${this.apiUrl}/groups/${id}/leave`)
    }
}
