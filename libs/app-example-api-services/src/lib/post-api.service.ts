import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Post } from '@myorg/app-example-models'
import { Observable, lastValueFrom, map } from 'rxjs'

export interface LoadResponse {
    content: Post[]
    total: number
    page: number
}

@Injectable({ providedIn: 'root' })
export class PostApiService {
    private baseUrl = 'https://jsonplaceholder.typicode.com/posts'
    private http = inject(HttpClient)

    load(page: number, limit = 10): Observable<LoadResponse> {
        const params = new HttpParams()
            .set('_page', page.toString())
            .set('_limit', limit.toString())

        return this.http
            .get<Post[]>(this.baseUrl, { params, observe: 'response' })
            .pipe(
                map((response) => ({
                    content: response.body || [],
                    total: Number(response.headers.get('x-total-count')),
                    page,
                })),
            )
    }

    // idea: The loadAsPromise function is a convenience method that returns a Promise that resolves to the load function's response. This can be useful when you need to perform asynchronous operations before loading the data.

    loadAsPromise(page: number, limit = 10) {
        return lastValueFrom(this.load(page, limit))
    }
}
