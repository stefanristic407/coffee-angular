import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiResponse, ShippingDetails } from '@models';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class ShippingDetailsService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getShippingDetails(orderId: number): Observable<ApiResponse<ShippingDetails>> {
        return this.postWithOrg(this.orgPostUrl, `orders/${orderId}/shipping-details`, 'GET');
    }
}
