import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDocument } from '@models';
import { toCamelCase } from '@utils';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getOrderDocuments(orderId: number, page = 1, perPage = 5): Observable<OrderDocument[]> {
        const params = this.serializeParams({ page, per_page: perPage });

        return this.postWithOrg(this.orgPostUrl, `orders/${orderId}/documents?${params}`).pipe(
            map((response) => {
                if (response.success && response.result) {
                    return response.result;
                }

                return [];
            }),
        );
    }
}
