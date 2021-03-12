import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrgType } from '@enums';
import {
    ApiResponse,
    ConfirmRejectOrderDetails,
    LabelValue,
    OrderDetails,
    OrderSummary,
    RecentActivity,
    OrderNote,
} from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import * as moment from 'moment';
import { toCamelCase } from '@utils';
import { ORDER_STATUS_ITEMS, ORDER_TYPE_ITEMS } from '@constants';

@Injectable({
    providedIn: 'root',
})
export class PurchaseService extends ApiService {
    private readonly endpoint = 'orders';

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getOrderDetailsById(orderId: number, orgType: OrgType): Observable<OrderDetails> {
        return this.postWithOrg(this.orgPostUrl, `${this.getOrgEndpoint(orgType)}/${orderId}`, 'GET').pipe(
            map((response) => {
                if (response.success && response.result.id) {
                    const details = toCamelCase<OrderDetails>(response.result);
                    details.orderType = details.orderType || details.type;

                    details.uploadShow = true;
                    details.statusPending = true;
                    details.statusPaid = false;
                    details.receiptShow = false;
                    details.beforeGradeComplete = true;
                    details.afterGradeComplete = false;
                    details.shipmentStatus = false;

                    if (details.paymentStatus === 'VERIFIED') {
                        details.uploadShow = false;
                        details.receiptShow = true;
                        details.statusPaid = true;
                        details.statusPending = false;
                        details.paymentVerification = true;
                    }

                    return details;
                }

                return null;
            }),
        );
    }

    getOrders(orgType: OrgType, options: any): Observable<ApiResponse<OrderSummary[]>> {
        const params = this.serializeParams(options);
        return this.postWithOrg(this.orgPostUrl, `${this.getOrgEndpoint(orgType)}?${params}`, 'GET').pipe(
            map((res) => {
                if (res.success) {
                    res.result = res.result || [];
                    const arr = res.result
                        .map((x) => toCamelCase<OrderSummary>(x))
                        .map((x) => ({
                            ...x,
                            status: this.getLabel(ORDER_STATUS_ITEMS, x.status),
                            type: this.getLabel(ORDER_TYPE_ITEMS, x.type),
                        }));

                    return { ...res, result: arr };
                }
            }),
        );
    }

    getRecentActivity(orderId: number, orgType: OrgType): Observable<RecentActivity[]> {
        return this.postWithOrg(this.orgPostUrl, `${this.getOrgEndpoint(orgType)}/${orderId}/events`, 'GET').pipe(
            map((response) => {
                return response.success ? response.result : [];
            }),
        );
    }

    addOrderNote(orderId: number, note: string): Observable<ApiResponse<void>> {
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}/${orderId}/notes`, 'POST', { notes: note });
    }

    getOrderNotes(orderId: number): Observable<OrderNote[]> {
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}/${orderId}/notes`).pipe(
            map((response) => {
                return response.success && response.result ? response.result.map((x) => toCamelCase<OrderNote>(x)) : [];
            }),
        );
    }

    downloadOrders(
        orgType: OrgType,
        exportType: string,
        dateFrom: string,
        dateTo: string,
    ): Observable<ApiResponse<any>> {
        const paramsObj = {
            from_date: dateFrom ? moment(dateFrom).format('yyyy-MM-DD') : '',
            to_date: dateTo ? moment(dateTo).format('yyyy-MM-DD') : '',
        };
        const params = this.serializeParams(paramsObj);

        return this.postWithOrg(
            this.orgPostUrl,
            `${this.getOrgEndpoint(orgType)}/export/${exportType}?${params}`,
            'GET',
        );
    }

    confirmOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/confirm`, 'PUT', details);
    }

    rejectOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/reject`, 'PUT', details);
    }

    updatePaymentVerify(orderId: number): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/payment/verify`, 'PUT');
    }

    updatePaymentAfterDelivery(orderId: number): Observable<ApiResponse<any>> {
        return this.post(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/payment/after-delivery`, 'PUT');
    }

    updateOrderDetails(orderId: number, details: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}/${orderId}`, 'PUT', details);
    }

    private getLabel(labels: LabelValue[], value: any): string {
        const label = labels.find((x) => x.value === value);
        return label ? label.label : '';
    }

    private getOrgEndpoint(orgType: OrgType): string {
        return orgType === OrgType.MICRO_ROASTER ? `mr-${this.endpoint}` : this.endpoint;
    }
}
