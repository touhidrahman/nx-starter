import { Params } from '@angular/router'
import { ApiResponse } from '@myorg/common-models'
import { Observable } from 'rxjs'

export abstract class AbstractApiService<T> {
    abstract findById(id: string): Observable<ApiResponse<T>>
    abstract find(params: Params): Observable<ApiResponse<T[]>>
    abstract search(term: string): Observable<ApiResponse<T[]>>
    abstract count(params: Params): Observable<number>
    abstract create(dto: Partial<T>): Observable<ApiResponse<T>>
    abstract createMany(dto: Partial<T>[]): Observable<ApiResponse<T[]>>
    abstract update(id: string, body: Partial<T>): Observable<ApiResponse<T>>
    abstract delete(id: string): Observable<ApiResponse<unknown>>
    abstract deleteMany(ids: string[]): Observable<ApiResponse<unknown>>
}
