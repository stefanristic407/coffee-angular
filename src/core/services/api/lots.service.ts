import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvailabilityRequest, LotDetails } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LotsService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getLotDetails(estateId: number, lotId: number): Observable<LotDetails> {
        return this.postWithOrg(this.orgPostUrl, `estates/${estateId}/lots/${lotId}`).pipe(
            map((response) => {
                if (response.success) {
                    return response.result;
                }

                return null;
            }),
        );
    }
}
