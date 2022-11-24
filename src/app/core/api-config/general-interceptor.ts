import { Router } from '@angular/router';
/* eslint-disable arrow-parens */
import { TokenService } from './auth-service/token.service';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthApiService, ITokenApi } from './auth-service/auth-api.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'environments/environment';
import {
    BehaviorSubject,
    catchError,
    EMPTY,
    filter,
    Observable,
    switchMap,
    take,
    throwError,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeneralInterceptor implements HttpInterceptor {
    authApi: any;
    isRefreshing: boolean;
    isRefreshingLogin: boolean;

    constructor(
        injector: Injector,
        private tokenService: TokenService,
        private _router: Router
    ) {
        setTimeout(() => {
            this.authApi = injector.get(AuthApiService);
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            req.url === environment.URL_API_TOKEN_ACCESS ||
            req.url.includes('assets')
        ) {
            return next.handle(req);
        }

        let authReq = req;
        const token = this.tokenService.getToken();
        if (token !== null) {
            authReq = this.addTokenHeader(req, token);
        }

        return next.handle(authReq).pipe(
            catchError((error, caught) => {
                if (
                    error instanceof HttpErrorResponse &&
                    !this._router.url.includes('/code-validation') &&
                    error.status === 403
                ) {
                    this.tokenService.signOut();
                    window.location.reload();
                }
                return throwError(error);
            })
        ) as any;
    }

    addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
