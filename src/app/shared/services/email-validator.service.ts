import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ValidateEmailService {
    constructor(private http: HttpClient) {}

    validate(email) {
        const url = `https://api.email-validator.net/api/verify?EmailAddress=${email}&APIKey=${environment.EMAIL_API_KEY}`;
        return this.http.get(url);
    }
}

export class ValidateEmail {
    static createValidator(validateService: ValidateEmailService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return new Observable<any>((observer) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(control.value)) {
                    observer.next({ email: 'invalid' });
                    observer.complete();
                } else {
                    validateService.validate(control.value).subscribe((res: any) => {
                        if (res.status !== 200 && res.status !== 207) {
                            observer.next({ email: 'invalid' });
                        } else {
                            observer.next(null);
                        }
                        observer.complete();
                    });
                }
            }).pipe(
                map((res) => res)
            );
        };
    }
}
