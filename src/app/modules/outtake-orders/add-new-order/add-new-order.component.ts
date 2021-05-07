import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoasterserviceService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

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
    typeOfCustomer = 'partner';
    weightTypeArray: { label: string; value: string }[];
    orderId = 10;
    hrcId: any;
    date3: any;
    odrerDetails: any;
    outtakeOrderId: any;
    selectedOrderId: any;
    selectedOrderType: any;
    coffeeExperienceLink: any;
    constructor(
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        private fb: FormBuilder,
        public location: Location,
        private userService: UserserviceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.customerTypeArray = [
            { label: 'Partner', value: 'partner' },
            { label: 'Micro Roaster', value: 'micro_roaster' },
        ];
        this.preCleaned = [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ];
        this.weightTypeArray = [
            { label: 'lb', value: 'lb' },
            { label: 'kg', value: 'kg' },
        ];
        this.addOrdersForm = this.fb.group({
            product_name: ['', [Validators.required]],
            order_date: [''],
            order_id: [''],
            roaster_ref_no: [''],
            typeOfCustomer: ['', [Validators.required]],
            preCleaned: [''],
            totalPrice: [''],
            weight: [''],
            weight_unit: [''],
        });
        this.getOrderDetails();
        this.getCustomerDetails();
        this.getListOrderDetails();
        this.userService.getCoffeeStory(this.roasterId, this.orderId, 'mr-orders').subscribe((res: any) => {
            if (res.success) {
                this.coffeeExperienceLink = res.result;
            }
        });
    }

    getOrderDetails() {
        this.roasterService.getViewOrderDetails(this.roasterId, 1).subscribe((res) => {
            this.odrerDetails = res.result;
        });
    }
    getCustomerDetails() {
        this.roasterService.getViewCustomerDetails(this.roasterId, 157).subscribe((res) => {
            console.log(res);
        });
    }
    getListOrderDetails() {
        this.roasterService.getListOrderDetails(this.roasterId).subscribe((res) => {
            console.log(res);
        });
    }
    customerTypeChange(event) {
        this.typeOfCustomer = event.value;
    }
    addOrderDetails() {
        const data = {
            company_type: 'office',
            customer_id: 5,
            customer_name: 'HoReCa5 - ABC',
            customer_type: 'hrc',
            gc_total_quantity: 13,
            gc_total_quantity_unit: 'kg',
            id: 30,
            order_date: '2021-05-04',
            order_id: 201,
            product_name: 'May EVEN outtake order ',
            rc_total_quantity: 6,
            rc_total_quantity_unit: 'kg',
            roaster_id: 42,
            total_price: 600,
            total_price_currency: 'SEK',
            roaster_ref_no: 43,
            order_created_by: 42,
            sales_member_id: 42,
            unit_price: 200,
            unit_currency: 'SEK',
            quantity_unit: 'kg',
            roasted_coffee_total_quantity: 200,
            roasted_coffee_total_quantity_unit: 'kg',
            pre_cleaned: true,
            roasted_date: '2020-06-11',
            roast_level: 2,
            roasting_time: 50,
            roasting_temperature: 100,
            machine_used: 'machine1, machine2',
        };
        this.roasterService.addOrderDetails(this.roasterId, data).subscribe((res) => {
            console.log(res);
        });
    }
    updateOrderDetails() {
        const data = {
            product_name: 'Prod2',
            order_date: '2020-06-11',
            order_id: 123,
            roaster_ref_no: 'ref1',
            order_created_by: 1,
            sales_member_id: 2,
            customer_type: 'hrc',
            customer_id: 2,
            unit_price: 200,
            unit_currency: 'SEK',
            quantity_unit: 'kg',
            total_price: 10000,
            total_price_currency: 'SEK',
            roasted_coffee_total_quantity: 200,
            roasted_coffee_total_quantity_unit: 'kg',
            gc_total_quantity: 200,
            gc_total_quantity_unit: 'kg',
            pre_cleaned: true,
            roasted_date: '2020-06-11',
            roast_level: 2,
            roasting_time: 50,
            roasting_temperature: 100,
            machine_used: 'machine1, machine2',
            company_type: 'office',
        };
        this.roasterService.updateOrderDetails(this.roasterId, 132, data).subscribe((res) => {
            console.log(res);
        });
    }
    selectOrder(event) {
        this.selectedOrderId = event.orderId;
        this.selectedOrderType = event.orderType;
        console.log(this.selectedOrderId);
        console.log(this.selectedOrderType);
    }
    onWeightChange(event) {}
    onWeightUnitChange() {}

    handleCopyCoffeeExperienceLink(): void {
        const textArea = document.createElement('textarea');
        textArea.value = this.coffeeExperienceLink.coffee_story_url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();
    }
}
