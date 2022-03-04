import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { OrganizationType } from '@enums';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class ReviewsService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getOrderReviews(orderId: number, orgType: OrganizationType): Observable<Review[]> {
        const params: any = {};
        if (orgType === OrganizationType.ESTATE) {
            params.gc_order_id = orderId;
        } else if (orgType === OrganizationType.MICRO_ROASTER) {
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

    getReviews(orgId: number = this.orgId, orgType: OrganizationType = this.orgType, query?: any): Observable<any> {
        const params = this.serializeParams(query);
        return this.post(this.orgPostUrl, `general/${orgType}/${orgId}/reviews?${params}`, 'GET');
    }

    getReviewsSummary(orgId: number = this.orgId, orgType: OrganizationType = this.orgType) {
        return this.post(this.orgPostUrl, `general/${orgType}/${orgId}/reviews-summary`);
    }
}
