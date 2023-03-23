import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AppRequestInterceptor implements HttpInterceptor {
    constructor(private readonly router: Router,
        private readonly jwtService: JwtHelperService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.jwtService.tokenGetter()}`
            }
        });
        return next.handle(req).pipe(catchError((e: ErrorEvent | HttpErrorResponse) => {
            if (e instanceof HttpErrorResponse && e.status === 401 && (req.url.indexOf('/accounts/') === -1)) {
                this.router.navigate(['/account']);
                return EMPTY;
            } if (e instanceof HttpErrorResponse && e.status == 403) {
                this.router.navigate(['/account']);
                return EMPTY;
            }

            return throwError(e)
        }))
    }

}