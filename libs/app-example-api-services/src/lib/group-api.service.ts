import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Params } from '@angular/router'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class GroupApiService {
    private baseUrl = 'http://localhost:3000/v1/groups'
    private http = inject(HttpClient)

    getAllGroups(params: Params = {}): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}`, {
            params,
        })
    }

    createGroup(data: any): Observable<ApiResponse<any[]>> {
        return this.http.post<ApiResponse<any[]>>(`${this.baseUrl}`, {
            data,
        })
    }

    updateGroup(id: number, data: any): Observable<ApiResponse<any>> {
        return this.http.put<ApiResponse<any>>(`${this.baseUrl}/${id}`, {
            data,
        })
    }

    deleteGroup(id: number): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`)
    }

    getAGroup(id: number): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.baseUrl}/${id}`)
    }
}
