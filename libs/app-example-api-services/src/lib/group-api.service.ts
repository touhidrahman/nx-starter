import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Params } from '@angular/router'
import { GroupDto } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class GroupApiService {
    private baseUrl = 'http://localhost:3000/v1/groups'
    private http = inject(HttpClient)

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
