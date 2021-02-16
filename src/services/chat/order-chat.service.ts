import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OrderChatService {
    private roasterUrl = environment.apiURL + '/ro/api';
    private roasterDeleteUrl = environment.apiURL + '/ro/deleteapi';
    private roasterputUrl = environment.apiURL + '/ro/putapi';

    constructor(private http: HttpClient, public cookieService: CookieService) {}

    getOrderThreadListByRO(orderId) {
        const roasterId = this.cookieService.get('roaster_id');
        const payload = {
            api_call: `/ro/${roasterId}/orders/${orderId}/threads`,
            method: 'GET',
            token: this.cookieService.get('Auth'),
        };
        return this.http.post(this.roasterUrl, payload);
    }

    get token() {
        let userToken = (this.cookieService.get('Auth')?.replace(/\r/g, '')?.split(/\n/) || '')[0];
        if (!userToken) {
            console.error('User token parese error');
            userToken = '';
        }
        return userToken;
    }
}
