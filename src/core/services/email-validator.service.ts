import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ValidateEmailService {
    constructor(private http: HttpClient) {}

    validate(email) {
        const url = `https://api.email-validator.net/api/verify?EmailAddress=&APIKey=${environment.EMAIL_API_KEY}`;
        return this.http.get(url);
    }
}
