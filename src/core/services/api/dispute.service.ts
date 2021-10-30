import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from '../auth';
import { OrganizationType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class DisputeService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ Disputes ------------

    // Return the list of disputes
    getDisputes(orgType: OrganizationType, query?: object) {
        return this.postWithOrg(
            this.orgPostUrl,
            `${this.getDisputeEndpoint(orgType)}disputes?${this.serializeParams(query)}`,
        );
    }

    // Return the list of disputes
    getOrderDisputes(orgType: OrganizationType, orderId: number, query?: object) {
        return this.postWithOrg(
            this.orgPostUrl,
            `${this.getOrderEndpoint(orgType)}/${orderId}/disputes?${this.serializeParams(query)}`,
        );
    }

    private getDisputeEndpoint(orgType: OrganizationType): string {
        return orgType === OrganizationType.MICRO_ROASTER ? `micro_roasters/` : '';
    }

    private getOrderEndpoint(orgType: OrganizationType): string {
        return orgType === OrganizationType.MICRO_ROASTER ? `mr-orders` : 'orders';
    }
}
