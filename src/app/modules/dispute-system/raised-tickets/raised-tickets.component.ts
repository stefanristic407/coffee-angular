import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { ChatMessageType, OrganizationType } from '@enums';
import { AuthService, ChatUtilService, DisputeService, ResizeService, RoasterService, SocketService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'app-raised-tickets',
    templateUrl: './raised-tickets.component.html',
    styleUrls: ['./raised-tickets.component.scss'],
})
export class RaisedTicketsComponent extends ResizeableComponent implements OnInit {
    tableValue = [];
    tableColumns = [];
    roasterID: any;
    loading = true;
    orgType: OrganizationType = OrganizationType.ESTATE;
    orderId: number;
    pageNumber = 1;
    rows = 10;
    totalRecords;

    constructor(
        private authService: AuthService,
        private chatUtil: ChatUtilService,
        private disputeService: DisputeService,
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private socket: SocketService,
        private toastrService: ToastrService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.roasterID = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('orderId')) {
                this.orderId = +params.get('orderId');
            }
            if (params.has('orgType')) {
                this.orgType = params.get('orgType') as OrganizationType;
            }
        });
        this.tableColumns = [
            {
                field: 'order_id',
                header: 'Order ID',
                sortable: false,
                width: 15,
            },
            this.orgType === OrganizationType.MICRO_ROASTER
                ? {
                      field: 'micro_roaster_name',
                      header: 'Micro-roaster name',
                      sortable: false,
                      width: 25,
                  }
                : {
                      field: 'estate_name',
                      header: 'estate_name',
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

    filterCall(event?: LazyLoadEvent) {
        if (event.first > -1) {
            this.pageNumber = event.first / event.rows + 1;
        }
        this.getTableData();
    }

    getTableData() {
        const params: any = {
            sort_by: 'created_at',
            sort_order: 'desc',
            page: this.pageNumber,
            per_page: this.rows,
        };
        this.tableValue = [];
        this.loading = true;
        this.disputeService.getDisputes(this.orgType, params).subscribe((data: any) => {
            if (data.success) {
                data.result.map((ele) => {
                    ele.dispute_type =
                        ele.dispute_type.charAt(0).toUpperCase() + ele.dispute_type.slice(1).toLowerCase();
                    ele.dispute_status =
                        ele.dispute_status.charAt(0).toUpperCase() + ele.dispute_status.slice(1).toLowerCase();
                    return ele;
                });
                this.tableValue = data.result;
                this.totalRecords = data.result_info.total_count;
            } else {
                this.toastrService.error('Error while getting the agreement list!');
            }
            this.loading = false;
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
