import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
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
    // tslint:disable: variable-name
    appLanguage?: any;
    lotSaleActive: any = 0;
    roaster_id: any = '';
    orderDetails: any;
    orderID: any = '';
    showDropdown = false;
    status_label = 'In stock';
    breadItems: any = [];
    quantityUnitArray: any = [];
    coffeeSaleForm: FormGroup;
    priceTypeArray: any = [];
    stockTypeArray: any = [];
    vatDetailsArray: any = [];
    roasterID: any = '';
    tableColumns = [];
    tableValue = [];
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
        this.breadItems = [
            { label: 'Home', routerLink: '/roaster-dashboard' },
            { label: 'Inventory' },
            { label: 'Green coffee management', routerLink: '/features/green-coffee-inventory' },
            { label: 'Procured coffee', routerLink: `/features/procured-coffee/${this.orderID}` },
            { label: `Order #${this.orderID}` },
        ];
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
        this.coffeeSaleForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            price_per_unit: ['', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required])],
            quantity_type: ['', Validators.compose([Validators.required])],
            quantity_count: ['', Validators.compose([Validators.required])],
            quantity_unit: ['', Validators.compose([Validators.required])],
            minimum_purchase_quantity: ['', Validators.compose([Validators.required])],
            vat_settings_id: ['', Validators.compose([Validators.required])],
            status: ['', Validators.compose([Validators.required])],
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
                this.toasterService.error('Error while getting the procured coffee details');
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
    createMarkForSale(productObj) {
        this.roasterService.CreateMarkForSale(this.roaster_id, this.orderID, productObj).subscribe(
            (response) => {
                console.log(response);
                if (response && response.success) {
                    this.toasterService.success('Successfully marked the sale');
                    this.router.navigate(['/features/green-coffee-inventory']);
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
    validateForms() {
        let returnFlag = true;
        if (!this.coffeeSaleForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        return returnFlag;
    }
    onSave(): void {
        if (this.validateForms()) {
            const productObj = this.coffeeSaleForm.value;
            this.createMarkForSale(productObj);
        } else {
            this.coffeeSaleForm.markAllAsTouched();

            this.toasterService.error('Please fill all Data');
        }
    }
    onCancel() {
        this.router.navigate([`/features/procured-coffee/${this.orderID}`]);
    }
}
