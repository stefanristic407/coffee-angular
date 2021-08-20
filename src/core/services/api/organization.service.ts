import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OrganizationType } from '@enums';
import { AuthService } from '../auth';
import { ApiResponse, OrganizationDetails } from '@models';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // Return the organization details
    getProfile(orgId: number, orgType: OrganizationType): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${this.getOrgEndpoint(orgType)}/${orgId}`, 'GET');
    }
}
