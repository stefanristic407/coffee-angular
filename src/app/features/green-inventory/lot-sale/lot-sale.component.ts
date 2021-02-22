import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '@services';
import { SharedServiceService } from '@app/shared/services/shared-service.service';

@Component({
    selector: 'app-lot-sale',
    templateUrl: './lot-sale.component.html',
    styleUrls: ['./lot-sale.component.scss'],
})
export class LotSaleComponent implements OnInit {
    // tslint:disable: variable-name
    appLanguage?: any;
    lotSaleActive: any = 0;
    roaster_id: any = '';
    orderDetails: any;
    orderID: any = '';
    showDropdown = false;
    order_status = 'IN_STOCK';
    status_label = '';
    saleDetailsPresent = false;
    readOnlyMode = false;
    breadItems: any = [];
    quantityUnitArray: any = [];
    lotSaleForm: FormGroup;
    priceTypeArray: any = [];
    vatDetailsArray: any = [];
    stockTypeArray: any = [];
    availablityName: any;
    tableColumns = [];
    tableValue = [];
    popupDisplay = false;
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
        this.roaster_id = this.cookieService.get('roaster_id');
        this.orderID = decodeURIComponent(this.route.snapshot.queryParams.orderId);
        this.lotSaleForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            price_per_unit: ['', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required])],
            quantity_type: ['', Validators.compose([Validators.required])],
            quantity_count: ['', Validators.compose([Validators.required])],
            quantity_unit: ['', Validators.compose([Validators.required])],
            minimum_order_quantity_count: ['', Validators.compose([Validators.required])],
            vat_settings_id: ['', Validators.compose([Validators.required])],
            status: ['', Validators.compose([Validators.required])],
        });
        this.quantityUnitArray = [
            { label: 'Bags', value: 'Bags' },
            { label: 'Kg', value: 'Kg' },
        ];
        this.priceTypeArray = [
            { label: 'Per kg', value: 'kg' },
            { label: 'per bags', value: 'Bags' },
        ];
        this.stockTypeArray = [
            { label: 'In stock', value: 'IN_STOCK' },
            { label: 'Sold', value: 'SOLD' },
            { label: 'Hidden', value: 'HIDDEN' },
        ];
    }

    public refreshData() {
        this.breadItems = [
            { label: 'Home', routerLink: '/roaster-dashboard' },
            { label: 'Inventory' },
            { label: 'Green coffee management', routerLink: '/features/green-coffee-inventory' },
            { label: 'Marked for sale' },
            { label: this.availablityName ? this.availablityName : '' },
        ];
    }

    ngOnInit(): void {
        this.language();
        this.getProcuredOrderDetails();
        this.getSaleOrderDetails();
        this.getRoasterVatDetails();
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.tableColumns = [
            {
                field: 'lot_id',
                header: this.globals.languageJson?.lot_id,
                sortable: false,
                width: 15,
            },
            {
                field: 'estate_name',
                header: this.globals.languageJson?.estate,
                width: 15,
            },
            {
                field: 'order_reference',
                header: this.globals.languageJson?.roaster_ref_no,
                sortable: false,
                width: 15,
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
    getSaleOrderDetails() {
        this.roasterService.getMarkForSaleDetails(this.roaster_id, this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    const lotDetails = response.result;
                    const lotFields = [
                        'name',
                        'quantity',
                        'quantity_count',
                        'quantity_type',
                        'quantity_unit',
                        'minimum_order_quantity_count',
                        'vat_settings_id',
                        'price',
                        'price_per_unit',
                        'status',
                    ];
                    lotFields.forEach((ele) => {
                        const getValue = lotDetails[ele];
                        this.lotSaleForm.controls[ele].setValue(getValue);
                    });
                    this.readOnlyMode = lotDetails && lotDetails.status === 'SOLD' ? true : false;
                    this.order_status = response.result.status;
                    this.availablityName = lotDetails.name;
                    this.status_label = this.formatStatus(this.order_status);
                    this.refreshData();
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
    getProcuredOrderDetails() {
        this.roasterService.getProcuredCoffeeDetails(this.roaster_id, this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    this.tableValue.push(this.orderDetails);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    updateMarkForSale(productObj) {
        this.roasterService.updateMarkForSale(this.roaster_id, this.orderID, productObj).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toasterService.success('Details updated successfully');
                    this.router.navigate(['/features/green-coffee-inventory']);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }
    updateStatus() {
        const status = { status: this.order_status };
        this.roasterService.updateMarkForSaleStatus(this.roaster_id, this.orderID, status).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toasterService.success('Status updated successfully');
                    this.showDropdown = false;
                    this.status_label = this.formatStatus(this.order_status);
                }
            },
            (err) => {
                this.toasterService.error('Error while updating status');
                console.log(err);
            },
        );
    }
    validateForms() {
        let returnFlag = true;
        if (!this.lotSaleForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        return returnFlag;
    }
    onSave(): void {
        if (this.validateForms()) {
            const productObj = this.lotSaleForm.value;
            this.updateMarkForSale(productObj);
        } else {
            this.lotSaleForm.markAllAsTouched();
            this.toasterService.error('Please fill all Data');
        }
    }
    onCancel() {
        this.router.navigate([`/features/green-coffee-for-sale-details/${this.orderID}`]);
    }
    deleteProductFromList() {
        this.roasterService.deleteProcuredCoffee(this.roaster_id, this.orderID).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toasterService.success('Product deleted successfully');
                    this.router.navigate(['/features/green-coffee-inventory']);
                }
            },
            (err) => {
                this.toasterService.error('Error while deleting the ');
                console.log(err);
            },
        );
    }
    getRoasterVatDetails() {
        this.userService.getRoasterVatDetails(this.roaster_id, 'mr').subscribe((response) => {
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
}
