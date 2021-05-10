import { AfterViewInit, Component, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoasterserviceService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { dataTool } from 'echarts';

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
    typeOfCustomer: any;
    weightTypeArray: { label: string; value: string }[];
    hrcId: any;
    orderDetails: any;
    outtakeOrderId: any;
    selectedOrderId = '';
    selectedOrderType: any;
    coffeeExperienceLink: any;
    customerDetails: any;
    remainingTotalQuantity: any;
    order: any;
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
            order_created_by: [''],
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
            this.getOrderDetails();
            this.getCustomerDetails();
            this.getCoffeeStory();
        }
    }

    getOrderDetails() {
        this.roasterService.getViewOrderDetails(this.roasterId, this.selectedOrderId).subscribe((res) => {
            this.orderDetails = res.result;
            this.remainingTotalQuantity = this.orderDetails.remaining_total_quantity;
        });
    }
    getCustomerDetails() {
        this.customerDetails = [];
        if (this.addOrdersForm.get('customer_type').value === 'mr') {
            this.roasterService.getViewCustomerMicroRoastersDetails(this.roasterId).subscribe((res) => {
                this.customerDetails = res.result;
            });
        } else if (this.addOrdersForm.get('customer_type').value === 'hrc') {
            this.roasterService.getViewCustomerPartnerDetails(this.roasterId).subscribe((res) => {
                this.customerDetails = res.result;
            });
        }
    }
    getCoffeeStory() {
        this.userService.getCoffeeStory(this.roasterId, this.selectedOrderId, 'mr-orders').subscribe((res: any) => {
            if (res.success) {
                this.coffeeExperienceLink = res.result;
            }
        });
    }

    getOrder() {
        this.selectedOrderId = this.outtakeOrderId;
        this.roasterService.getViewOrder(this.roasterId, this.outtakeOrderId).subscribe((res) => {
            if (res.success) {
                res.result.order_date = new Date(res.result.order_date);
                res.result.roasted_date = new Date(res.result.roasted_date);
                this.addOrdersForm.patchValue(res.result);
            }
        });
    }

    selectOrder(event) {
        this.selectedOrderId = event.orderId;
        this.selectedOrderType = event.orderType;
        this.addOrdersForm.get('order_id').setValue('#' + this.selectedOrderId);
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
