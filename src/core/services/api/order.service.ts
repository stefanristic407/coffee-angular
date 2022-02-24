import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, OrderDocument } from '@models';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getOrderDocuments(orderId: number, page = 1, perPage = 5): Observable<ApiResponse<OrderDocument[]>> {
        const params = this.serializeParams({ page, per_page: perPage });

        return this.postWithOrg(this.orgPostUrl, `orders/${orderId}/documents?${params}`);
    }
}
