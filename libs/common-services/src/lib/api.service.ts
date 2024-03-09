import { HttpClient } from '@angular/common/http'
import { Params } from '@angular/router'
import { Observable } from 'rxjs'
import { AbstractApiService } from './abstract-api.service'
import { ApiResponse } from '@my-nx-starter/common-models'

export class ApiService<T, DtoT> implements AbstractApiService<T> {
    protected apiUrl: string

    constructor(protected http: HttpClient, apiUrl: string) {
        this.apiUrl = apiUrl
    }

    count(params: Params = {}): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/count`, { params })
    }

    findById(id: string): Observable<ApiResponse<T>> {
        return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${id}`)
    }

    find(params: Params = {}): Observable<ApiResponse<T[]>> {
        return this.http.get<ApiResponse<T[]>>(this.apiUrl, { params })
    }

    search(term: string): Observable<ApiResponse<T[]>> {
        return this.http.get<ApiResponse<T[]>>(this.apiUrl, {
            params: { search: term },
        })
    }

    create(dto: DtoT | Partial<T>): Observable<ApiResponse<T>> {
        return this.http.post<ApiResponse<T>>(this.apiUrl, dto)
    }

    update(id: string, body: DtoT | Partial<T>): Observable<ApiResponse<T>> {
        return this.http.patch<ApiResponse<T>>(`${this.apiUrl}/${id}`, body)
    }

    delete(id: string): Observable<ApiResponse<unknown>> {
        return this.http.delete<ApiResponse<unknown>>(`${this.apiUrl}/${id}`)
    }

    deleteMany(ids: string[]): Observable<ApiResponse<unknown>> {
        return this.http.delete<ApiResponse<unknown>>(`${this.apiUrl}`, {
            body: ids,
        })
    }

    createMany(dto: Partial<T>[]): Observable<ApiResponse<T[]>> {
        return this.http.post<ApiResponse<T[]>>(`${this.apiUrl}/many`, dto)
    }
}
