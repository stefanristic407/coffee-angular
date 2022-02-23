import { Injectable } from '@angular/core';
import { AddressType, OrderType, OrganizationType, PaymentStatus, ServiceRequestStatus } from '@enums';
import {
    Address,
    ApiResponse,
    AvailabilityRequest,
    BulkDetails,
    ConfirmRejectOrderDetails,
    CuppingScore,
    LabelValue,
    LotDetails,
    OrderDetails,
    OrderDocument,
    OrderNote,
    OrderSummary,
    OrganizationDetails,
    RecentActivity,
    ShippingDetails,
    UserProfile,
} from '@models';
import {
    AddressesService,
    AvailabilityRequestService,
    AvailabilityService,
    FileService,
    GeneralCuppingService,
    LotsService,
    OrderService,
    OrganizationService,
    OriginService,
    PurchaseService,
    ReviewsService,
    RoasterOrdersService,
    ShippingDetailsService,
    UserService,
} from '@services';
import { getCountry } from '@utils';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OrderManagementService {
    private readonly orderDetailsSubject = new BehaviorSubject<OrderDetails>(null);
    private readonly recentActivitiesSubject = new BehaviorSubject<RecentActivity[]>([]);
    private readonly bulkDetailsSubject = new BehaviorSubject<BulkDetails>(null);
    private readonly estateDetailsSubject = new BehaviorSubject<OrganizationDetails>(null);
    private readonly microRoasterDetailsSubject = new BehaviorSubject<OrganizationDetails>(null);
    private readonly documentsSubject = new BehaviorSubject<OrderDocument[]>([]);
    private readonly ordersSubjects = {
        [OrganizationType.ESTATE]: new Subject<ApiResponse<OrderSummary[]>>(),
        [OrganizationType.MICRO_ROASTER]: new Subject<ApiResponse<OrderSummary[]>>(),
    };
    private readonly cuppingScoreSubject = new BehaviorSubject<CuppingScore[]>([]);
    private readonly originListSubject = new BehaviorSubject<LabelValue[]>([]);
    private readonly requestListSubject = new Subject<ApiResponse<AvailabilityRequest[]>>();
    private readonly orderNotesSubject = new BehaviorSubject<OrderNote[]>([]);
    // TODO: Move into user service as "current user profile" after refactoring
    private readonly userProfileSubject = new BehaviorSubject<UserProfile>(null);
    private readonly lotDetailsSubject = new BehaviorSubject<LotDetails>(null);
    private readonly isReviewedSubject = new BehaviorSubject(false);
    private readonly shippingDetailsSubject = new BehaviorSubject<ShippingDetails>(null);

    private orderId: number;

    private ordersSub: Subscription;
    private requestsSub: Subscription;

    documentsTotalCount: number;

    constructor(
        private addressesSrv: AddressesService,
        private availabilitySrv: AvailabilityService,
        private cuppingSrv: GeneralCuppingService,
        private fileSrv: FileService,
        private lotsSrv: LotsService,
        private orderSrv: OrderService,
        private organizationService: OrganizationService,
        private originService: OriginService,
        private purchaseSrv: PurchaseService,
        private requestSrv: AvailabilityRequestService,
        private reviewSrv: ReviewsService,
        private roasterOrdersSrv: RoasterOrdersService,
        private shippingDetailsSrv: ShippingDetailsService,
        private userSrv: UserService,
        protected cookieSrv: CookieService,
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

    get microRoasterDetails$(): Observable<OrganizationDetails> {
        return this.microRoasterDetailsSubject.asObservable();
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

    get shippingDetails$(): Observable<ShippingDetails> {
        return this.shippingDetailsSubject.asObservable();
    }

    getOrgProfile(orgType: OrganizationType): Observable<OrganizationDetails> {
        if (orgType === OrganizationType.ESTATE) {
            return this.estateDetails$;
        } else {
            return this.microRoasterDetails$;
        }
    }

    getOrders(organizationType: OrganizationType): Observable<ApiResponse<OrderSummary[]>> {
        return this.ordersSubjects[organizationType].asObservable();
    }

    confirmOrder(
        orderId: number,
        details: ConfirmRejectOrderDetails = { notes: 'Order confirmation' },
    ): Observable<ApiResponse<any>> {
        return this.purchaseSrv.confirmOrder(orderId, details);
    }

    rejectOrder(orderId: number, details?: ConfirmRejectOrderDetails): Observable<ApiResponse<any>> {
        return this.purchaseSrv.rejectOrder(orderId, details);
    }

    updatePaymentVerify(orderId: number): Observable<ApiResponse<any>> {
        return this.purchaseSrv.updatePaymentVerify(orderId);
    }

    updatePaymentAfterDelivery(orderId: number): Observable<ApiResponse<any>> {
        return this.purchaseSrv
            .updatePaymentAfterDelivery(orderId)
            .pipe(tap(() => this.loadOrderDetails(orderId, OrganizationType.MICRO_ROASTER)));
    }

    updateShipmentDetails(orderId: number, trackingLink: string, shipmentDate: string): Observable<ApiResponse<any>> {
        const payload = {
            tracking_link: trackingLink,
            shipment_date: moment(shipmentDate).format('yyyy-MM-DD'),
        };

        return this.purchaseSrv
            .updateShipmentDetails(orderId, payload)
            .pipe(tap(() => this.loadOrderDetails(orderId, OrganizationType.MICRO_ROASTER)));
    }

    updateShippingAddress(orderId: number, address: Address): Observable<ApiResponse<any>> {
        return this.addressesSrv.getAddresses().pipe(
            mergeMap((res) => {
                if (res.success && res.result) {
                    const shippingAddress = res.result.find((x) => x.type === AddressType.SHIPPING);
                    if (shippingAddress) {
                        address.id = shippingAddress.id;
                        address.type = AddressType.SHIPPING;
                        return this.addressesSrv.updateAddress(shippingAddress.id, address).pipe(
                            mergeMap(() => {
                                return this.purchaseSrv.updateOrderDetails(orderId, {
                                    shipping_address_id: shippingAddress.id,
                                });
                            }),
                        );
                    }
                } else {
                    return of(res);
                }
            }),
        );
    }

    getCuppingReportUrl(harvestId: number): Observable<string> {
        return this.cuppingSrv.getCuppingReportUrl(harvestId);
    }

    createReferenceNumber(orderId: number, referenceNumber: string): Observable<ApiResponse<any>> {
        return this.purchaseSrv.updateOrderDetails(orderId, { order_reference: referenceNumber });
    }

    createReferenceNumberForMrOrder(orderId: number, referenceNumber: string): Observable<ApiResponse<any>> {
        return this.purchaseSrv.updateOrderDetailsForMr(orderId, { order_reference: referenceNumber });
    }

    addOrderNote(orderId: number, note: string): Observable<ApiResponse<any>> {
        return this.purchaseSrv.addOrderNote(orderId, note);
    }

    downloadOrders(
        orgType: OrganizationType,
        exportType: string,
        dateFrom: string,
        dateTo: string,
    ): Observable<ApiResponse<any>> {
        return this.purchaseSrv.downloadOrders(orgType, exportType, dateFrom, dateTo);
    }

    loadOrigins(): void {
        this.originService.getOrigins({ visibility: true }).subscribe((res: ApiResponse<any>) => {
            if (res.success) {
                const origins = _.chain(res.result.origins)
                    .map((item) => {
                        return { value: item, label: getCountry(item)?.name || item };
                    })
                    .value();
                this.originListSubject.next(origins);
            }
        });
    }

    loadOrders(organizationType: OrganizationType, options: any): void {
        if (this.ordersSub?.unsubscribe) {
            this.ordersSub.unsubscribe();
        }
        this.ordersSub = this.purchaseSrv.getOrders(organizationType, options).subscribe({
            next: (result) => this.ordersSubjects[organizationType].next(result),
        });
    }

    loadRequests(options: any): void {
        if (this.requestsSub?.unsubscribe) {
            this.requestsSub.unsubscribe();
        }
        this.requestsSub = this.requestSrv.getRequestList(options).subscribe({
            next: (response) => this.requestListSubject.next(response),
        });
    }

    loadOrderDetails(
        orderId: number,
        orgType: OrganizationType,
        skipAdditionalDetails = false,
        resolve?,
        reject?,
    ): void {
        const rewrite = this.orderId !== orderId;
        this.orderId = orderId;

        this.orderDetailsSubject.next(null);
        this.purchaseSrv.getOrderDetailsById(orderId, orgType).subscribe({
            next: (details) => {
                if (details) {
                    details.statusPaid = details.payment_status === PaymentStatus.VERIFIED;

                    this.orderDetailsSubject.next(details);

                    if (!skipAdditionalDetails) {
                        this.loadActivities(orderId, orgType);
                        this.loadBulkDetails(details.harvest_id);
                        this.loadCuppingScore(details.harvest_id, orgType);
                        this.loadEstateDetails(details.estate_id);
                        this.loadMicroRoasterDetails(details.micro_roaster_id);
                        this.loadDocuments(1, 5, rewrite);
                        this.loadOrderNotes(orderId);
                        this.loadUserProfile();
                        this.checkReviews(orderId, orgType);

                        if (
                            details.estimated_departure_date ||
                            details.estimated_pickup_date ||
                            details.exporter_status === ServiceRequestStatus.COMPLETED ||
                            details.exporter_status === ServiceRequestStatus.CLOSED
                        ) {
                            this.loadShippingDetails(orderId);
                        }

                        if (details.order_type === OrderType.Prebook) {
                            this.loadLotDetails(details.estate_id, details.lot_id);
                        }
                    }
                    if (resolve) {
                        resolve();
                    }
                } else {
                    if (reject) {
                        reject();
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
        this.orderSrv.getOrderDocuments(this.orderId, page, perPage).subscribe((res) => {
            if (res.success) {
                this.documentsTotalCount = res.result_info.total_count;
                if (rewrite) {
                    this.documentsSubject.next([]);
                }

                const documents = this.documentsSubject.getValue();
                documents.push(...res.result);
                this.documentsSubject.next(documents);
            }
        });
    }

    loadOrderNotes(orderId: number): void {
        this.purchaseSrv.getOrderNotes(orderId).subscribe({
            next: (result) => this.orderNotesSubject.next(result),
        });
    }

    uploadReceipt(orderId: number, fileEvent: any): Observable<ApiResponse<any>> {
        const files = fileEvent.target.files;
        if (!files || !files.length) {
            return of(null);
        }

        const file = files[0];
        const formData = new FormData();

        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', 'gc-order');

        return this.fileSrv.uploadFiles(formData).pipe(
            mergeMap((response) => {
                if (response.success && response.result) {
                    return this.roasterOrdersSrv.updatePaymentReceipt(orderId, response.result.id);
                }

                return of(null);
            }),
        );
    }

    markAsReceived(orderId: number): Observable<ApiResponse<any>> {
        return this.purchaseSrv.markAsReceived(orderId);
    }

    private loadShippingDetails(orderId: number): void {
        this.shippingDetailsSrv.getShippingDetails(orderId).subscribe({
            next: (response) => {
                if (response.success) {
                    const shippingDetails = response.result;
                    this.shippingDetailsSubject.next(shippingDetails);
                }
            },
        });
    }

    private loadActivities(orderId: number, orgType: OrganizationType): void {
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
        this.organizationService.getProfile(id, OrganizationType.ESTATE).subscribe({
            next: (result) => this.estateDetailsSubject.next(result as OrganizationDetails),
        });
    }

    private loadMicroRoasterDetails(id: number): void {
        if (id) {
            this.organizationService.getProfile(id, OrganizationType.MICRO_ROASTER).subscribe({
                next: (result) => this.microRoasterDetailsSubject.next(result as OrganizationDetails),
            });
        }
    }

    private loadCuppingScore(harvestId: number, orgType: OrganizationType): void {
        this.cuppingSrv.getCuppingScores(harvestId, orgType).subscribe({
            next: (result) => this.cuppingScoreSubject.next(result),
        });
    }

    private loadUserProfile(): void {
        this.userSrv.getUserDetail().subscribe({
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

    private checkReviews(orderId: number, orgType: OrganizationType) {
        this.reviewSrv.getOrderReviews(orderId, orgType).subscribe({
            next: (res) => this.isReviewedSubject.next(res.length > 0),
        });
    }
}
