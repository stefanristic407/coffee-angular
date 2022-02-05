import { Observable, Subject, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService, PurchaseService, RoasterService } from '@services';
import { GlobalsService, SocketService, ChatUtilService } from '@services';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ChatMessageType, OrganizationType } from '@enums';
import { OrderDetails, UploadFile } from '@models';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-raise-ticket',
    templateUrl: './raise-ticket.component.html',
    styleUrls: ['./raise-ticket.component.scss'],
})
export class RaiseTicketComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    orgType: OrganizationType = OrganizationType.ESTATE;
    orderId: number;
    helpTextArray = [];
    reasonTextArray = [];
    ticketForm: FormGroup;
    orderDetails: any;
    roasterID: any;
    filesArray: UploadFile[] = [];
    disputeID: string;
    supportValue: any = '';

    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public roasterService: RoasterService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        private socket: SocketService,
        private chatUtil: ChatUtilService,
        private authService: AuthService,
        private purchaseService: PurchaseService,
    ) {}

    ngOnInit(): void {
        this.helpTextArray = [
            { label: 'Buying coffee', value: 'Buying Coffee' },
            { label: 'Requesting samples', value: 'Requesting Samples' },
            { label: 'Payment', value: 'Payment' },
            { label: 'Coffee bulks', value: 'Coffee Bulks' },
            { label: 'Shipping', value: 'Shipping' },
            { label: 'Others', value: 'Others' },
        ];
        this.roasterID = this.authService.getOrgId();
        this.route.paramMap.subscribe((params) => {
            if (params.has('orderId') && params.has('orgType')) {
                this.orderId = +params.get('orderId');
                this.orgType = params.get('orgType') as OrganizationType;
                this.getOrderDetails();
            }
        });
        if (this.route.snapshot.queryParams.supportValue) {
            this.supportValue = decodeURIComponent(this.route.snapshot.queryParams.supportValue);
        }
        this.supplyBreadCrumb();
        this.ticketForm = this.fb.group({
            orderId: [{ value: this.orderId, disabled: true }, Validators.compose([Validators.required])],
            dispute_type: [this.supportValue, Validators.compose([Validators.required])],
            // dispute_reason: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            solution: [''],
            images: [],
        });
        this.reasonTextArray = [
            {
                label: 'Why do I have to pay before the coffee is shipped ?',
                value: 'Why do I have to pay before the coffee is shipped ?',
            },
            { label: 'Order', value: 'Order' },
            { label: 'Test', value: 'Test' },
        ];
    }

    getOrderDetails() {
        this.purchaseService.getOrderDetailsById(this.orderId, this.orgType).subscribe(
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
            { label: 'Order management' },
            { label: 'Purchased order of estate', routerLink: '/orders/es' },
            { label: 'Order ' + this.orderId, routerLink: [`/orders/es/${this.orderId}`] },
            { label: 'Order support' },
        ];
    }

    submitTicket() {
        if (this.ticketForm.valid) {
            const obj = this.ticketForm.value;
            this.roasterService.raiseTicket(this.roasterID, this.orderId, obj, this.orgType).subscribe(
                (res: any) => {
                    if (res && res.success) {
                        this.disputeID = res.result.id;
                        this.pushInfoTochatThread(this.disputeID, obj.dispute_type, () => {
                            this.attachFiles().subscribe(
                                () => {},
                                () => {
                                    this.toastrService.error('Error occured while attaching the files');
                                },
                            );
                        });
                        this.redirectOrderChat();
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
        this.roasterService.getOrderChatList(this.roasterID, this.orderId, this.orgType).subscribe(
            (res: any) => {
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
        const targetFile = (event.target.files || [])[0] as UploadFile;
        if (targetFile) {
            this.filesArray.push(targetFile);
            targetFile.uploadStatus = 'IP';
            targetFile.fileId = 0;
            this.uploadFile(targetFile).subscribe(
                (result: any) => {
                    if (result.success && result.result && result.result.id) {
                        targetFile.fileId = result.result.id;
                        targetFile.uploadStatus = 'DONE';
                        this.toastrService.success('File uploaded successfully');
                    } else {
                        targetFile.uploadStatus = 'FAIL';
                        targetFile.fileId = 0;
                        this.toastrService.error('Error while uploading the file');
                    }
                },
                (err) => {
                    targetFile.uploadStatus = 'FAIL';
                    targetFile.fileId = 0;
                },
            );
        }
    }

    uploadFile(file: UploadFile): Observable<Object> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        formData.append('file_module', 'Dispute');
        formData.append('api_call', '/ro/' + this.roasterID + '/file-manager/files');
        formData.append('token', this.authService.token);
        return this.roasterService.uploadFiles(formData);
    }

    attachFiles() {
        const fileID = this.filesArray.map((file) => file.fileId).filter((id) => !!id);
        if (fileID.length) {
            const objData = { file_ids: fileID };
            return this.roasterService.addFileIDDispute(this.roasterID, this.disputeID, objData).pipe(
                map((res: any) => {
                    if (!res.success) {
                        throw new Error('Failed to attach files');
                    }
                }),
            );
        } else {
            const sub = new Subject();
            sub.complete();
            return sub;
        }
    }

    redirectOrderChat() {
        this.toastrService.success('Successfully raised a ticket');
        const navigationExtras: NavigationExtras = {
            queryParams: {
                disputeID: this.disputeID,
                orderType: this.orgType ? this.orgType : undefined,
            },
        };
        this.router.navigate(['/dispute-system/order-chat', this.orderId], navigationExtras);
    }
    removeFile(index: number) {
        this.filesArray.splice(index, 1);
    }
}
