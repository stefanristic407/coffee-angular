import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiResponse } from '@models';
import { AuthService } from '../auth';
import { MfaMethod } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class MfaService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
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

    // API for verify the Backup Codes
    verifyCode(method: MfaMethod, body: object): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `users/mfa/verify/${method}`, 'POST', body);
    }
}
