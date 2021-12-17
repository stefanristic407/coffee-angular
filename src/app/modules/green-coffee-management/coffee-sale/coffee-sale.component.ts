import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { ProcuredCoffeeStatus, ProcuredCoffeeUnit, QuantityUnit, VatType } from '@enums';
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
    orderDetails: any;
    orderID: any = '';
    showDropdown = false;
    statusLabel = 'In stock';
    breadItems: any = [];
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
    tableColumns = [];
    tableValue = [];
    quantityType: string;
    orderSettings: OrderSettings;
    baseCurrency = '';

    constructor(
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        private authService: AuthService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
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
        this.authService.organizationSubject.subscribe((res) => {
            this.baseCurrency = res?.base_currency;
        });
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
                field: 'id',
                header: 'gc_order_number',
                width: 14,
            },
            {
                field: 'lot_number',
                header: 'lot_id',
                width: 10,
            },
            {
                field: 'estate_name',
                header: 'estate',
                width: 14,
            },
            {
                field: 'order_reference',
                header: 'roaster_ref_no',
                width: 14,
            },
            {
                field: 'origin',
                header: 'origin',
                width: 11,
            },
            {
                field: 'varieties',
                header: 'variety',
                width: 11,
            },
            {
                field: 'unit_price',
                header: 'buying_price',
                width: 11,
            },
            {
                field: 'quantity',
                header: 'stock_in_hand',
                width: 15,
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
            minimum_order_quantity_count: [null, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required, this.quantityValidator])],
            quantity_unit: [QuantityUnit.kg, Validators.compose([Validators.required])],
            vat_settings_id: ['', Validators.compose([Validators.required])],
            status: [ProcuredCoffeeStatus.IN_STOCK, Validators.compose([Validators.required])],
            sample_quantity_count: [null, Validators.compose([Validators.min(0), this.quantityValidator])],
        });
    }

    getProcuredOrderDetails(resolve) {
        this.roasterService.getProcuredOrderDetails(this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    this.tableValue.push(this.orderDetails);
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
            if (res.success && res.result?.sample_quantity) {
                // Quantity is saved as kg
                this.orderSettings = {
                    ...res.result,
                    sample_quantity_unit: res.result.sample_quantity_unit || QuantityUnit.g,
                };
            } else {
                this.toasterService.error(this.translator.instant('first_set_sample_price'));
                setTimeout(() => {
                    this.router.navigate(['/product-setting'], { queryParams: { type: 'SAMPLE' } });
                }, 2000);
            }
            resolve();
        });
    }

    getRoasterVatDetails(resolve) {
        this.userService.getRoasterVatDetails(VatType.MR).subscribe((response) => {
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

    updateStatus() {
        this.roasterService
            .updateMarkForSaleStatus(this.orderID, { status: this.coffeeSaleForm.value.status })
            .subscribe(
                (response) => {
                    if (response && response.success) {
                        this.toasterService.success('Status updated successfully');
                        this.statusLabel = this.coffeeSaleForm.value.status;
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

    onSave(): void {
        if (!this.coffeeSaleForm.valid) {
            this.coffeeSaleForm.markAllAsTouched();
            this.toasterService.error(this.translator.instant('please_check_form_data'));
            return;
        }

        this.roasterService.createMarkForSale(this.orderID, this.coffeeSaleForm.value).subscribe(
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
