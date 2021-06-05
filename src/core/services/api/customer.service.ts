import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class CustomerService extends ApiService {
    loading = false;
    customers: any;
    users: any;

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getCustomerStats(): void {
        this.post(this.postUrl, '/sa/stats', 'GET').subscribe({
            next: (result) => {
                if (result && result.result) {
                    this.customers = result.result.customers;
                    this.users = result.result.users;
                } else {
                }

                this.loading = false;
            },
            error: () => {
                this.loading = false;
            },
        });
    }

    // Customer Details
    getCustomerDetails(type, id): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${type}/${id}`, 'GET');
    }

    // Top Contacts
    getTopContacts(organization, organizationId, group): Observable<ApiResponse<any>> {
        return this.post(this.postUrl, `general/${organization}/${organizationId}/users/${group}`, 'GET');
    }

    // certificates
    getCertificates(organization, organizationId): Observable<ApiResponse<any>> {
        return this.post(this.postUrl, `general/${organization}/${organizationId}/certificates`, 'GET');
    }

    getCustomers(orgType: string, options: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${orgType}?${this.serializeParams(options)}`, 'GET');
    }

    getEmployeeList(orgType: string, orgId: any, options?: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${orgType}/${orgId}/users?${this.serializeParams(options)}`, 'GET');
    }

    getRoasterCustomers(partnerType: string, roasterId: any, options?: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${partnerType}?${this.serializeParams(options)}`, 'GET');
    }

    getPartners(hrcId, options): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `hrc/${hrcId}/partners?${this.serializeParams(options)}`, 'GET');
    }

    enableAccount(orgType: any, enableId: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `${orgType}/${enableId}/enable`);
    }

    disableAccount(orgType: any, disableId: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `${orgType}/${disableId}/disable`);
    }
}
