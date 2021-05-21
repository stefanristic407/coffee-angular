import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadService, RoasterserviceService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@app/shared';
import { Download } from '@models';

@Component({
    selector: 'app-add-new-order',
    templateUrl: './add-new-order.component.html',
    styleUrls: ['./add-new-order.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddNewOrderComponent implements OnInit {
    roasterId: any;
    showOrderPanel = false;
    showCustomerPanel = false;
    selectedType: string;
    breadItems = [
        { label: 'Home', routerLink: '/dashboard' },
        { label: 'Order Management', routerLink: '/outtake-orders' },
        { label: 'Outtake Order', routerLink: '/outtake-orders' },
        { label: 'Add a new order' },
    ];
    customerTypeArray: any = [];
    roasterLableypeArray: any = [];
    preCleaned: any = [];
    addOrdersForm: FormGroup;
    weightTypeArray = [];
    rating: any;
    orderDetails: any;
    outtakeOrderId: any;
    coffeeExperienceLink: any;
    customerDetails: any;
    remainingTotalQuantity: any;
    customerType: any;
    outtakeOrderDetails: any;
    vatField: any;
    currentDate = new Date();
    userID: any;
    customerID: any;
    salesMember: string;
    userDetails: any;

    constructor(
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private fb: FormBuilder,
        public location: Location,
        private userService: UserserviceService,
        private toaster: ToastrService,
        private activeRoute: ActivatedRoute,
        public downloadService: DownloadService,
        public dialogSrv: DialogService,
        private router: Router,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.outtakeOrderId = this.activeRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.customerTypeArray = [
            { label: 'Partner', value: 'hrc' },
            { label: 'Micro Roaster', value: 'mr' },
        ];
        this.roasterLableypeArray = [
            { label: 'Light', value: 'light' },
            { label: 'Light Medium', value: 'light-medium' },
            { label: 'Medium', value: 'medium' },
            { label: 'Medium Dark', value: 'medium-dark' },
            { label: 'Dark', value: 'dark' },
        ];
        this.preCleaned = [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
        ];
        this.weightTypeArray = [
            { label: 'kg', value: 'kg' },
            { label: 'lb', value: 'lb' },
        ];
        this.addOrdersForm = this.fb.group({
            product_name: ['', [Validators.required]],
            order_date: ['', [Validators.required]],
            order_id: ['', [Validators.required]],
            roaster_ref_no: [''],
            company_type: [''],
            created_by: [''],
            sales_member_id: ['', [Validators.required]],
            customer_id: ['', [Validators.required]],
            customer_type: ['', [Validators.required]],
            gc_total_quantity: ['', [this.remainingQuantity.bind(this)]],
            gc_total_quantity_unit: ['kg'],
            total_price: [''],
            total_price_currency: [],
            unit_price: [''],
            unit_currency: [''],
            quantity_unit: [''],
            roasted_coffee_total_quantity: [''],
            roasted_coffee_total_quantity_unit: ['kg'],
            pre_cleaned: [true],
            roasted_date: [''],
            roast_level: [''],
            roasting_time: [''],
            roasting_temperature: [''],
            machine_used: [''],
        });
        if (this.outtakeOrderId) {
            this.getOrder();
        }
        this.getUserDetails();
    }

    remainingQuantity(control: AbstractControl) {
        if (control.value) {
            this.remainingTotalQuantity = this.orderDetails?.remaining_total_quantity - control.value;
        }
    }

    getOrderDetails() {
        this.roasterService
            .getViewOrderDetails(this.roasterId, this.addOrdersForm.get('order_id').value)
            .subscribe((res) => {
                this.orderDetails = res.result;
                this.addOrdersForm.get('roaster_ref_no').setValue(this.orderDetails?.order_reference);
                this.addOrdersForm.get('roaster_ref_no').disable();
                this.getRatingData(this.orderDetails?.estate_id);
                this.remainingTotalQuantity = this.orderDetails.remaining_total_quantity;
            });
    }

    getCustomerDetails(event?) {
        this.addOrdersForm.get('customer_id').setValue('');
        if (this.addOrdersForm.get('customer_type').value || this.outtakeOrderDetails.customer_type) {
            if ((this.addOrdersForm.get('customer_type').value || this.outtakeOrderDetails.customer_type) === 'mr') {
                this.customerType = 'micro-roasters';
            } else {
                this.customerType = 'hrc';
            }
            this.roasterService
                .getCustomerDetails(this.roasterId, this.customerType, this.customerID)
                .subscribe((res) => {
                    if (res.success) {
                        this.customerDetails = res.result;
                        this.addOrdersForm.get('customer_id').setValue(this.customerDetails.name);
                        this.addOrdersForm.get('company_type').setValue(this.customerDetails.company_type);
                    }
                });
        }
    }

    getCoffeeStory() {
        this.userService.getOuttakeCoffeeStory(this.roasterId, this.outtakeOrderId).subscribe((res: any) => {
            if (res.success) {
                this.coffeeExperienceLink = res.result;
            }
        });
    }

    getRatingData(value: any) {
        this.userService.getAvailableEstateList(this.roasterId, value).subscribe((data) => {
            if (data.success) {
                this.rating = data.result.rating;
            } else {
                this.rating = 0.0;
            }
        });
    }

    getUserDetails() {
        this.roasterService.getUserDetails(this.roasterId).subscribe((res: any) => {
            this.userDetails = res.result;
            this.userDetails = this.userDetails.map((item) => {
                const userName = 'userName';
                item[userName] = item.firstname.concat(' ', item.lastname);
                return item;
            });
        });
    }

    getSalesMember() {
        this.roasterService
            .getsalesMemberDetails(this.roasterId, this.outtakeOrderDetails.sales_member_id)
            .subscribe((res: any) => {
                this.salesMember = res.result;
                this.addOrdersForm.get('sales_member_id').setValue(res.result.firstname + ' ' + res.result.lastname);
                this.addOrdersForm.get('created_by').setValue(res.result.firstname + ' ' + res.result.lastname);
            });
    }

    getOrder() {
        this.roasterService.getViewOrder(this.roasterId, this.outtakeOrderId).subscribe((res) => {
            if (res.success) {
                this.outtakeOrderDetails = res.result;
                this.customerID = this.outtakeOrderDetails.customer_id;
                this.getSalesMember();
                this.getCustomerDetails();
                this.outtakeOrderDetails.order_date = new Date(this.outtakeOrderDetails.order_date);
                this.outtakeOrderDetails.roasted_date = new Date(this.outtakeOrderDetails.roasted_date);
                this.addOrdersForm.patchValue(this.outtakeOrderDetails);
                this.getOrderDetails();
                this.getCoffeeStory();
            }
        });
    }

    selectOrder(event) {
        if (event.orderId) {
            this.addOrdersForm.get('order_id').setValue(event.orderId);
        }
        if (event.userName) {
            this.addOrdersForm.get('sales_member_id').setValue(event.userName);
            this.userID = event.userId;
        }
        if (event.createduserName) {
            this.addOrdersForm.get('created_by').setValue(event.createduserName);
            this.userID = event.userId;
        }
        if (event.customerName) {
            this.addOrdersForm.get('customer_id').setValue(event.customerName);
            this.customerID = event.customerId;
        }
        this.getOrderDetails();
        this.getCoffeeStory();
    }

    onSelectType(type) {
        if (type === 'customer-name') {
            if (this.addOrdersForm.get('customer_type').value === 'mr') {
                this.selectedType = 'micro-roasters';
            } else if (this.addOrdersForm.get('customer_type').value === 'hrc') {
                this.selectedType = 'hrc';
            }
        } else {
            this.selectedType = type;
        }
    }

    addOrderDetails() {
        const data = this.addOrdersForm.value;
        data.sales_member_id = this.userID;
        data.created_by = this.userID;
        data.customer_id = this.customerID;
        if (data.order_date) {
            const orderDate = new Date(data.order_date);
            data.order_date =
                orderDate.getFullYear() +
                '-' +
                ('0' + (orderDate.getMonth() + 1)).slice(-2) +
                '-' +
                ('0' + orderDate.getDate()).slice(-2);
        }
        const roastedDate = new Date(data.roasted_date);
        if (data.customer_type === 'hrc') {
            data.roasted_date =
                roastedDate.getFullYear() +
                '-' +
                ('0' + (roastedDate.getMonth() + 1)).slice(-2) +
                '-' +
                ('0' + roastedDate.getDate()).slice(-2);
            data.roasting_time = parseInt(data.roasting_time, 10);
        } else {
            data.roasted_date = '';
            data.roasted_coffee_total_quantity = 0;
            data.roasted_coffee_total_quantity_unit = '';
            data.roast_level = 0;
            data.roasting_time = 0;
            data.roasting_temperature = 0;
        }
        if (this.outtakeOrderId) {
            this.roasterService.updateOrderDetails(this.roasterId, this.outtakeOrderId, data).subscribe((res) => {
                if (res.success) {
                    this.router.navigateByUrl('/outtake-orders');
                    this.toaster.success('Outtake Order updated successfully');
                } else {
                    this.toaster.error('Unable to update the outtake order');
                }
            });
        } else {
            data.unit_currency = 'SEK';
            data.quantity_unit = 'kg';
            this.roasterService.addOrderDetails(this.roasterId, data).subscribe((res) => {
                if (res.success) {
                    this.router.navigateByUrl('/outtake-orders');
                    this.toaster.success('Outtake Order added successfully');
                } else {
                    this.toaster.error('Unable to add the outtake order');
                }
            });
        }
    }

    onVatField(event) {
        this.vatField = event.checked;
    }

    handleCopyCoffeeExperienceLink(): void {
        const textArea = document.createElement('textarea');
        textArea.value = this.coffeeExperienceLink.coffee_story_url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        this.toaster.success('Copied link successfully');
        textArea.remove();
    }

    onDownloadQr() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Please confirm!',
                    desp: 'Are you sure want to download',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.downloadService.imageDownload(this.coffeeExperienceLink.qr_code_url).subscribe(
                        (res: Download) => {
                            if (res.state === 'DONE') {
                                this.toaster.success('Downloaded successfully');
                            }
                        },
                        (error) => {
                            this.toaster.error('Download failed');
                        },
                    );
                }
            });
    }
}
