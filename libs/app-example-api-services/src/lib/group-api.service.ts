import { HttpClient } from '@angular/common/http'
import { Inject, Injectable, inject } from '@angular/core'
import { Params } from '@angular/router'
import { APP_EXAMPLE_ENVIRONMENT, AppExampleEnvironment } from '@myorg/app-example-core'
import { GroupDto } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class GroupApiService {
    private http = inject(HttpClient)
    private baseUrl = `${this.env.apiUrl}/v1/groups`

    constructor(
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
    }

    getAllGroups(params: Params = {}): Observable<ApiResponse<GroupDto[]>> {
        return this.http.get<ApiResponse<GroupDto[]>>(`${this.baseUrl}`, params)
    }

    createGroup(data: any): Observable<ApiResponse<GroupDto[]>> {
        return this.http.post<ApiResponse<GroupDto[]>>(`${this.baseUrl}`, data)
    }

    updateGroup(id: number, data: GroupDto): Observable<ApiResponse<GroupDto>> {
        return this.http.put<ApiResponse<GroupDto>>(
            `${this.baseUrl}/${id}`,
            data,
        )
    }

    deleteGroup(id: number): Observable<ApiResponse<GroupDto>> {
        return this.http.delete<ApiResponse<GroupDto>>(`${this.baseUrl}/${id}`)
    }

    getAGroup(id: number): Observable<ApiResponse<GroupDto>> {
        return this.http.get<ApiResponse<GroupDto>>(`${this.baseUrl}/${id}`)
    }
}
