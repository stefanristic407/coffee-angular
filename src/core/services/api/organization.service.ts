import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationType } from '@enums';
import { EstateOrganizationProfile, OrganizationDetails, OrganizationProfile } from '@models';
import { toCamelCase } from '@utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // Return the organization details
    getProfile(
        orgId: number,
        orgType: OrganizationType,
    ): Observable<OrganizationDetails | OrganizationProfile | EstateOrganizationProfile> {
        return this.postWithOrg(this.orgPostUrl, `${this.getOrgEndpoint(orgType)}/${orgId}`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    return toCamelCase<OrganizationDetails>(response.result);
                }
                return null;
            }),
        );
    }
}
