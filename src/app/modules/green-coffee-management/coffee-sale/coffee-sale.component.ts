import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { ProcuredCoffeeStatus } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, GlobalsService, ResizeService, RoasterService, UserService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-coffee-sale',
    templateUrl: './coffee-sale.component.html',
    styleUrls: ['./coffee-sale.component.scss'],
})
export class CoffeeSaleComponent extends ResizeableComponent implements OnInit {
    loaded = false;
    roasterID: any = '';
    orderDetails: any;
    orderID: any = '';
    showDropdown = false;
    statusLabel = 'In stock';
    breadItems: any = [];
    quantityUnitArray: any = [
        { label: 'Bags', value: 'bags' },
        { label: 'kg', value: 'kg' },
    ];
    coffeeSaleForm: FormGroup;
    priceTypeArray: any = [
        { label: 'Per kg', value: 'kg' },
        { label: 'per lb', value: 'lb' },
    ];
    stockTypeArray: any = [
        { label: 'In stock', value: 'IN_STOCK' },
        { label: 'Sold', value: 'SOLD' },
        { label: 'Hidden', value: 'HIDDEN' },
    ];
    vatDetailsArray: any = [];
    weightTypeArray: any = [
        { label: 'kg', value: 'kg' },
        { label: 'lb', value: 'lb' },
        { label: 'tonnes', value: 'tonnes' },
    ];
    tableColumns = [];
    tableValue = [];
    remaining: any;
    quantityType: string;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.roasterID = this.authService.getOrgId();
        this.orderID = decodeURIComponent(this.route.snapshot.queryParams.orderId);
        this.breadItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('inventory') },
            {
                label: this.translator.instant('green_coffee_inventory'),
                routerLink: '/green-coffee-management/green-coffee-inventory',
            },
            {
                label: this.translator.instant('procured_coffee'),
                routerLink: `/green-coffee-management/green-coffee-inventory`,
            },
            { label: `${this.translator.instant('order')} #${this.orderID}` },
        ];
    }

    ngOnInit(): void {
        this.initTable();
        this.initForm();
        new Promise((resolve) => this.getRoasterVatDetails(resolve)).then(() => {
            const promises = [];
            promises.push(new Promise((resolve) => this.getProcuredOrderDetails(resolve)));
            Promise.all(promises).then(() => {
                this.loaded = true;
            });
        });
        this.coffeeSaleForm.get('quantity_type').valueChanges.subscribe((value) => {
            this.coffeeSaleForm.patchValue({ quantity_type: value }, { emitEvent: false });
        });
    }

    initTable() {
        this.tableColumns = [
            {
                field: 'order_id',
                header: 'order_id',
                width: 9,
            },
            {
                field: 'lot_id',
                header: 'lot_id',
                width: 7,
            },
            {
                field: 'estate_name',
                header: 'estate',
                width: 11,
            },
            {
                field: 'order_reference',
                header: 'roaster_ref_no',
                width: 12,
            },
            {
                field: 'origin',
                header: 'origin',
                width: 9,
            },
            {
                field: 'species',
                header: 'species',
                width: 9,
            },
            {
                field: 'varieties',
                header: 'variety',
                width: 10,
            },
            {
                field: 'price',
                header: 'buying_price',
                width: 10,
            },
            {
                field: 'cup_score',
                header: 'cupping_score',
                width: 11,
            },
            {
                field: 'quantity',
                header: 'quantity_bought',
                width: 14,
            },
        ];
    }

    initForm() {
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
            status: [ProcuredCoffeeStatus.IN_STOCK, Validators.compose([Validators.required])],
        });
    }

    getProcuredOrderDetails(resolve) {
        this.roasterService.getProcuredOrderDetails(this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    this.tableValue.push(this.orderDetails);
                    const remaining = 0;
                    this.remaining = `${remaining} Bags`;
                } else {
                    this.toasterService.error('Error while getting the procured coffee details');
                    this.router.navigate(['/green-coffee-management/green-coffee-inventory']);
                }
                resolve();
            },
            (err) => {
                console.log(err);
                this.toasterService.error('Error while getting the procured coffee details');
            },
        );
    }

    getRoasterVatDetails(resolve) {
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
            resolve();
        });
    }

    goToVatManagement() {
        this.router.navigate(['/product-setting']);
    }

    createMarkForSale(productObj) {
        this.roasterService.CreateMarkForSale(this.roasterID, this.orderID, productObj).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toasterService.success('Successfully marked the sale');
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            markSale: 'yes',
                        },
                    };
                    this.router.navigate(['/green-coffee-management/green-coffee-inventory'], navigationExtras);
                } else {
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
        this.changeQuantity(this.coffeeSaleForm.value.quantity_count);
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
        this.router.navigate([`/green-coffee-management/procured-coffee/${this.orderID}`]);
    }

    changeQuantity(event) {
        if (this.quantityType === 'kg') {
            const remaining = event.value;
            this.remaining = `${remaining} kg`;
            if (this.orderDetails.quantity_count * this.orderDetails.quantity - event.value < 0) {
                this.toasterService.error('Please check quantity available with you');
                this.remaining = '0 kg';
            } else if (event.value <= 0) {
                this.remaining = '0 kg';
            }
        } else {
            const remaining = event.value;
            this.remaining = `${remaining} bags`;
            if (this.orderDetails.quantity_count - event.value < 0) {
                this.toasterService.error('Please check quantity available with you');
                this.remaining = '0 bags';
            } else if (event.value <= 0) {
                this.remaining = '0 bags';
            }
        }
    }
}
