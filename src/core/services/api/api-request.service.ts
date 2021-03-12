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
        const params = this.serializeParams(roasterData);
        return this.postWithOrg(this.apiUrl, `api-keys?page=${params}`, 'GET');
    }
    // Enable the API key by RO
    enableRoApiKey(roasterData: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `api-keys/${roasterData.api_key_id}/enable`, 'PUT');
    }
    // Notify customer about the API key by RO
    disableRoApiKey(roasterData: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `api-keys/${roasterData.api_key_id}/disable`, 'PUT');
    }
    // Delete the API key by RO
    deleteRoApiKey(roasterData: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `api-keys/${roasterData.api_key_id}`, 'DELETE');
    }
    // Notify customer about the API key by RO
    notifyRoCustomer(roasterData: any): Observable<any> {
        return this.postWithOrg(this.orgPostUrl, `api-keys/${roasterData.api_key_id}/notify`, 'POST');
    }

    // get list of api keys request for RO
    getApiKeysForRo(roasterData: any): Observable<any> {
        const params = this.serializeParams(roasterData);
        return this.postWithOrg(this.apiUrl, `api-keys/requests?page=${params}`, 'GET');
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
            method: 'POST',
        };
        return this.http.post(this.apiUrl, data);
    }
}
