import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class EmailService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(http, cookieSrv);
    }

    sendEmail(body: any): Observable<any> {
        return this.http.post(this.sendEmailUrl, body);
    }
}
