import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-chat',
    templateUrl: './order-chat.component.html',
    styleUrls: ['./order-chat.component.scss'],
})
export class OrderChatComponent implements OnInit {
    roasterID: any;
    orderDetails: any;
    currentDisputeID: any;
    isView = true;
    orderID: any;
    orderDisputes = [];
    showResolveBtn = false;
    showEscalateBtn = false;
    currentDispute: any;
    roasterName: any;
    orderType: any;
    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        public router: Router,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private toasterService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.roasterID = this.cookieService.get('roaster_id');
        this.roasterName = this.cookieService.get('name');
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId ? params.orderId : '';
            this.getOrderDetails();
            this.getOrderDisputes();
        });
        this.currentDisputeID = this.route.snapshot.queryParams.ticketId
            ? decodeURIComponent(this.route.snapshot.queryParams.ticketId)
            : undefined;
        this.orderType = this.route.snapshot.queryParams.orderType
            ? decodeURIComponent(this.route.snapshot.queryParams.orderType)
            : undefined;
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
    }
    clickOrder() {
        this.currentDisputeID = '';
        this.currentDispute = undefined;
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
}
