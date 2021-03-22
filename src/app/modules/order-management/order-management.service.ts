import { Injectable } from '@angular/core';
import {
    ApiResponse,
    BulkDetails,
    CuppingScore,
    OrderDetails,
    OrderDocument,
    OrderSummary,
    RecentActivity,
    OrganizationDetails,
    ConfirmRejectOrderDetails,
    LabelValue,
    AvailabilityRequest,
    OrderNote,
    UserProfile,
    LotDetails,
} from '@models';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrgType, OrderType } from '@enums';
import {
    AvailabilityService,
    BrandProfileService,
    GeneralCuppingService,
    OrderService,
    PurchaseService,
    CommonService,
    AvailabilityRequestService,
    UserService,
    LotsService,
    ReviewsService,
} from '@services';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class OrderManagementService {
    private readonly orderDetailsSubject = new BehaviorSubject<OrderDetails>(null);
    private readonly recentActivitiesSubject = new BehaviorSubject<RecentActivity[]>([]);
    private readonly bulkDetailsSubject = new BehaviorSubject<BulkDetails>(null);
    private readonly estateDetailsSubject = new BehaviorSubject<OrganizationDetails>(null);
    private readonly documentsSubject = new BehaviorSubject<OrderDocument[]>([]);
    private readonly ordersSubjects = {
        [OrgType.ESTATE]: new BehaviorSubject<ApiResponse<OrderSummary[]>>(null),
        [OrgType.MICRO_ROASTER]: new BehaviorSubject<ApiResponse<OrderSummary[]>>(null),
    };
    private readonly cuppingScoreSubject = new BehaviorSubject<CuppingScore[]>([]);
    private readonly originListSubject = new BehaviorSubject<LabelValue[]>([]);
    private readonly requestListSubject = new BehaviorSubject<ApiResponse<AvailabilityRequest[]>>(null);
    private readonly orderNotesSubject = new BehaviorSubject<OrderNote[]>([]);
    // TODO: Move into user service as "current user profile" after refactoring
    private readonly userProfileSubject = new BehaviorSubject<UserProfile>(null);
    private readonly lotDetailsSubject = new BehaviorSubject<LotDetails>(null);
    private readonly isReviewedSubject = new BehaviorSubject(false);

    private orderId: number;

    constructor(
        protected cookieSrv: CookieService,
        private availabilitySrv: AvailabilityService,
        private brandProfileSrv: BrandProfileService,
        private cuppingSrv: GeneralCuppingService,
        private orderSrv: OrderService,
        private purchaseSrv: PurchaseService,
        private commonSrv: CommonService,
        private requestSrv: AvailabilityRequestService,
        private userSrv: UserService,
        private lotsSrv: LotsService,
        private reviewSrv: ReviewsService,
    ) {}

    get orderDetails$(): Observable<OrderDetails> {
        return this.orderDetailsSubject.asObservable();
    }

    get recentActivities$(): Observable<RecentActivity[]> {
        return this.recentActivitiesSubject.asObservable();
    }

    get bulkDetails$(): Observable<BulkDetails> {
        return this.bulkDetailsSubject.asObservable();
    }

    get estateDetails$(): Observable<OrganizationDetails> {
        return this.estateDetailsSubject.asObservable();
    }

    get documents$(): Observable<OrderDocument[]> {
        return this.documentsSubject.asObservable();
    }

    get cuppingScore$(): Observable<CuppingScore[]> {
        return this.cuppingScoreSubject.asObservable();
    }

    get originList$(): Observable<LabelValue[]> {
        return this.originListSubject.asObservable();
    }

    get requestList$(): Observable<ApiResponse<AvailabilityRequest[]>> {
        return this.requestListSubject.asObservable();
    }

    get orderNotes$(): Observable<OrderNote[]> {
        return this.orderNotesSubject.asObservable();
    }

    get userProfile$(): Observable<UserProfile> {
        return this.userProfileSubject.asObservable();
    }

    get lotDetails$(): Observable<LotDetails> {
        return this.lotDetailsSubject.asObservable();
    }

    get isReviewed$(): Observable<boolean> {
        return this.isReviewedSubject.asObservable();
    }

    getOrders(organizationType: OrgType): Observable<ApiResponse<OrderSummary[]>> {
        return this.ordersSubjects[organizationType].asObservable();
    }

    confirmOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.purchaseSrv.confirmOrder(orderId, details);
    }

    rejectOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.purchaseSrv.rejectOrder(orderId, details);
    }

    updatePaymentVerify(orderId: number): Observable<ApiResponse<any>> {
        return this.purchaseSrv.updatePaymentVerify(orderId);
    }

    updatePaymentAfterDelivery(orderId: number): Observable<ApiResponse<any>> {
        return this.purchaseSrv.updatePaymentAfterDelivery(orderId);
    }

    updateShipmentDetails(orderId: number, trackingLink: string, shipmentDate: string): Observable<ApiResponse<any>> {
        const payload = {
            tracking_link: trackingLink,
            shipment_date: moment(shipmentDate).format('yyyy-MM-DD'),
        };
        return this.purchaseSrv.updateShipmentDetails(orderId, payload);
    }

    getCuppingReportUrl(harvestId: number): Observable<string> {
        return this.cuppingSrv.getCuppingReportUrl(harvestId);
    }

    createReferenceNumber(orderId: number, referenceNumber: string): Observable<ApiResponse<any>> {
        return this.purchaseSrv.updateOrderDetails(orderId, { order_reference: referenceNumber });
    }

    addOrderNote(orderId: number, note: string): Observable<ApiResponse<any>> {
        return this.purchaseSrv.addOrderNote(orderId, note);
    }

    downloadOrders(
        orgType: OrgType,
        exportType: string,
        dateFrom: string,
        dateTo: string,
    ): Observable<ApiResponse<any>> {
        return this.purchaseSrv.downloadOrders(orgType, exportType, dateFrom, dateTo);
    }

    loadOrigins(): void {
        this.availabilitySrv.getAvailabilityList().subscribe((availabilityList) => {
            const origins = availabilityList.map((x) => (x.lot ? x.lot.country : '').toUpperCase()).filter((x) => x);

            const labels = _.sortBy(_.uniq(origins))
                .map((x) => {
                    return {
                        label: this.commonSrv.getCountryName(x),
                        value: x,
                    };
                })
                .filter((x) => x.label);

            this.originListSubject.next(labels);
        });
    }

    loadOrders(organizationType: OrgType, options: any): void {
        this.purchaseSrv.getOrders(organizationType, options).subscribe({
            next: (result) => this.ordersSubjects[organizationType].next(result),
        });
    }

    loadRequests(options: any): void {
        this.requestSrv.getRequestList(options).subscribe({
            next: (response) => this.requestListSubject.next(response),
        });
    }

    loadOrderDetails(orderId: number, orgType: OrgType): void {
        const rewrite = this.orderId !== orderId;
        this.orderId = orderId;

        this.purchaseSrv.getOrderDetailsById(orderId, orgType).subscribe({
            next: (details) => {
                if (details) {
                    this.orderDetailsSubject.next(details);

                    this.loadActivities(orderId, orgType);
                    this.loadBulkDetails(details.harvest_id);
                    this.loadCuppingScore(details.harvest_id, orgType);
                    this.loadEstateDetails(details.estate_id);
                    this.loadDocuments(1, 5, rewrite);
                    this.loadOrderNotes(orderId);
                    this.loadUserProfile();
                    this.checkReviews(orderId, orgType);

                    if (details.order_type === OrderType.Prebook) {
                        this.loadLotDetails(details.estate_id, details.lot_id);
                    }
                }
            },
        });
    }

    updateOrderDetails(details: OrderDetails): void {
        if (details) {
            this.orderDetailsSubject.next(details);
        }
    }

    loadDocuments(page = 1, perPage = 5, rewrite = false): void {
        this.orderSrv.getOrderDocuments(this.orderId, page, perPage).subscribe({
            next: (result) => {
                if (rewrite) {
                    this.documentsSubject.next([]);
                }

                const documents = this.documentsSubject.getValue();
                documents.push(...result);
                this.documentsSubject.next(documents);
            },
        });
    }

    loadOrderNotes(orderId: number): void {
        this.purchaseSrv.getOrderNotes(orderId).subscribe({
            next: (result) => this.orderNotesSubject.next(result),
        });
    }

    private loadActivities(orderId: number, orgType: OrgType): void {
        this.purchaseSrv.getRecentActivity(orderId, orgType).subscribe({
            next: (result) => this.recentActivitiesSubject.next(result),
        });
    }

    private loadBulkDetails(harvestId: number): void {
        this.availabilitySrv.getAvailabilityDetails(harvestId).subscribe({
            next: (details) => {
                if (details) {
                    this.bulkDetailsSubject.next(details);
                }
            },
        });
    }

    private loadEstateDetails(id: number): void {
        this.brandProfileSrv.getEstateProfile(id).subscribe({
            next: (result) => this.estateDetailsSubject.next(result),
        });
    }

    private loadCuppingScore(harvestId: number, orgType: OrgType): void {
        this.cuppingSrv.getCuppingScores(harvestId, orgType).subscribe({
            next: (result) => this.cuppingScoreSubject.next(result),
        });
    }

    private loadUserProfile(): void {
        this.userSrv.getUserProfile().subscribe({
            next: (res) => {
                if (res.success) {
                    this.userProfileSubject.next(res.result);
                }
            },
        });
    }

    private loadLotDetails(estateId: number, lotId: number): void {
        this.lotsSrv.getLotDetails(estateId, lotId).subscribe({
            next: (res) => {
                if (res) {
                    this.lotDetailsSubject.next(res);
                }
            },
        });
    }

    private checkReviews(orderId: number, orgType: OrgType) {
        this.reviewSrv.getOrderReviews(orderId, orgType).subscribe({
            next: (res) => this.isReviewedSubject.next(res.length > 0),
        });
    }
}
