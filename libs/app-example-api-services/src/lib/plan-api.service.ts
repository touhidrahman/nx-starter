import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { APP_EXAMPLE_ENVIRONMENT, AppExampleEnvironment } from "@myorg/app-example-core";
import { Plan, PlanDto } from "@myorg/app-example-models";
import { ApiResponse, OrderBy } from "@myorg/common-models";
import { ApiService } from "@myorg/common-services";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PlanApiService extends ApiService<PlanDto, Plan> {
    constructor(
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(inject(HttpClient), `${env.apiUrl}/v1`)
    }
    getAllPlans(filterOptions: {
        search: string
        size: number
        page: number
        orderBy: OrderBy
    }): Observable<ApiResponse<Plan[]>> {
        let params = new HttpParams({})

        if (params) {
            if (filterOptions.search) {
                params = params.set('search', filterOptions.search)
            }
            if (filterOptions.page !== undefined) {
                params = params.set('page', filterOptions.page)
            }
            if (filterOptions.size !== undefined) {
                params = params.set('size', filterOptions.size)
            }
            if (filterOptions.orderBy !== undefined) {
                params = params.set('orderBy', filterOptions.orderBy)
            }
        }
        return this.http.get<ApiResponse<Plan[]>>(`${this.apiUrl}/Plans`, {
            params,
        })
    }

    getPlan(id: string): Observable<ApiResponse<Plan>> {
        return this.http.get<ApiResponse<Plan>>(`${this.apiUrl}/plan/${id}`)
    }

    createPlan(data: PlanDto): Observable<ApiResponse<Plan>> {
        return this.http.post<ApiResponse<Plan>>(`${this.apiUrl}/plan`,
            data,
        )
    }

    updatePlan(id: string, data: Plan): Observable<ApiResponse<Plan>> {
        return this.http.put<ApiResponse<Plan>>(
            `${this.apiUrl}/plans/${id}`,
            data,
        )
    }

    deletePlan(id: string): Observable<ApiResponse<string>> {
        return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/plans/${id}`)
    }


}