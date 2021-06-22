import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RoasterserviceService, SocketService, ChatUtilService, AuthService, DisputeService } from '@services';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ChatMessageType, OrganizationType } from '@enums';

@Component({
    selector: 'app-raised-tickets',
    templateUrl: './raised-tickets.component.html',
    styleUrls: ['./raised-tickets.component.scss'],
})
export class RaisedTicketsComponent implements OnInit {
    tableValue = [];
    tableColumns = [];
    totalCount = 0;
    roasterID: any;
    orgType: OrganizationType = OrganizationType.ESTATE;
    orderId: number;

    constructor(
        private authService: AuthService,
        private chatUtil: ChatUtilService,
        private disputeService: DisputeService,
        private roasterService: RoasterserviceService,
        private route: ActivatedRoute,
        private router: Router,
        private socket: SocketService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public globals: GlobalsService,
    ) {
        this.roasterID = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('orderId')) {
                this.orderId = +params.get('orderId');
            }
        });
        this.tableColumns = [
            {
                field: 'order_id',
                header: 'Order ID',
                sortable: false,
                width: 15,
            },
            {
                field: 'estate_name',
                header: 'Estate name',
                sortable: false,
                width: 25,
            },
            {
                field: 'date_ordered',
                header: 'Date ordered',
                width: 15,
            },
            {
                field: 'dispute_type',
                header: 'Type of dispute',
                sortable: false,
                width: 15,
            },
            {
                field: 'dispute_status',
                header: 'Status',
                sortable: false,
                width: 15,
            },
            {
                field: 'actions',
                header: 'Actions',
                sortable: false,
                width: 15,
            },
        ];
    }

    getTableData() {
        const params: any = {
            sort_by: 'created_at',
            sort_order: 'desc',
        };
        this.tableValue = [];
        this.disputeService.getOrderDisputes(this.orgType, this.orderId, params).subscribe((data: any) => {
            if (data.success) {
                data.result.map((ele) => {
                    ele.dispute_type =
                        ele.dispute_type.charAt(0).toUpperCase() + ele.dispute_type.slice(1).toLowerCase();
                    ele.dispute_status =
                        ele.dispute_status.charAt(0).toUpperCase() + ele.dispute_status.slice(1).toLowerCase();
                    return ele;
                });
                this.tableValue = data.result;
            } else {
                this.toastrService.error('Error while getting the agreement list!');
            }
        });
    }

    pushInfoTochatThread(disputeID, disputeReason, callback) {
        this.roasterService.getOrderChatList(this.roasterID, this.orderId, this.orgType).subscribe(
            (res: any) => {
                console.log(res);
                if (res.success && res.result) {
                    const threadList = res.result;
                    const orderThread = threadList.find((x) => x.thread_type === 'order');
                    const timestamp = this.chatUtil.getTimeStamp();
                    this.socket.orderChatEvents.next({
                        type: ChatMessageType.message,
                        timestamp,
                        data: {
                            thread_id: orderThread.thread_id,
                            meta_data: JSON.stringify({
                                type: 'DISPUTE_RAISED',
                                dispute_details: {
                                    id: disputeID,
                                    content: `has raised dispute on the ${
                                        disputeReason === 'Others' ? 'some  reasons' : disputeReason
                                    } of GC.  Please take appropriate action`,
                                },
                            }),
                        },
                    });
                }
                callback();
            },
            (err) => {
                callback();
                console.log(err);
            },
        );
    }

    callMobileTicket(ticket) {
        this.goToDispute(ticket);
    }

    goToDispute(ticket) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                disputeID: ticket.id,
                orderType: this.orgType ? this.orgType : undefined,
            },
        };
        this.router.navigate(['/dispute-system/order-chat', ticket.order_id], navigationExtras);
    }
}
