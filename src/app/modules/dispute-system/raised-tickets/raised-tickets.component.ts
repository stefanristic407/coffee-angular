import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { RoasterserviceService, SocketService, ChatUtilService } from '@services';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { ChatMessageType } from '@enums';

@Component({
    selector: 'app-raised-tickets',
    templateUrl: './raised-tickets.component.html',
    styleUrls: ['./raised-tickets.component.scss'],
})
export class RaisedTicketsComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    tableValue = [];
    tableColumns = [];
    totalCount = 0;
    searchForm: FormGroup;
    termSearch: any;
    roasterID: any;
    orderType: any;
    orderID: any;

    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        private roasterService: RoasterserviceService,
        public sharedService: SharedServiceService,
        private socket: SocketService,
        private chatUtil: ChatUtilService,
    ) {
        this.roasterID = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }

        this.route.params.subscribe((params) => {
            this.orderID = params.orderId ? params.orderId : '';
            this.supplyBreadCrumb();
        });
        this.searchForm = this.fb.group({
            searchField: new FormControl({ value: '' }),
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
        this.searchForm.setValue({ searchField: '' });
        this.searchForm.controls.searchField.valueChanges.subscribe((value) => {
            this.termSearch = value;
            this.getTableData();
        });
    }
    getTableData() {
        const postData: any = {};
        postData.search_query = this.termSearch ? this.termSearch : '';
        this.tableValue = [];
        this.roasterService.getRaisedTicketData(this.roasterID, postData, this.orderType).subscribe((data: any) => {
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
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: 'Home',
            routerLink: '/',
        };
        const obj2: MenuItem = {
            label: 'Order Support',
            routerLink: '/dispute-system/order-support/' + this.orderID,
        };
        const obj3: MenuItem = {
            label: 'Raised Tickets',
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
    }

    pushInfoTochatThread(disputeID, disputeReason, callback) {
        this.roasterService.getOrderChatList(this.roasterID, this.orderID, this.orderType).subscribe(
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
        if (this.sharedService.isMobileView) {
            this.goToDispute(ticket);
        }
    }
    goToDispute(ticket) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                disputeID: ticket.id,
                orderType: this.orderType ? this.orderType : undefined,
            },
        };
        this.router.navigate(['/dispute-system/order-chat', ticket.order_id], navigationExtras);
    }
}
