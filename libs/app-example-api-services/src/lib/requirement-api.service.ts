import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@my-nx-starter/app-example-core'
import { ApiResponse } from '@my-nx-starter/common-models'
import { Observable, of } from 'rxjs'
import { Requirement } from '@my-nx-starter/app-example-models'

@Injectable({
    providedIn: 'root',
})
export class RequirementApiService {
    constructor(
        private http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {}

    find(): Observable<ApiResponse<Requirement[]>> {
        return of({
            data: [
                {
                    id: '1',
                    date: new Date(),
                    description: 'Description 1',
                    equipment: 'Equipment 1',
                    market: 'Market 1',
                    product: 'Product 1',
                    revision: 'Revision 1',
                    title: 'Title 1',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '2',
                    date: new Date(),
                    description: 'Description 2',
                    equipment: 'Equipment 2',
                    market: 'Market 2',
                    product: 'Product 2',
                    revision: 'Revision 2',
                    title: 'Title 2',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '3',
                    date: new Date(),
                    description: 'Description 3',
                    equipment: 'Equipment 3',
                    market: 'Market 3',
                    product: 'Product 3',
                    revision: 'Revision 3',
                    title: 'Title 3',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '4',
                    date: new Date(),
                    description: 'Description 4',
                    equipment: 'Equipment 4',
                    market: 'Market 4',
                    product: 'Product 4',
                    revision: 'Revision 4',
                    title: 'Title 4',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '5',
                    date: new Date(),
                    description: 'Description 5',
                    equipment: 'Equipment 5',
                    market: 'Market 5',
                    product: 'Product 5',
                    revision: 'Revision 5',
                    title: 'Title 5',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '6',
                    date: new Date(),
                    description: 'Description 6',
                    equipment: 'Equipment 6',
                    market: 'Market 6',
                    product: 'Product 6',
                    revision: 'Revision 6',
                    title: 'Title 6',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '7',
                    date: new Date(),
                    description: 'Description 7',
                    equipment: 'Equipment 7',
                    market: 'Market 7',
                    product: 'Product 7',
                    revision: 'Revision 7',
                    title: 'Title 7',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '8',
                    date: new Date(),
                    description: 'Description 8',
                    equipment: 'Equipment 8',
                    market: 'Market 8',
                    product: 'Product 8',
                    revision: 'Revision 8',
                    title: 'Title 8',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '9',
                    date: new Date(),
                    description: 'Description 9',
                    equipment: 'Equipment 9',
                    market: 'Market 9',
                    product: 'Product 9',
                    revision: 'Revision 9',
                    title: 'Title 9',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: '10',
                    date: new Date(),
                    description: 'Description 10',
                    equipment: 'Equipment 10',
                    market: 'Market 10',
                    product: 'Product 10',
                    revision: 'Revision 10',
                    title: 'Title 10',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            message: 'Success',
            status: 'success',
            code: 200,
        })

        // return this.http.get<ApiResponse<Requirement[]>>(
        //     `${this.env.apiUrl}/requirements`,
        // )
    }
}
