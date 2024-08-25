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
            headers: new HttpHeaders().set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImExQGIuY29tIiwidHlwZSI6InVzZXIiLCJyb2xlSWQiOiIiLCJncm91cElkIjoiIiwiZ3JvdXBUeXBlIjoiIiwic3ViIjozLCJleHAiOjE3MjQ2MTEzODQ4NzF9.Xp3FUcJyyaHf_E0rxaaEdI1pUmQDAvTDPFkNfiH1MX4',
            ),
        })
    }

    createGroup(data: any): Observable<ApiResponse<any[]>> {
        return this.http.post<ApiResponse<any[]>>(`${this.baseUrl}`, {
            data,
            headers: new HttpHeaders().set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImExQGIuY29tIiwidHlwZSI6InVzZXIiLCJyb2xlSWQiOiIiLCJncm91cElkIjoiIiwiZ3JvdXBUeXBlIjoiIiwic3ViIjozLCJleHAiOjE3MjQ2MTEzODQ4NzF9.Xp3FUcJyyaHf_E0rxaaEdI1pUmQDAvTDPFkNfiH1MX4',
            ),
        })
    }
}
