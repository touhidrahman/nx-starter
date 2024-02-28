import {
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenStorageService } from '../services/token-storage.service'

/**
 * Adds the Bearer token to outgoing requests
 */
export const AuthHeaderInterceptorFn: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
) => {
    const accessToken = inject(TokenStorageService).getAccessToken()
    let changedRequest = request

    if (accessToken) {
        changedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    }

    return next(changedRequest)
}
