import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CODEMESSAGE } from '@constants';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        private authService: AuthService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const router = this.injector.get(Router);
        return next.handle(request).pipe(
            retry(1),
            mergeMap((event: any) => {
                if (event instanceof HttpResponse) {
                    const { body } = event;
                    switch (event.body.response_code) {
                        case 401: {
                            this.showErrorMessage(body.messages);
                            this.authService.goToLogin();
                            break;
                        }
                        case 403: {
                            this.showCodeMessage(body.response_code);
                            router.navigate(['/']);
                            break;
                        }
                        case 409: {
                            this.showErrorMessage(body.messages);
                            break;
                        }
                        case 422: {
                            this.showErrorMessage(body.messages);
                            break;
                        }
                    }
                }
                return of(event);
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent || error.message === 'URL_NOT_FOUND') {
                    router.navigate(['/error/internal-server-error']);
                } else if (error.url && error.url.startsWith(environment.agroUrl)) {
                    console.log('Agro service error');
                } else {
                    router.navigate(['/error/network-connection-error']);
                }
                return throwError(error);
            }),
        );
    }

    showCodeMessage(code) {
        this.toastrService.error(this.translateService.instant(CODEMESSAGE[code]));
    }

    showErrorMessage(messages) {
        const errorTexts: string[] = [];
        Object.keys(messages).forEach((key) => {
            // Check custom validation message
            const customKey = `vm_${key}_${messages[key][0]}`;
            const customMessage = this.translateService.instant(customKey);
            if (customKey !== customMessage) {
                errorTexts.push(`${customMessage}.`);
            } else {
                const errors = messages[key].map((value) => this.translateService.instant(`ve_${value}`)).join(' and ');
                errorTexts.push(`${this.translateService.instant(key)} ${errors}.`);
            }
        });
        this.toastrService.error(errorTexts.join('\n'));
    }
}
