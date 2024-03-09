import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Params } from '@angular/router'
import {
    APP_EXAMPLE_ENVIRONMENT,
    AppExampleEnvironment,
} from '@myorg/app-example-core'
import { Content, ContentDto, UserRole } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { ApiService } from '@myorg/common-services'
import { shake } from 'radash'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ContentApiService extends ApiService<Content, ContentDto> {
    constructor(
        protected override http: HttpClient,
        @Inject(APP_EXAMPLE_ENVIRONMENT)
        private env: AppExampleEnvironment,
    ) {
        super(http, `${env.apiUrl}/v1/contents`)
    }

    findByUser(userId: string) {
        return this.http.get<ApiResponse<Content[]>>(
            `${this.apiUrl}/by-user/${userId}`,
        )
    }

    assignUser(
        contentId: string,
        userId: string,
        toRole: UserRole,
    ): Observable<ApiResponse<Content>> {
        return this.http.post<ApiResponse<Content>>(
            `${this.apiUrl}/${contentId}/assign-user/${userId}/${toRole}`,
            {},
        )
    }

    findByOrganizationId(organizationId: string, params: Params = {}): Observable<ApiResponse<Content[]>> {
        return this.find(shake({ ...params, organizationId }))
    }

    getContentsByStatusOverview(): Observable<ApiResponse<Partial<Content>[]>> {
        return this.http.get<ApiResponse<Partial<Content>[]>>(
            `${this.apiUrl}/overview/by-status`,
        )
    }

    changeStatus(
        contentId: string,
        status: boolean,
    ): Observable<ApiResponse<{ id: string; status: boolean }>> {
        return this.http.post<ApiResponse<{ id: string; status: boolean }>>(
            `${this.apiUrl}/${contentId}/change-status`,
            { status },
        )
    }

    swapIndex(
        gainerContentId: string,
        loserContentId: string,
    ): Observable<ApiResponse<boolean>> {
        return this.http.post<ApiResponse<boolean>>(
            `${this.apiUrl}/swap-index`,
            {
                ids: [gainerContentId, loserContentId],
            },
        )
    }

    downloadContent(siteId: string) {
        return this.http.get<ApiResponse<any>>(
            `${this.apiUrl}/download-contents/${siteId}`,
        )
    }
}
