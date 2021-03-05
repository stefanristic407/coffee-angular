import { Component, OnInit, ElementRef, OnDestroy, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RoasterserviceService } from '@services';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, interval, Subscription } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
    selector: 'app-order-chat',
    templateUrl: './order-chat.component.html',
    styleUrls: ['./order-chat.component.scss'],
})
export class OrderChatComponent implements OnInit, OnDestroy, AfterViewInit {
    roasterID: any;
    orderDetails: any;
    currentDisputeID: any;
    isView = true;
    orderID: any;
    orderDisputes = [];
    threadList = [];
    orderThread: any;
    showResolveBtn = false;
    showEscalateBtn = false;
    currentDispute: any;
    roasterName: any;
    orderType: any;
    threadUserList = [];
    orderChatWrapperEl: HTMLElement | null = null;
    headerEl: HTMLElement | null = null;
    private resizeEventSubscription: Subscription;

    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public router: Router,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private toasterService: ToastrService,
        private elRef: ElementRef,
        private render: Renderer2,
    ) {}

    ngOnInit(): void {
        this.roasterID = this.cookieService.get('roaster_id');
        this.roasterName = this.cookieService.get('name');
        this.currentDisputeID = this.route.snapshot.queryParams.disputeID
            ? Number(decodeURIComponent(this.route.snapshot.queryParams.disputeID))
            : undefined;
        this.orderType = this.route.snapshot.queryParams.orderType
            ? decodeURIComponent(this.route.snapshot.queryParams.orderType)
            : undefined;
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId ? params.orderId : '';
            this.getOrderDetails();
            this.getOrderDisputes();
        });
        this.resizeEventSubscription = fromEvent(window, 'resize')
            .pipe(debounce(() => interval(500)))
            .subscribe(this.viewPortSizeChanged);
        this.viewPortSizeChanged();
    }
    viewPortSizeChanged = () => {
        if (!this.orderChatWrapperEl) {
            this.orderChatWrapperEl =
                (this.elRef?.nativeElement?.querySelector('[data-element="order-chat-wrapper"]') as HTMLElement) ||
                null;
        }
        if (!this.headerEl) {
            this.headerEl = (document.querySelector('header') as HTMLElement) || null;
        }

        if (this.orderChatWrapperEl && this.headerEl) {
            const top = this.orderChatWrapperEl.offsetTop;
            const headerHeight = this.headerEl.offsetHeight;
            const viewPort = window.innerHeight;
            const calculatedHeight = viewPort - (top + headerHeight + 30);
            const height = Math.max(calculatedHeight, 400);
            this.render.setStyle(this.orderChatWrapperEl, 'height', `${height}px`);
        }
    };
    ngAfterViewInit() {
        this.viewPortSizeChanged();
    }

    ngOnDestroy() {
        if (this.resizeEventSubscription && this.resizeEventSubscription.unsubscribe) {
            this.resizeEventSubscription.unsubscribe();
        }
    }
    getOrderDetails() {
        this.roasterService.getViewOrderDetails(this.roasterID, this.orderID, this.orderType).subscribe(
            (res: any) => {
                console.log(res);
                if (res.success && res.result) {
                    this.orderDetails = res.result;
                    if (this.orderDetails.status) {
                        this.orderDetails.status = this.formatStatus(this.orderDetails.status);
                    }
                    if (this.orderDetails.order_type) {
                        this.orderDetails.order_type = this.formatStatus(this.orderDetails.order_type);
                    }
                    if (this.orderType === 'MR' && this.orderDetails.type) {
                        this.orderDetails.order_type = this.formatStatus(this.orderDetails.type);
                    }
                    this.orderDetails.images = [];
                    if (this.orderDetails && this.orderDetails.roaster_profile_image_thumbnail_url) {
                        this.orderDetails.images.push(this.orderDetails.roaster_profile_image_thumbnail_url);
                    }
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    getOrderDisputes() {
        this.orderDisputes = [];
        this.threadList = [];
        this.roasterService.getOrderDisputeList(this.roasterID, this.orderID, this.orderType).subscribe(
            (res: any) => {
                console.log(res);
                if (res.success && res.result) {
                    this.orderDisputes = res.result;
                    this.orderDisputes.forEach((ele) => {
                        ele.dispute_status = this.formatStatus(ele.dispute_status);
                        ele.dispute_type = this.formatStatus(ele.dispute_type);
                        if (ele.id === this.currentDisputeID) {
                            this.clickDispute(ele);
                        }
                    });
                }
            },
            (err) => {
                console.log(err);
            },
        );

        this.roasterService.getOrderChatList(this.roasterID, this.orderID, this.orderType).subscribe(
            (res: any) => {
                console.log(res);
                if (res.success && res.result) {
                    this.threadList = res.result;
                    this.orderThread = this.threadList.find((x) => x.thread_type === 'order');
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    clickOrder() {
        this.currentDisputeID = '';
        this.currentDispute = null;
    }
    formatStatus(stringVal) {
        let formatVal = '';
        if (stringVal) {
            formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
            formatVal = formatVal.replace('_', ' ');
        }
        return formatVal.replace('-', '');
    }
    clickDispute(item) {
        this.currentDisputeID = item.id;
        this.showResolveBtn = item.dispute_status === 'Open' ? true : false;
        this.showEscalateBtn = item.escalated;
        this.currentDispute = item;
    }
    markResolved() {
        this.roasterService.markTicketasResolved(this.roasterID, this.currentDisputeID).subscribe(
            (res: any) => {
                if (res.success) {
                    const disputeList = this.orderDisputes.find((item) => item.id === this.currentDisputeID);
                    this.showResolveBtn = false;
                    this.toasterService.success('Successfully marked as resolved');
                    if (disputeList) {
                        disputeList.dispute_status = this.formatStatus('Resolved');
                    }
                }
            },
            (err) => {
                this.toasterService.error('Error while mark as resolve');
                console.log(err);
            },
        );
    }
    escalateTicket() {
        this.roasterService.escalteTicket(this.roasterID, this.currentDisputeID).subscribe(
            (res: any) => {
                if (res.success) {
                    this.toasterService.success('Successfully escalated a dispute');
                    this.showEscalateBtn = true;
                    this.currentDispute.dispute_status = this.formatStatus('Resolved');
                }
            },
            (err) => {
                this.toasterService.error('Error while escaling the dispute');
                console.log(err);
            },
        );
    }

    navigateAssignUser() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                disputeID: this.currentDisputeID,
                id: this.orderID,
            },
        };
        this.router.navigate(['/dispute-system/assign-user'], navigationExtras);
    }

    onReturnOrder() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                id: this.orderID,
            },
        };
        this.router.navigate(['/ordermanagement/order-booked'], navigationExtras);
    }
}
