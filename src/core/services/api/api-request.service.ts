import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class ApiRequestService extends ApiService {
    private apiUrl = environment.apiURL + '/ro/api';

    constructor(protected cookieService: CookieService, protected http: HttpClient) {
        super(cookieService, http);
    }

    // List of API keys for RO
    getGeneratedRoKeys(roasterData: any): Observable<any> {
        const apiCall = `/ro/${roasterData.roaster_id}/api-keys?page=${roasterData.page}&per_page=${roasterData.per_page}&org_type=${roasterData.org_type}`;
        const data = {
            api_call: apiCall,
            methos: 'GET',
            token: this.cookieService.get('Auth'),
        };
        if (roasterData.query) {
            data.api_call = `${apiCall}&query=${roasterData.query}`;
        }
        if (roasterData.date_from && roasterData.date_to) {
            data.api_call = `${apiCall}&date_from=${roasterData.date_from}&date_to=${roasterData.date_to}`;
        }
        if (roasterData.date_from && roasterData.date_to && roasterData.query) {
            data.api_call = `${apiCall}&date_from=${roasterData.date_from}&date_to=${roasterData.date_to}&query=${roasterData.query}`;
        }
        if (roasterData.sort_by && roasterData.sort_order) {
            data.api_call = `${apiCall}&sort_by=${roasterData.sort_by}&sort_order=${roasterData.sort_order}`;
        }
        if (roasterData.sort_by && roasterData.sort_order && roasterData.query) {
            data.api_call = `${apiCall}&sort_by=${roasterData.sort_by}&query=${roasterData.query}&sort_order=${roasterData.sort_order}`;
        }
        if (
            roasterData.date_from &&
            roasterData.date_to &&
            roasterData.query &&
            roasterData.sort_by &&
            roasterData.sort_order
        ) {
            data.api_call = `${apiCall}&date_from=${roasterData.date_from}&date_to=${roasterData.date_to}&query=${roasterData.query}&sort_by==${roasterData.sort_by}&sort_order=${roasterData.sort_order}`;
        }
        return this.http.post(this.apiUrl, data);
    }
    // Enable the API key by RO
    enableRoApiKey(roasterData: any): Observable<any> {
        return this.postWithOrg(this.url, `api-keys/${roasterData.api_key_id}/enable`, 'PUT');
    }
    // Notify customer about the API key by RO
    disableRoApiKey(roasterData: any): Observable<any> {
        return this.postWithOrg(this.url, `api-keys/${roasterData.api_key_id}/disable`, 'PUT');
    }
    // Delete the API key by RO
    deleteRoApiKey(roasterData: any): Observable<any> {
        return this.postWithOrg(this.url, `api-keys/${roasterData.api_key_id}`, 'DELETE');
    }
    // Notify customer about the API key by RO
    notifyRoCustomer(roasterData: any): Observable<any> {
        return this.postWithOrg(this.url, `api-keys/${roasterData.api_key_id}/notify`, 'POST');
    }

    // get list of api keys request for RO
    getApiKeysForRo(roasterData: any): Observable<any> {
        const apiCall = `/ro/${roasterData.roaster_id}/api-keys/requests?page=${roasterData.page}&per_page=${roasterData.per_page}&org_type=${roasterData.org_type}&status=${roasterData.status}`;
        const data = {
            api_call: apiCall,
            methos: 'GET',
            token: this.cookieService.get('Auth'),
        };
        console.log('data-->>', data);
        if (roasterData.query) {
            data.api_call = `${apiCall}&query=${roasterData.query}`;
        }
        if (roasterData.date_from && roasterData.date_to) {
            data.api_call = `${apiCall}&date_from=${roasterData.date_from}&date_to=${roasterData.date_to}`;
        }
        if (roasterData.date_from && roasterData.date_to && roasterData.query) {
            data.api_call = `${apiCall}&date_from=${roasterData.date_from}&date_to=${roasterData.date_to}&query=${roasterData.query}`;
        }
        if (roasterData.sort_by && roasterData.sort_order) {
            data.api_call = `${apiCall}&sort_by=${roasterData.sort_by}&sort_order=${roasterData.sort_order}`;
        }
        if (roasterData.sort_by && roasterData.sort_order && roasterData.query) {
            data.api_call = `${apiCall}&sort_by=${roasterData.sort_by}&query=${roasterData.query}&sort_order=${roasterData.sort_order}`;
        }
        if (
            roasterData.date_from &&
            roasterData.date_to &&
            roasterData.query &&
            roasterData.sort_by &&
            roasterData.sort_order
        ) {
            data.api_call = `${apiCall}&date_from=${roasterData.date_from}&date_to=${roasterData.date_to}&query=${roasterData.query}&sort_by==${roasterData.sort_by}&sort_order=${roasterData.sort_order}`;
        }
        return this.http.post(this.apiUrl, data);
    }

    // View API keys request details for RO
    getApiKeysRequestRo(roasterData: any): Observable<any> {
        const data = {
            api_call: `/ro/${roasterData.roaster_id}/api-keys/requests/${roasterData.request_id}`,
            token: this.cookieService.get('Auth'),
            method: 'GET',
        };
        return this.http.post(this.apiUrl, data);
    }

    // Generate API key for the request by RO
    generateRoApiKey(roasterData: any): Observable<any> {
        const data = {
            api_call: `/ro/${roasterData.roaster_id}/api-keys/requests/${roasterData.request_id}/generate`,
            token: this.cookieService.get('Auth'),
            method: 'post',
        };
        return this.http.post(this.apiUrl, data);
    }
}
