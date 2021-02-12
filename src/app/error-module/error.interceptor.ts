import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ErrorIntercept implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const router = this.injector.get(Router);
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent || error.message == 'URL_NOT_FOUND') {
                    console.log('enterdd intoo.');
                    router.navigate(['/error/internal-server-error']);
                    errorMessage = `Error: ${error.error.message}`;
                } else if (error.url.startsWith(environment.agroUrl)) {
                    console.log('Agro service error');
                } else {
                    // server-side error
                    router.navigate(['/error/network-connection-error']);
                    errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                }
                return throwError(errorMessage);
            }),
        );
    }
}
