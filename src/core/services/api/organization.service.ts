import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OrganizationType } from '@enums';
import { AuthService } from '../auth';
import { EstateOrganizationProfile, OrganizationDetails, OrganizationProfile } from '@models';
import { map } from 'rxjs/operators';
import { toCamelCase } from '@utils';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // General endpoint to view the details of the organization
    getGeneralProfile(orgId: number, orgType: OrganizationType): Observable<OrganizationProfile> {
        return this.post(this.postUrl, `general/${orgType}/${orgId}/profile`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    return response.result;
                }
                return null;
            }),
        );
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
