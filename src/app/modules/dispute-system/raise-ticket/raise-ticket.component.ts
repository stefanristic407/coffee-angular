import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GlobalsService, RoasterserviceService } from '@services';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
    orderType: any;
    orderDetails: any;
    roasterID: any;
    filesArray = [];
    disputeID: string;
    constructor(
        public globals: GlobalsService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.roasterID = this.cookieService.get('roaster_id');
        this.route.params.subscribe((params) => {
            this.orderID = params.orderId ? params.orderId : '';
            this.getOrderDetails();
        });
        this.supplyBreadCrumb();
        this.ticketForm = this.fb.group({
            orderID: [{ value: this.orderID, disabled: true }, Validators.compose([Validators.required])],
            dispute_type: ['', Validators.compose([Validators.required])],
            dispute_reason: [''],
            description: ['', Validators.compose([Validators.required])],
            solution: [''],
            images: [],
        });
        this.helpTextArray = [
            { label: 'Payment', value: 'Payment' },
            { label: 'Order', value: 'Order' },
            { label: 'Test', value: 'Test' },
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
        this.roasterService.getViewOrderDetails(this.roasterID, this.orderID, this.orderType).subscribe(
            (res: any) => {
                if (res.success && res.result) {
                    this.orderDetails = res.result;
                    if (this.orderDetails.status) {
                        this.orderDetails.status = this.formatStatus(this.orderDetails.status);
                    }
                    if (this.orderDetails.order_type) {
                        this.orderDetails.order_type = this.formatStatus(this.orderDetails.order_type);
                    }
                    if (this.orderType === 'MR') {
                        if (this.orderDetails.type) {
                            this.orderDetails.order_type = this.formatStatus(this.orderDetails.type);
                        }
                        this.orderDetails.price = this.orderDetails.total_price ? this.orderDetails.total_price : 'NA';
                    }
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    formatStatus(stringVal) {
        let formatVal = '';
        if (stringVal) {
            formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
            formatVal = formatVal.replace('_', ' ');
        }
        return formatVal.replace('-', '');
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/features/welcome-aboard',
        };
        const obj2: MenuItem = {
            label: 'Order Management',
            routerLink: 'ordermanagement/estate-orders',
        };
        const obj3: MenuItem = {
            label: 'Estate Orders',
            routerLink: 'ordermanagement/estate-orders',
        };
        const obj4: MenuItem = {
            label: 'Order ' + this.orderID,
            routerLink: '/ordermanagement/order-booked',
        };
        const obj5: MenuItem = {
            label: 'Order Support',
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
        this.breadCrumbItem.push(obj4);
        this.breadCrumbItem.push(obj5);
    }
    submitTicket() {
        if (this.ticketForm.valid) {
            const obj = this.ticketForm.value;
            this.roasterService.raiseTicket(this.roasterID, this.orderID, obj, this.orderType).subscribe(
                (res: any) => {
                    console.log(res);
                    if (res && res.success) {
                        this.disputeID = res.result.id;
                        if (this.filesArray && this.filesArray.length > 0) {
                            this.uploadFile();
                        } else {
                            this.redirectOrderChat();
                        }
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
        formData.append('token', this.cookieService.get('Auth'));
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
                orderType: this.orderType ? this.orderType : undefined,
            },
        };
        this.router.navigate(['/dispute-system/order-chat', this.orderID], navigationExtras);
    }
}
