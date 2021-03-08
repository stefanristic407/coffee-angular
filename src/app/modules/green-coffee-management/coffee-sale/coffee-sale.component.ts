import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserserviceService } from '@services';
import { SharedServiceService } from '@app/shared/services/shared-service.service';

@Component({
    selector: 'app-coffee-sale',
    templateUrl: './coffee-sale.component.html',
    styleUrls: ['./coffee-sale.component.scss'],
})
export class CoffeeSaleComponent implements OnInit {
    appLanguage?: any;
    lotSaleActive: any = 0;
    roasterID: any = '';
    orderDetails: any;
    orderID: any = '';
    showDropdown = false;
    statusLabel = 'In stock';
    breadItems: any = [];
    quantityUnitArray: any = [];
    coffeeSaleForm: FormGroup;
    priceTypeArray: any = [];
    stockTypeArray: any = [];
    vatDetailsArray: any = [];
    weightTypeArray: any = [];
    tableColumns = [];
    tableValue = [];
    remaining: any;
    quantityType: string;
    constructor(
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        private toasterService: ToastrService,
        private fb: FormBuilder,
        private userService: UserserviceService,
        public sharedService: SharedServiceService,
    ) {
        this.roasterID = this.cookieService.get('roaster_id');
        this.orderID = decodeURIComponent(this.route.snapshot.queryParams.orderId);
        this.breadItems = [
            { label: 'Home', routerLink: '/roaster-dashboard' },
            { label: 'Inventory' },
            { label: 'Green coffee management', routerLink: '/green-coffee-management/green-coffee-inventory' },
            { label: 'Procured coffee', routerLink: `/green-coffee-management/procured-coffee/${this.orderID}` },
            { label: `Order #${this.orderID}` },
        ];
        this.quantityUnitArray = [
            { label: 'Bags', value: 'bags' },
            { label: 'Kg', value: 'kg' },
        ];
        this.priceTypeArray = [
            { label: 'Per kg', value: 'kg' },
            { label: 'per lb', value: 'lb' },
        ];
        this.stockTypeArray = [
            { label: 'In stock', value: 'IN_STOCK' },
            { label: 'Sold', value: 'SOLD' },
            { label: 'Hidden', value: 'HIDDEN' },
        ];
        this.weightTypeArray = [
            { label: 'kg', value: 'kg' },
            { label: 'lb', value: 'lb' },
            { label: 'tonnes', value: 'tonnes' },
        ];
        this.coffeeSaleForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            price_per_unit: ['kg', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required])],
            quantity_type: ['bags', Validators.compose([Validators.required])],
            quantity_count: ['', Validators.compose([Validators.required])],
            quantity_unit: ['kg', Validators.compose([Validators.required])],
            minimum_purchase_quantity: ['', Validators.compose([Validators.required])],
            vat_settings_id: ['', Validators.compose([Validators.required])],
            status: ['IN_STOCK', Validators.compose([Validators.required])],
        });
    }
    ngOnInit(): void {
        this.language();
        this.getProcuredOrderDetails();
        this.getRoasterVatDetails();
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.tableColumns = [
            {
                field: 'lot_id',
                header: this.globals.languageJson?.lot_id,
                sortable: false,
                width: 10,
            },
            {
                field: 'estate_name',
                header: this.globals.languageJson?.estate,
                width: 25,
            },
            {
                field: 'order_reference',
                header: this.globals.languageJson?.roaster_ref_no,
                sortable: false,
                width: 20,
            },
            {
                field: 'origin',
                header: this.globals.languageJson?.origin,
                sortable: false,
                width: 15,
            },
            {
                field: 'species',
                header: this.globals.languageJson?.species,
                sortable: false,
                width: 15,
            },
            {
                field: 'varieties',
                header: this.globals.languageJson?.variety,
                sortable: false,
                width: 15,
            },
            {
                field: 'price',
                header: this.globals.languageJson?.buying_price,
                sortable: false,
                width: 15,
            },
            {
                field: 'cup_score',
                header: this.globals.languageJson?.cupping_score,
                sortable: false,
                width: 15,
            },
            {
                field: 'quantity',
                header: this.globals.languageJson?.stock_in_hand,
                sortable: false,
                width: 15,
            },
        ];
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.lotSaleActive++;
    }
    getProcuredOrderDetails() {
        this.roasterService.getProcuredCoffeeDetails(this.roasterID, this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    this.tableValue.push(this.orderDetails);
                    const remaining = this.orderDetails?.quantity_count;
                    this.remaining = `${remaining} Bags`;
                }
            },
            (err) => {
                console.log(err);
                this.toasterService.error('Error while getting the procured coffee details');
            },
        );
    }
    getRoasterVatDetails() {
        this.userService.getRoasterVatDetails(this.roasterID, 'mr').subscribe((response) => {
            if (response.success && response.result) {
                const vatArray = response.result;
                vatArray.forEach((element) => {
                    const pushObj = {
                        label: `${element.vat_percentage}% ${element.transaction_type}`,
                        value: element.id,
                    };
                    this.vatDetailsArray.push(pushObj);
                });
            }
        });
    }
    createMarkForSale(productObj) {
        this.roasterService.CreateMarkForSale(this.roasterID, this.orderID, productObj).subscribe(
            (response) => {
                console.log(response);
                if (response && response.success) {
                    this.toasterService.success('Successfully marked the sale');
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            markSale: 'yes',
                        },
                    };
                    this.router.navigate(['/green-coffee-management/green-coffee-inventory'], navigationExtras);
                }
                if (
                    response &&
                    !response.success &&
                    response.messages &&
                    response.messages.sale_data &&
                    response.messages.sale_data[0]
                ) {
                    this.toasterService.error('Sale data already exists.');
                } else {
                    this.toasterService.error('Error while updating mark for sale');
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    updateStatus() {
        const status = { status: this.coffeeSaleForm.value.status };
        this.roasterService.updateMarkForSaleStatus(this.roasterID, this.orderID, status).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toasterService.success('Status updated successfully');
                    this.statusLabel = this.formatStatus(status.status);
                    this.showDropdown = false;
                } else if (!response.success && response.messages.status === 'cannot_change') {
                    this.toasterService.error('Status cannot be changed');
                } else {
                    this.toasterService.error('Error while changing the status');
                }
            },
            (err) => {
                this.toasterService.error('Error while updating status');
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
    quantityTypeChange() {
        this.quantityType = this.coffeeSaleForm.value.quantity_type;
        console.log(this);
    }
    validateForms() {
        let returnFlag = true;
        if (!this.coffeeSaleForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        return returnFlag;
    }
    onSave(): void {
        console.log(this.coffeeSaleForm.value);
        if (this.validateForms()) {
            const productObj = this.coffeeSaleForm.value;
            this.createMarkForSale(productObj);
        } else {
            this.coffeeSaleForm.markAllAsTouched();

            this.toasterService.error('Please fill all Data');
        }
    }
    onCancel() {
        this.router.navigate([`/green-coffee-management/procured-coffee/${this.orderID}`]);
    }
    changeQuantity() {
        if (this.quantityType === 'kg') {
            const remaining =
                this.orderDetails.quantity_count * this.orderDetails.quantity -
                this.coffeeSaleForm.value.quantity_count;
            this.remaining = `${remaining} kg`;
            if (remaining < 0) {
                this.toasterService.error('Please check quantity available with you');
                this.remaining = '0 kg';
            }
        } else {
            const remaining = this.orderDetails.quantity_count - this.coffeeSaleForm.value.quantity_count;
            this.remaining = `${remaining} bags`;
            if (remaining < 0) {
                this.toasterService.error('Please check quantity available with you');
                this.remaining = '0 bags';
            }
        }
    }
}
