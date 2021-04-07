import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private route: ActivatedRoute, private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const router = this.injector.get(Router);
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                switch (error.status) {
                    case 200: {
                        break;
                    }
                    case 401: {
                        const navigationExtras: NavigationExtras = {
                            queryParams: {
                                returnUrl: this.router.url,
                            },
                        };
                        this.router.navigate(
                            ['/auth/login'],
                            this.route.snapshot.queryParams.returnUrl ? {} : navigationExtras,
                        );
                        break;
                    }
                    case 422: {
                        break;
                    }
                    default: {
                        if (error.error instanceof ErrorEvent || error.message === 'URL_NOT_FOUND') {
                            router.navigate(['/error/internal-server-error']);
                            errorMessage = `Error: ${error.error.message}`;
                        } else if (error.url.startsWith(environment.agroUrl)) {
                            console.log('Agro service error');
                        } else {
                            router.navigate(['/error/network-connection-error']);
                            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                        }
                    }
                }

                return throwError(errorMessage);
            }),
        );
    }
}
