import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvailabilityRequest, ApiResponse } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { toCamelCase } from '@utils';

@Injectable({
    providedIn: 'root',
})
export class AvailabilityRequestService extends ApiService {
    private readonly endpoint = 'availability-requests';

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
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
}
