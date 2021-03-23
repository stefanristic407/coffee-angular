import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { Address, ApiResponse } from '@models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AddressesService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    addAddress(address: Address): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, 'addresses', 'POST', address);
    }

    getAddresses(): Observable<ApiResponse<Address[]>> {
        return this.postWithOrg(this.orgPostUrl, 'addresses', 'GET');
    }

    updateAddress(addressId: number, address: Address): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `addresses/${addressId}`, 'PUT', address);
    }
}
