import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    ApiResponse,
    BulkDetails,
    ConfirmRejectOrderDetails,
    CuppingScore,
    LabelValue,
    OrderDetails,
    OrderDocument,
    OrderSummary,
    RecentActivity,
    RoasterDetails,
} from '@core/models';
import { toCamelCase } from '@core/utils';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { ORDER_STATUS_ITEMS, ORDER_TYPE_ITEMS } from '@core/constants';
import { map } from 'rxjs/operators';
import { ApiService } from './api/api.service';

@Injectable({
    providedIn: 'root',
})
export class OrdersService extends ApiService {
    private readonly orderDetailsSubject = new BehaviorSubject<OrderDetails>(null);
    private readonly recentActivitiesSubject = new BehaviorSubject<RecentActivity[]>([]);
    private readonly bulkDetailsSubject = new BehaviorSubject<BulkDetails>(null);
    private readonly roasterDetailsSubject = new BehaviorSubject<RoasterDetails>(null);
    private readonly documentsSubject = new BehaviorSubject<OrderDocument[]>([]);
    private readonly ordersSubject = new BehaviorSubject<ApiResponse<OrderSummary[]>>(null);
    private readonly cuppingScoreSubject = new BehaviorSubject<CuppingScore[]>([]);

    private orderId: number;

    constructor(protected http: HttpClient, protected cookieService: CookieService) {
        super(cookieService, http);
    }

    get orderDetails$(): Observable<OrderDetails> {
        return this.orderDetailsSubject.asObservable();
    }

    get recentActivities$(): Observable<RecentActivity[]> {
        return this.recentActivitiesSubject.asObservable();
    }

    get bulkDetails$(): Observable<BulkDetails> {
        return this.bulkDetailsSubject.asObservable();
    }

    get roasterDetails$(): Observable<RoasterDetails> {
        return this.roasterDetailsSubject.asObservable();
    }

    get documents$(): Observable<OrderDocument[]> {
        return this.documentsSubject.asObservable();
    }

    get orders$(): Observable<ApiResponse<OrderSummary[]>> {
        return this.ordersSubject.asObservable();
    }

    get cuppingScore$(): Observable<CuppingScore[]> {
        return this.cuppingScoreSubject.asObservable();
    }

    getOrderDetailsById(orderId: number): Observable<ApiResponse<OrderDetails>> {
        return this.post(this.url, `orders/${orderId}`, 'GET');
    }

    loadOrders(options: any): void {
        const params = this.serializeParams(options);
        this.post(this.url, `orders?${params}`, 'GET').subscribe((res) => {
            if (res.success) {
                res.result = res.result || [];
                const arr = res.result
                    .map((x) => toCamelCase(x))
                    .map((x) => ({
                        ...x,
                        status: this.getLabel(ORDER_STATUS_ITEMS, x.status),
                        type: this.getLabel(ORDER_TYPE_ITEMS, x.type),
                    }));

                this.ordersSubject.next({ ...res, result: arr });
            }
        });
    }

    loadOrderDetails(orderId: number): void {
        const rewrite = this.orderId !== orderId;
        this.orderId = orderId;

        this.getOrderDetailsById(orderId).subscribe((res) => {
            if (res.success && res.result.id) {
                const details = toCamelCase<OrderDetails>(res.result);
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

                this.orderDetailsSubject.next(details);

                this.loadActivities(orderId);
                this.loadBulkDetails(details.harvestId);
                this.loadCuppingScore(details.harvestId);
                this.loadRoasterDetails(details.roasterId);
                this.loadDocuments(1, 5, rewrite);
            }
        });
    }

    confirmOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.post(this.url, `orders/${orderId}/confirm`, 'PUT', details);
    }

    rejectOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.post(this.url, `orders/${orderId}/reject`, 'PUT', details);
    }

    updatePaymentVerify(orderId: number): Observable<ApiResponse<any>> {
        return this.post(this.url, `orders/${orderId}/payment/verify`, 'PUT');
    }

    updatePaymentAfterDelivery(orderId: number): Observable<ApiResponse<any>> {
        return this.post(this.url, `orders/${orderId}/payment/after-delivery`, 'PUT');
    }

    updateOrderDetails(details: OrderDetails): void {
        if (details) {
            this.orderDetailsSubject.next(details);
        }
    }

    loadDocuments(page = 1, perPage = 5, rewrite = false): void {
        this.post(this.url, `orders/${this.orderId}/documents?page=${page}&per_page=${perPage}`).subscribe(
            (response) => {
                if (response.success) {
                    if (rewrite) {
                        this.documentsSubject.next([]);
                    }

                    const result = response.result ? response.result.map((x) => toCamelCase<OrderDocument[]>(x)) : [];
                    const documents = this.documentsSubject.getValue();
                    documents.push(...result);
                    this.documentsSubject.next(documents);
                }
            },
        );
    }

    downloadOrders(exportType: string, dateFrom: string, dateTo: string) {
        const paramsObj = {
            from_date: dateFrom ? moment(dateFrom).format('yyyy-MM-DD') : '',
            to_date: dateTo ? moment(dateTo).format('yyyy-MM-DD') : '',
        };
        const params = this.serializeParams(paramsObj);

        return this.post(this.url, `orders/export/${exportType}?${params}`, 'GET');
    }

    getCuppingReportUrl(harvestId: number): Observable<string> {
        return this.post(this.url, `/general/harvests/${harvestId}/cupping-report`, 'GET').pipe(
            map((res) => {
                if (res.success) {
                    return res.result.url;
                }

                return '';
            }),
        );
    }

    private loadActivities(orderId: any): void {
        this.post(this.url, `orders/${orderId}/events`, 'GET').subscribe((response) => {
            if (response.success) {
                this.recentActivitiesSubject.next(response.result);
            }
        });
    }

    private loadBulkDetails(harvestId: number): void {
        this.post(this.url, `availability/gc/${harvestId}`, 'GET').subscribe((response) => {
            if (response.success) {
                const details: BulkDetails = {
                    flavours: response.result.flavours,
                    listingStatus: response.result.listing_status,
                    packaging: response.result.packaging,
                    processingTypes: response.result.processing_types,
                    type: response.result.type,
                    species: response.result.species,
                    waterActivity: response.result.dry_milling.water_activity,
                    icoNumber: response.result.ico_number,
                    quantityCount: response.result.quantity_count,
                    quantityType: response.result.quantity_type,
                };

                this.bulkDetailsSubject.next(details);
            }
        });
    }

    private loadRoasterDetails(roasterId: number): void {
        this.post(this.url, `/general/ro/${roasterId}/profile/`, 'GET').subscribe((response) => {
            if (response.success) {
                this.roasterDetailsSubject.next(toCamelCase<RoasterDetails>(response.result));
            }
        });
    }

    private loadCuppingScore(harvestId: number): void {
        this.post(this.url, `/general/harvests/${harvestId}/cupping-scores`, 'GET').subscribe((response) => {
            if (response.success) {
                this.cuppingScoreSubject.next(response.result.map((x) => toCamelCase<CuppingScore>(x)));
            }
        });
    }

    private getLabel(labels: LabelValue[], value: any): string {
        const label = labels.find((x) => x.value === value);
        return label ? label.label : '';
    }
}
