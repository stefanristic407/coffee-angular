import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MfaMethod } from '@enums';
import { ApiResponse } from '@models';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class MfaService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // API returns MFA status of a user
    getMfaStatus(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/status`);
    }

    // API for Generate Backup Codes
    createBackupCodes(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/backup-codes`, 'POST');
    }

    // API for get Backup Codes
    getBackupCodes(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/backup-codes`);
    }

    // API for Enable MFA Auth App
    enableAuthApp(body: object): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/auth-app`, 'POST', body);
    }

    // API for disable MFA Auth App
    disableAuthApp(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/disable-auth-app`, 'PUT');
    }

    // API for verify the Backup Codes
    verifyCode(method: MfaMethod, body: object): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/verify/${method}`, 'POST', body);
    }

    // API for disable MFA Auth App
    disableSms(): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/disable-sms`, 'PUT');
    }

    // API for confirm user phone
    confirmPhone(body: object): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/confirm-phone`, 'POST', body);
    }

    // API for verify user phone
    verifyPhone(body: object): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/verify-phone`, 'POST', body);
    }
}
