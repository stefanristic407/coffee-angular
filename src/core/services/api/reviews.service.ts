import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { OrgType } from '@enums';

@Injectable({
    providedIn: 'root',
})
export class ReviewsService extends ApiService {
    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getOrderReviews(orderId: number, orgType: OrgType): Observable<Review[]> {
        const params: any = {};
        if (orgType === OrgType.ESTATE) {
            params.gc_order_id = orderId;
        } else if (orgType === OrgType.MICRO_ROASTER) {
            params.mr_gc_order_id = orderId;
        }

        const serializedParams = this.serializeParams(params);

        return this.postWithOrg(this.orgPostUrl, `your-reviews?${serializedParams}`).pipe(
            map((response) => {
                if (response.success) {
                    return response.result || [];
                }

                return null;
            }),
        );
    }
}
