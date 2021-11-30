import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { ProcuredCoffeeStatus, ProcuredCoffeeUnit, QuantityUnit } from '@enums';
import { OrderSettings } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ResizeService, RoasterService, UserService } from '@services';
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
    orderSettings: OrderSettings;

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
            promises.push(new Promise((resolve) => this.getOrderSettings(resolve)));
            Promise.all(promises).then(() => {
                this.coffeeSaleForm.patchValue(this.orderSettings);
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
                width: 10,
            },
            {
                field: 'varieties',
                header: 'variety',
                width: 11,
            },
            {
                field: 'price',
                header: 'buying_price',
                width: 10,
            },
            {
                field: 'quantity',
                header: 'quantity_bought',
                width: 14,
            },
            {
                field: 'remaining_total_quantity',
                header: 'remaining_quantity',
                width: 16,
            },
        ];
    }

    initForm() {
        this.coffeeSaleForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            price_per_unit: [QuantityUnit.kg, Validators.compose([Validators.required])],
            quantity_count: [null, Validators.compose([Validators.required, this.quantityValidator])],
            quantity_type: [ProcuredCoffeeUnit.bags, Validators.compose([Validators.required])],
            minimum_purchase_quantity: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required, this.quantityValidator])],
            quantity_unit: [QuantityUnit.kg, Validators.compose([Validators.required])],
            vat_settings_id: ['', Validators.compose([Validators.required])],
            status: [ProcuredCoffeeStatus.IN_STOCK, Validators.compose([Validators.required])],
            sample_quantity_count: [null, Validators.compose([Validators.required, , this.quantityValidator])],
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

    getOrderSettings(resolve) {
        this.roasterService.getOrderSettings().subscribe((res: any) => {
            if (res.success) {
                // Quantity is saved as kg
                this.orderSettings = {
                    ...res.result,
                    sample_quantity_unit: res.result.sample_quantity_unit || QuantityUnit.g,
                };
            }
            resolve();
        });
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
                    this.toasterService.success('Successfully marked coffee for sale');
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
                    this.statusLabel = status.status;
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

    checkQuantity() {
        this.coffeeSaleForm.get('quantity_count').updateValueAndValidity();
        this.coffeeSaleForm.get('quantity').updateValueAndValidity();
        this.coffeeSaleForm.get('sample_quantity_count').updateValueAndValidity();
    }

    quantityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
        if (control.errors?.required) {
            return null;
        }
        const parent = control.parent;
        if (!parent || !this.orderDetails?.remaining_total_quantity) {
            return null;
        }
        let quantityCnt = 0;
        if (
            parent.get('quantity_count') &&
            parent.get('quantity_count').value + '' &&
            parent.get('quantity') &&
            parent.get('quantity').value + ''
        ) {
            quantityCnt += parent.get('quantity_count').value * parent.get('quantity').value;
        }

        if (
            parent &&
            parent.get('sample_quantity_count') &&
            parent.get('sample_quantity_count').value + '' &&
            this.orderSettings?.sample_quantity
        ) {
            quantityCnt += parent.get('sample_quantity_count').value * this.orderSettings?.sample_quantity;
        }

        if (this.orderDetails.remaining_total_quantity - quantityCnt < 0) {
            return { availablequantity: true };
        }
        return null;
    };
}
