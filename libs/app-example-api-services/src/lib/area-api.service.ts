import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Area } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'

import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AreaApiService {
    private baseUrl = 'http://localhost:3000/v1/application-areas'
    private http = inject(HttpClient)

    createApplicationArea(data: Area): Observable<ApiResponse<Area[]>> {
        return this.http.post<ApiResponse<Area[]>>(`${this.baseUrl}`, data)
    }
}
