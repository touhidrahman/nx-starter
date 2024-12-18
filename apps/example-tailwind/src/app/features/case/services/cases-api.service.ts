import { HttpClient } from '@angular/common/http'
import { inject, Inject, Injectable } from '@angular/core'
import { AUTH_API_URL, SignupInput } from '@myorg/common-auth'
import { environment } from '../../../../environment/environment'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'
import { Case } from '../models/case.model'

@Injectable({
    providedIn: 'root',
})
export class CasesApiService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAllCases(): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/cases`)
    }

    getCase(id: string): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/cases/${id}`)
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
