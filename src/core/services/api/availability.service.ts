import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BulkDetails } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { toCamelCase } from '@utils';

@Injectable({
    providedIn: 'root',
})
export class AvailabilityService extends ApiService {
    private readonly endpoint = 'availability/gc';

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    // Available Green Coffee
    getAvailableGces(query: any = null) {
        const params = this.serializeParams(query);
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}?${params}`, 'GET');
    }

    getAvailabilityList(): Observable<any[]> {
        return this.postWithOrg(this.orgPostUrl, this.endpoint).pipe(
            map((response) => {
                if (response.success && response.result) {
                    return response.result;
                }

                return [];
            }),
        );
    }

    getAvailabilityDetails(harvestId: number): Observable<BulkDetails> {
        return this.post(this.orgPostUrl, `general/${this.endpoint}/${harvestId}`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    const details: BulkDetails = {
                        ...response.result,
                        flavours: response.result.flavours ? response.result.flavours.map((x) => x.name) : '',
                        water_activity: response.result.dry_milling.water_activity,
                    };

                    return details;
                }

                return null;
            }),
        );
    }
}
