import { Params } from '@angular/router'
import { Observable } from 'rxjs'

export abstract class AbstractApiService<T> {
    abstract findById(id: string): Observable<T>
    abstract find(params: Params): Observable<T[]>
    abstract search(term: string): Observable<T[]>
    abstract count(params: Params): Observable<number>
    abstract create(dto: Partial<T>): Observable<T>
    abstract createMany(dto: Partial<T>[]): Observable<T[]>
    abstract update(id: string, body: Partial<T>): Observable<T>
    abstract delete(id: string): Observable<void>
}
