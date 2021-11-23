import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderStatus, OrganizationType } from '@enums';
import {
    ApiResponse,
    ConfirmRejectOrderDetails,
    LabelValue,
    OrderDetails,
    OrderNote,
    OrderSummary,
    RecentActivity,
} from '@models';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class PurchaseService extends ApiService {
    private readonly endpoint = 'orders';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getOrderDetailsById(orderId: number, orgType: OrganizationType): Observable<OrderDetails> {
        return this.postWithOrg(this.orgPostUrl, `${this.getOrderEndpoint(orgType)}/${orderId}`, 'GET').pipe(
            map((response) => {
                if (response.success && response.result.id) {
                    const details = response.result;
                    details.orderType = details.orderType || details.type;

                    details.uploadShow = true;
                    details.statusPending = true;
                    details.statusPaid = false;
                    details.receiptShow = false;
                    details.beforeGradeComplete = true;
                    details.afterGradeComplete = false;

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

    getOrders(orgType: OrganizationType, options: any): Observable<ApiResponse<OrderSummary[]>> {
        const params = this.serializeParams(options);
        return this.postWithOrg(this.orgPostUrl, `${this.getOrderEndpoint(orgType)}?${params}`, 'GET').pipe(
            map((res) => {
                if (res.success) {
                    return { ...res, result: res.result || [] };
                }
            }),
        );
    }

    getRecentActivity(orderId: number, orgType: OrganizationType): Observable<RecentActivity[]> {
        return this.postWithOrg(this.orgPostUrl, `${this.getOrderEndpoint(orgType)}/${orderId}/events`, 'GET').pipe(
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
                return response.success && response.result ? response.result : [];
            }),
        );
    }

    downloadOrders(
        orgType: OrganizationType,
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
            `${this.getOrderEndpoint(orgType)}/export/${exportType}?${params}`,
            'GET',
        );
    }

    confirmOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/confirm`, 'PUT', details);
    }

    rejectOrder(
        orderId: number,
        details: ConfirmRejectOrderDetails = { notes: 'Order rejection' },
    ): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/reject`, 'PUT', details);
    }

    updatePaymentVerify(orderId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/payment/verify`, 'PUT');
    }

    updatePaymentAfterDelivery(orderId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/payment/after-delivery`, 'PUT');
    }

    updateOrderDetails(orderId: number, details: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}/${orderId}`, 'PUT', details);
    }

    updateOrderDetailsForMr(orderId: number, details: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}`, 'PUT', details);
    }

    updateShipmentDetails(orderId: number, body: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `mr-${this.endpoint}/${orderId}/shipment`, 'PUT', body);
    }

    markAsReceived(orderId: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `${this.endpoint}/${orderId}/mark/received`, 'PUT');
    }

    private getLabel(labels: LabelValue[], value: any): string {
        const label = labels.find((x) => x.value === value);
        return label ? label.label : '';
    }

    private getOrderEndpoint(orgType: OrganizationType): string {
        return orgType === OrganizationType.MICRO_ROASTER ? `mr-${this.endpoint}` : this.endpoint;
    }
}
