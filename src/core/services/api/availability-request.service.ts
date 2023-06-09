import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvailabilityRequest, ApiResponse } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class AvailabilityRequestService extends ApiService {
    private readonly endpoint = 'availability-requests';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getRequestList(options?: any): Observable<ApiResponse<AvailabilityRequest[]>> {
        const serializedParams = this.serializeParams(options);

        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}?${serializedParams}`).pipe(
            map((response) => {
                if (response.success && response.result) {
                    return {
                        ...response,
                        result: response.result,
                    };
                }

                return null;
            }),
        );
    }

    getRequestDetails(id: number): Observable<AvailabilityRequest> {
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}/${id}`).pipe(
            map((response) => {
                if (response.success) {
                    return response.result;
                }

                return null;
            }),
        );
    }

    updateStatus(id: number, status: string, reason: any = null): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}/${id}/${status}`, 'PUT', reason);
    }
}
