import { HttpClient } from '@angular/common/http'
import { inject, Inject, Injectable } from '@angular/core'
import { AUTH_API_URL } from '@myorg/common-auth'
import { environment } from '../../../../environment/environment'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CasesApiService {
    http = inject(HttpClient)
    apiUrl = environment.apiUrl

    getAllCases = (): Observable<ApiResponse<any[]>> => {
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/cases`)
    }
}
