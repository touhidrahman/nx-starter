import { HttpClient } from '@angular/common/http'
import { Params } from '@angular/router'
import { Observable } from 'rxjs'
import { AbstractApiService } from './abstract-api.service'

export class ApiService<T, DtoT> implements AbstractApiService<T> {
    protected apiUrl: string

    constructor(protected http: HttpClient, apiUrl: string) {
        this.apiUrl = apiUrl
    }

    findById(id: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`)
    }

    find(params: Params = {}): Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl, { params })
    }

    search(term: string): Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl, { params: { search: term } })
    }

    count(params: Params = {}): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/count`, { params })
    }

    create(dto: DtoT | Partial<T>): Observable<T> {
        return this.http.post<T>(this.apiUrl, dto)
    }

    createMany(dto: DtoT[] | Partial<T>[]): Observable<T[]> {
        return this.http.post<T[]>(this.apiUrl, dto)
    }

    update(id: string, body: DtoT | Partial<T>): Observable<T> {
        return this.http.patch<T>(`${this.apiUrl}/${id}`, {
            ...body,
            id: undefined,
        })
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
