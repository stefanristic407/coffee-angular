import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoasterserviceService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-new-order',
    templateUrl: './add-new-order.component.html',
    styleUrls: ['./add-new-order.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddNewOrderComponent implements OnInit {
    roasterId: any;
    showOrderPanel = false;
    breadItems = [
        { label: 'Home', routerLink: '/dashboard' },
        { label: 'Order Management', routerLink: '/outtake-orders' },
        { label: 'Outtake Order', routerLink: '/outtake-orders' },
        { label: 'Add a new order' },
    ];
    customerTypeArray: any = [];
    preCleaned: any = [];
    addOrdersForm: FormGroup;
    weightTypeArray: { label: string; value: string }[];
    orderDetails: any;
    outtakeOrderId: any;
    coffeeExperienceLink: any;
    customerDetails: any;
    remainingTotalQuantity: any;
    customerType: any;
    userDetails: any;
    customersDetails: any;

    constructor(
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private fb: FormBuilder,
        public location: Location,
        private userService: UserserviceService,
        private toaster: ToastrService,
        private activeRoute: ActivatedRoute,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.outtakeOrderId = this.activeRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.customerTypeArray = [
            { label: 'Partner', value: 'hrc' },
            { label: 'Micro Roaster', value: 'mr' },
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
            weight: [''],
            weight_unit: [''],
            customer_id: [''],
            customer_name: ['', [Validators.required]],
            customer_type: ['', [Validators.required]],
            gc_total_quantity: ['', [this.remainingQuantity.bind(this)]],
            gc_total_quantity_unit: [''],
            rc_total_quantity: [''],
            rc_total_quantity_unit: [''],
            total_price: [''],
            total_price_currency: [''],
            unit_price: [''],
            unit_currency: [''],
            quantity_unit: [''],
            roasted_coffee_total_quantity: [''],
            roasted_coffee_total_quantity_unit: [''],
            pre_cleaned: [''],
            roaster_id: [''],
            roasted_date: [''],
            roast_level: [''],
            roasting_time: [''],
            roasting_temperature: [''],
            machine_used: [''],
            waste_produced: [''],
        });
        if (this.outtakeOrderId) {
            this.getOrder();
        }
        this.getUserDetails();
    }

    getOrderDetails() {
        this.roasterService
            .getViewOrderDetails(this.roasterId, this.addOrdersForm.get('order_id').value)
            .subscribe((res) => {
                this.orderDetails = res.result;
                this.remainingTotalQuantity = this.orderDetails.remaining_total_quantity;
            });
    }

    getCustomerDetails() {
        this.customerDetails = [];
        if (this.addOrdersForm.get('customer_type').value) {
            if (this.addOrdersForm.get('customer_type').value === 'mr') {
                this.customerType = 'micro-roasters';
            } else if (this.addOrdersForm.get('customer_type').value === 'hrc') {
                this.customerType = 'hrc';
            }
            this.roasterService.getCustomerDetails(this.roasterId, this.customerType).subscribe((res) => {
                if (res.success) {
                    this.customersDetails = res.result;
                    if (this.outtakeOrderId) {
                        this.roasterService
                            .getSingleCustomerDetails(
                                this.roasterId,
                                this.customerType,
                                this.addOrdersForm.get('customer_id').value,
                            )
                            .subscribe((rep) => {
                                this.customerDetails = rep.result;
                                if (rep.success) {
                                    this.addOrdersForm.get('customer_name').setValue(rep.result.customer_id);
                                }
                            });
                    }
                }
            });
        }
    }

    getCoffeeStory() {
        this.userService
            .getCoffeeStory(this.roasterId, this.addOrdersForm.get('order_id').value, 'orders')
            .subscribe((res: any) => {
                if (res.success) {
                    this.coffeeExperienceLink = res.result;
                }
            });
    }

    getUserDetails() {
        this.roasterService.getUserDetails(this.roasterId).subscribe((res) => {
            this.userDetails = res.result;
        });
    }

    getOrder() {
        this.roasterService.getViewOrder(this.roasterId, this.outtakeOrderId).subscribe((res) => {
            if (res.success) {
                res.result.order_date = new Date(res.result.order_date);
                res.result.roasted_date = new Date(res.result.roasted_date);
                this.addOrdersForm.patchValue(res.result);
                this.getCustomerDetails();
                this.getOrderDetails();
                this.getCoffeeStory();
            }
        });
    }

    selectOrder(event) {
        this.addOrdersForm.get('order_id').setValue(event.orderId);
        this.getOrderDetails();
        this.getCoffeeStory();
    }

    addOrderDetails() {
        const data = this.addOrdersForm.value;
        this.roasterService.addOrderDetails(this.roasterId, data).subscribe((res) => {
            if (res.success) {
                this.toaster.success('Outtake Order added successfully');
            } else {
                this.toaster.error('Unable to add the outtake order');
            }
        });
    }

    updateOrderDetails() {
        const data = this.addOrdersForm.value;
        this.roasterService.updateOrderDetails(this.roasterId, this.outtakeOrderId, data).subscribe((res) => {
            if (res.success) {
                this.toaster.success('Outtake Order updated successfully');
            } else {
                this.toaster.error('Unable to update the outtake order');
            }
        });
    }

    remainingQuantity(control: AbstractControl) {
        if (control.value) {
            this.remainingTotalQuantity = this.orderDetails?.remaining_total_quantity - control.value;
        }
    }

    handleCopyCoffeeExperienceLink(): void {
        const textArea = document.createElement('textarea');
        textArea.value = this.coffeeExperienceLink.coffee_story_url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();
    }
}
