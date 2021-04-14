import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiResponse, ShippingDetails } from '@models';

@Injectable({
    providedIn: 'root',
})
export class ShippingDetailsService extends ApiService {
    constructor(protected http: HttpClient, protected cookieService: CookieService) {
        super(cookieService, http);
    }

    getShippingDetails(orderId: number): Observable<ApiResponse<ShippingDetails>> {
        return this.postWithOrg(this.orgPostUrl, `orders/${orderId}/shipping-details`, 'GET');
    }
}
