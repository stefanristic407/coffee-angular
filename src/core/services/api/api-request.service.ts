import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiRequestService {
    private apiUrl = environment.apiURL + '/ro/api';

    constructor(private http: HttpClient, private cookieService: CookieService) {}

    // List of API keys for RO
    getGeneratedRoKeys(roasterData: any): Observable<any> {
        const data = {};
        (data['api_call'] = `/ro/${roasterData.roaster_id}/api-keys`), (data['method'] = 'GET');
        data['api_call'] =
            data['api_call'] +
            '?page=' +
            roasterData.page +
            '&per_page=' +
            roasterData.per_page +
            '&org_type=' +
            roasterData.org_type;
        if (roasterData.date_from && roasterData.date_to) {
            data['api_call'] =
                data['api_call'] + '&date_from=' + roasterData.date_from + '&date_to=' + roasterData.date_to;
        }
        if (roasterData.query) {
            data['api_call'] = data['api_call'] + '&query=' + roasterData.query;
        }
        if (roasterData.sort_by && roasterData.sort_order) {
            data['api_call'] =
                data['api_call'] + '&sort_by=' + roasterData.sort_by + '&sort_order=' + roasterData.sort_order;
        }
        if (roasterData.date_from && roasterData.date_to && roasterData.query) {
            data['api_call'] +
                '&date_from=' +
                roasterData.date_from +
                '&date_to=' +
                roasterData.date_to +
                '&query=' +
                roasterData.query;
        }
        if (
            roasterData.date_from &&
            roasterData.date_to &&
            roasterData.query &&
            roasterData.sort_by &&
            roasterData.sort_order
        ) {
            data['api_call'] +
                '&date_from=' +
                roasterData.date_from +
                '&date_to=' +
                roasterData.date_to +
                '&query=' +
                roasterData.query +
                '&sort_by=' +
                roasterData.sort_by +
                '&sort_order=' +
                roasterData.sort_order;
        }
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }
    // Enable the API key by RO
    enableRoApiKey(roasterData: any): Observable<any> {
        const data = { api_call: '', method: '', token: '' };
        (data.api_call = `/ro/${roasterData.roaster_id}/api-keys/${roasterData.api_key_id}/enable`),
            (data.method = 'PUT');
        data.token = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }
    // Notify customer about the API key by RO
    disableRoApiKey(roasterData: any): Observable<any> {
        const data = {};
        (data['api_call'] = `/ro/${roasterData.roaster_id}/api-keys/${roasterData.api_key_id}/disable`),
            (data['method'] = 'PUT');
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }
    // Delete the API key by RO
    deleteRoApiKey(roasterData: any): Observable<any> {
        const data = {};
        (data['api_call'] = `/ro/${roasterData.roaster_id}/api-keys/${roasterData.api_key_id}`),
            (data['method'] = 'DELETE');
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }
    // Notify customer about the API key by RO
    notifyRoCustomer(roasterData: any): Observable<any> {
        const data = {};
        (data['api_call'] = `/ro/${roasterData.roaster_id}/api-keys/${roasterData.api_key_id}/notify`),
            (data['method'] = 'POST');
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }

    // get list of api keys request for RO
    getApiKeysForRo(roasterData: any): Observable<any> {
        const data = {};
        (data['api_call'] = `/ro/${roasterData.roaster_id}/api-keys/requests`), (data['method'] = 'GET');
        data['api_call'] =
            data['api_call'] +
            '?page=' +
            roasterData.page +
            '&per_page=' +
            roasterData.per_page +
            '&org_type=' +
            roasterData.org_type +
            '&status=' +
            roasterData.status;
        if (roasterData.date_from && roasterData.date_to) {
            data['api_call'] =
                data['api_call'] + '&date_from=' + roasterData.date_from + '&date_to=' + roasterData.date_to;
        }
        if (roasterData.query) {
            data['api_call'] = data['api_call'] + '&query=' + roasterData.query;
        }
        if (roasterData.sort_by && roasterData.sort_order) {
            data['api_call'] =
                data['api_call'] + '&sort_by=' + roasterData.sort_by + '&sort_order=' + roasterData.sort_order;
        }
        if (roasterData.date_from && roasterData.date_to && roasterData.query) {
            data['api_call'] +
                '&date_from=' +
                roasterData.date_from +
                '&date_to=' +
                roasterData.date_to +
                '&query=' +
                roasterData.query;
        }
        if (
            roasterData.date_from &&
            roasterData.date_to &&
            roasterData.query &&
            roasterData.sort_by &&
            roasterData.sort_order
        ) {
            data['api_call'] +
                '&date_from=' +
                roasterData.date_from +
                '&date_to=' +
                roasterData.date_to +
                '&query=' +
                roasterData.query +
                '&sort_by=' +
                roasterData.sort_by +
                '&sort_order=' +
                roasterData.sort_order;
        }
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }

    // View API keys request details for RO
    getApiKeysRequestRo(roasterData: any): Observable<any> {
        const data = {};
        (data['api_call'] = `/ro/${roasterData.roaster_id}/api-keys/requests/${roasterData.request_id}`),
            (data['method'] = 'GET');
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }

    // Generate API key for the request by RO
    generateRoApiKey(roasterData: any): Observable<any> {
        const data = {};
        (data['api_call'] = `/ro/${roasterData.roaster_id}/api-keys/requests/${roasterData.request_id}/generate`),
            (data['method'] = 'POST');
        data['token'] = this.cookieService.get('Auth');
        return this.http.post(this.apiUrl, data);
    }
}
