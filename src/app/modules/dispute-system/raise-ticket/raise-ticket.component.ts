import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService, PurchaseService, RoasterserviceService } from '@services';
import { GlobalsService, SocketService, ChatUtilService } from '@services';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ChatMessageType, OrganizationType } from '@enums';
import { OrderDetails } from '@models';

@Component({
    selector: 'app-raise-ticket',
    templateUrl: './raise-ticket.component.html',
    styleUrls: ['./raise-ticket.component.scss'],
})
export class RaiseTicketComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    orderID: any;
    searchForm: FormGroup;
    termSearch: any;
    helpTextArray = [];
    reasonTextArray = [];
    ticketForm: FormGroup;
    orgType: OrganizationType = OrganizationType.ESTATE;
    orderDetails: any;
    roasterID: any;
    filesArray = [];
    disputeID: string;
    supportValue: any = '';

    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        private socket: SocketService,
        private chatUtil: ChatUtilService,
        private authService: AuthService,
        private purchaseService: PurchaseService,
    ) {}

    ngOnInit(): void {
        this.roasterID = this.authService.getOrgId();
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId ? params.orderId : '';
            this.getOrderDetails();
        });
        if (this.route.snapshot.queryParams.supportValue) {
            this.supportValue = decodeURIComponent(this.route.snapshot.queryParams.supportValue);
        }
        this.supplyBreadCrumb();
        this.ticketForm = this.fb.group({
            orderID: [{ value: this.orderID, disabled: true }, Validators.compose([Validators.required])],
            dispute_type: [this.supportValue, Validators.compose([Validators.required])],
            // dispute_reason: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            solution: [''],
            images: [],
        });
        this.helpTextArray = [
            { label: 'Buying Coffee', value: 'Buying Coffee' },
            { label: 'Requesting Samples', value: 'Requesting Samples' },
            { label: 'Payment', value: 'Payment' },
            { label: 'Coffee Bulks', value: 'Coffee Bulks' },
            { label: 'Shipping', value: 'Shipping' },
            { label: 'Others', value: 'Others' },
        ];
        this.reasonTextArray = [
            {
                label: 'Why do I have to pay before the coffee is shipped ?',
                value: 'Why do I have to pay before the coffee is shipped ?',
            },
            { label: 'Order', value: 'Order' },
            { label: 'Test', value: 'Test' },
        ];
        this.searchForm = this.fb.group({
            searchField: new FormControl({ value: '' }, Validators.compose([Validators.required])),
        });
        this.searchForm.setValue({ searchField: '' });
        this.searchForm.controls.searchField.valueChanges.subscribe((value) => {
            this.termSearch = value;
        });
    }

    getOrderDetails() {
        this.purchaseService.getOrderDetailsById(this.orderID, this.orgType).subscribe(
            (res: OrderDetails) => {
                if (res) {
                    this.orderDetails = res;
                    if (this.orgType === OrganizationType.MICRO_ROASTER) {
                        this.orderDetails.price = this.orderDetails.total_price ? this.orderDetails.total_price : 'NA';
                    }
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            { label: 'Home', routerLink: '/' },
            { label: 'Order Management' },
            { label: 'Purchased order of estate', routerLink: '/orders/es' },
            { label: 'Order ' + this.orderID, routerLink: [`/orders/es/${this.orderID}`] },
            { label: 'Order Support' },
        ];
    }

    submitTicket() {
        if (this.ticketForm.valid) {
            const obj = this.ticketForm.value;
            this.roasterService.raiseTicket(this.roasterID, this.orderID, obj, this.orgType).subscribe(
                (res: any) => {
                    console.log(res);
                    if (res && res.success) {
                        this.disputeID = res.result.id;
                        this.pushInfoTochatThread(this.disputeID, obj.dispute_type, () => {
                            if (this.filesArray && this.filesArray.length > 0) {
                                this.uploadFile();
                            } else {
                                this.redirectOrderChat();
                            }
                        });
                    }
                },
                (err) => {
                    console.log(err);
                    this.toastrService.error('Error while raising a ticket');
                },
            );
        } else {
            this.ticketForm.markAllAsTouched();
            this.toastrService.error('Please fill the data');
        }
    }

    pushInfoTochatThread(disputeID, disputeReason, callback) {
        this.roasterService.getOrderChatList(this.roasterID, this.orderID, this.orgType).subscribe(
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

    documentUpload(event) {
        if (event.target.files) {
            this.filesArray = [];
            this.filesArray.push(event.target.files);
        }
    }

    uploadFile() {
        const fileList: FileList = this.filesArray[0];
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', 'Dispute');
        formData.append('api_call', '/ro/' + this.roasterID + '/file-manager/files');
        formData.append('token', this.authService.token);
        this.roasterService.uploadFiles(formData).subscribe(
            (result: any) => {
                if (result.success && result.result && result.result.id) {
                    this.addFileIds(result.result.id);
                } else {
                    this.redirectOrderChat();
                    this.toastrService.error('Error while uploading the file');
                }
            },
            (err) => {
                this.redirectOrderChat();
            },
        );
    }

    addFileIds(fileID) {
        const fileArray = [fileID];
        const objData = { file_id: fileID };
        this.roasterService.addFileIDDispute(this.roasterID, this.disputeID, objData).subscribe(
            (result) => {
                this.redirectOrderChat();
            },
            (err) => {
                this.redirectOrderChat();
            },
        );
    }

    redirectOrderChat() {
        this.toastrService.success('Successfully raised a ticket');
        const navigationExtras: NavigationExtras = {
            queryParams: {
                disputeID: this.disputeID,
                orderType: this.orgType ? this.orgType : undefined,
            },
        };
        this.router.navigate(['/dispute-system/order-chat', this.orderID], navigationExtras);
    }
}
