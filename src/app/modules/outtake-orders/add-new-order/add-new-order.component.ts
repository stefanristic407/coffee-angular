import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class AddNewOrderComponent implements OnInit, AfterViewInit {
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
    ngAfterViewInit(): void {
        this.getOrder();
    }

    ngOnInit(): void {
        this.customerTypeArray = [
            { label: 'Partner', value: 'partner' },
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
    }

    getOrderDetails() {
        this.roasterService.getViewOrderDetails(this.roasterId, this.selectedOrderId).subscribe((res) => {
            this.orderDetails = res.result;
            this.remainingTotalQuantity = this.orderDetails.remaining_total_quantity;
        });
    }
    getCustomerDetails() {
        this.roasterService.getViewCustomerDetails(this.roasterId, this.hrcId).subscribe((res) => {
            this.customerDetails = res.result;
        });
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
        this.roasterService.getOrder(this.roasterId).subscribe((res) => {
            this.order = res.result.find((ele) => {
                return (ele.order_id = this.outtakeOrderId);
            });
        });
        this.addOrdersForm.get('product_name').setValue(this.order.product_name);
        this.addOrdersForm.get('order_date').setValue(this.order.order_date);
        this.addOrdersForm.get('order_id').setValue(this.order.order_id);
        this.addOrdersForm.get('roaster_ref_no').setValue(this.order.roaster_ref_no);
        this.addOrdersForm.get('company_type').setValue(this.order.company_type);
        this.addOrdersForm.get('order_created_by').setValue(this.order.order_created_by);
        this.addOrdersForm.get('sales_member_id').setValue(this.order.sales_member_id);
        this.addOrdersForm.get('gc_total_quantity').setValue(this.order.gc_total_quantity);
        this.addOrdersForm.get('total_price').setValue(this.order.total_price);
        this.addOrdersForm.get('roasted_coffee_total_quantity').setValue(this.order.roasted_coffee_total_quantity);
        this.addOrdersForm.get('pre_cleaned').setValue(this.order.pre_cleaned);
        this.addOrdersForm.get('roaster_id').setValue(this.order.roaster_id);
        this.addOrdersForm.get('roast_level').setValue(this.order.roast_level);
        this.addOrdersForm.get('roasted_date').setValue(this.order.roasted_date);
        this.addOrdersForm.get('roasting_time').setValue(this.order.roasting_time);
        this.addOrdersForm.get('roasting_temperature').setValue(this.order.roasting_temperature);
        this.addOrdersForm.get('machine_used').setValue(this.order.machine_used);
        this.getOrderDetails();
        this.getCustomerDetails();
        this.getCoffeeStory();
    }
    selectOrder(event) {
        this.selectedOrderId = event.orderId;
        this.selectedOrderType = event.orderType;
        this.addOrdersForm.get('order_id').setValue('#' + this.selectedOrderId);
        this.getOrderDetails();
        this.getCustomerDetails();
        this.getCoffeeStory();
    }
    customerTypeChange(event) {
        this.typeOfCustomer = event.value;
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
            this.remainingTotalQuantity = this.orderDetails.remaining_total_quantity - control.value;
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
