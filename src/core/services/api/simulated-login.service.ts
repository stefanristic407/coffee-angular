import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class SimulatedLoginService extends ApiService {
    constructor(protected http: HttpClient, protected cookieService: CookieService) {
        super(cookieService, http);
    }

    // Login as Support User of different entities
    simulatedLogin(userId) {
        const data: any = {
            api_call: `/${this.orgType}/${this.getOrgId()}/support-login/${userId}`,
            method: 'POST',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.simulatedLoginUrl, data, { withCredentials: true });
    }

    private getOrgEndpoint(orgType: OrganizationType): string {
        switch (orgType) {
            case OrganizationType.HORECA: {
                return 'hrc';
            }
            case OrganizationType.MICRO_ROASTER: {
                return 'micro-roasters';
            }
        }
    }

    // Simulated login - RO user
    customerSimulatedLogin(orgType: OrganizationType, orgId: number) {
        const data: any = {
            api_call: `/${this.orgType}/${this.getOrgId()}/${this.getOrgEndpoint(orgType)}/${orgId}/support-login`,
            method: 'POST',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.simulatedLoginUrl, data, { withCredentials: true });
    }
}
