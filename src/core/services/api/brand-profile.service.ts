import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationDetails } from '@models';
import { toCamelCase } from '@utils';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class BrandProfileService extends ApiService {
    private readonly endpoint = 'general/es';

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getEstateProfile(estateId: number): Observable<OrganizationDetails> {
        return this.post(this.orgPostUrl, `${this.endpoint}/${estateId}/profile/`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    return response.result;
                }

                return null;
            }),
        );
    }

    getProfile(orgType: OrganizationType, orgId: number): Observable<OrganizationDetails> {
        return this.post(this.postUrl, `general/${orgType}/${orgId}/profile`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    return response.result;
                }
                return null;
            }),
        );
    }
}
