import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class RoasterOrdersService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    updatePaymentReceipt(orderId: number, fileId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `orders/${orderId}/payment`, 'PUT', { receipt_file_id: fileId });
    }
}
