import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { ProcuredCoffeeStatus, ProcuredCoffeeUnit, QuantityUnit } from '@enums';
import { ApiResponse, ProcuredCoffee } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, ResizeService, RoasterService, UserService } from '@services';
import { ConfirmComponent } from '@shared';
import { convertKg } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-lot-sale',
    templateUrl: './lot-sale.component.html',
    styleUrls: ['./lot-sale.component.scss'],
})
export class LotSaleComponent extends ResizeableComponent implements OnInit {
    loaded = false;
    roasterID: any = '';
    orderDetails: any;
    orderID: number;
    soldQuantity = 0;
    showDropdown = false;
    statusLabel = '';
    saleDetailsPresent = false;
    readOnlyMode = false;
    breadItems: any = [];
    priceTypeArray: any = [
        { label: 'Per kg', value: QuantityUnit.kg },
        { label: 'per lb', value: QuantityUnit.lb },
    ];
    vatDetailsArray: any = [];
    stockTypeArray: any = [
        { label: 'In stock', value: ProcuredCoffeeStatus.IN_STOCK },
        { label: 'Sold', value: ProcuredCoffeeStatus.SOLD },
        { label: 'Hidden', value: ProcuredCoffeeStatus.HIDDEN },
    ];
    lotSaleForm: FormGroup;
    availablityName: any;
    tableColumns = [];
    tableValue = [];
    soldQuantitySample = 0;
    coffeeDetails: ProcuredCoffee;
    remainingTotalQuantity;

    constructor(
        private authService: AuthService,
        private dialogService: DialogService,
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
        this.orderID = +decodeURIComponent(this.route.snapshot.queryParams.orderId);
    }

    ngOnInit(): void {
        this.initTable();
        this.initForm();
        new Promise((resolve) => this.getRoasterVatDetails(resolve)).then(() => {
            const promises = [];
            promises.push(new Promise((resolve) => this.getProcuredOrderDetails(resolve)));
            promises.push(new Promise((resolve) => this.getSaleOrderDetails(resolve)));
            Promise.all(promises).then(() => {
                this.loaded = true;
                this.remainingTotalQuantity =
                    this.orderDetails.remaining_total_quantity +
                    this.coffeeDetails.initial_quantity_count * this.coffeeDetails.quantity +
                    this.coffeeDetails.sample_initial_quantity_count * this.coffeeDetails.sample_quantity;
            });
        });
    }

    initTable() {
        this.tableColumns = [
            {
                field: 'id',
                header: 'order_id',
                width: 12,
            },
            {
                field: 'lot_id',
                header: 'lot_id',
                width: 10,
            },
            {
                field: 'estate_name',
                header: 'estate',
                width: 15,
            },
            {
                field: 'order_reference',
                header: 'roaster_ref_no',
                width: 15,
            },
            {
                field: 'origin',
                header: 'origin',
                width: 12,
            },
            {
                field: 'species',
                header: 'species',
                width: 12,
            },
            {
                field: 'varieties',
                header: 'variety',
                width: 12,
            },
            {
                field: 'unit_price',
                header: 'buying_price',
                width: 12,
            },
            {
                field: 'cup_score',
                header: 'cupping_score',
                width: 11,
            },
            {
                field: 'quantity',
                header: 'stock_in_hand',
                width: 18,
            },
        ];
    }

    initForm() {
        this.lotSaleForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            price_per_unit: [QuantityUnit.kg, Validators.compose([Validators.required])],
            quantity: [null, Validators.compose([Validators.required, this.quantityValidator])],
            quantity_type: [ProcuredCoffeeUnit.bags, Validators.compose([Validators.required])],
            quantity_count: [null, Validators.compose([Validators.required, this.quantityValidator])],
            quantity_unit: [QuantityUnit.kg, Validators.compose([Validators.required])],
            minimum_order_quantity_count: ['', Validators.compose([Validators.required, Validators.min(1)])],
            vat_settings_id: [null, Validators.compose([Validators.required])],
            status: [ProcuredCoffeeStatus.IN_STOCK, Validators.compose([Validators.required])],
            sample_quantity_count: [null, Validators.compose([Validators.required, this.quantityValidator])],
        });
    }

    refreshBreadcrumb() {
        this.breadItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('inventory') },
            {
                label: this.translator.instant('green_coffee_inventory'),
                routerLink: '/green-coffee-management/green-coffee-inventory',
            },
            {
                label: this.translator.instant('marked_for_sale'),
                routerLink: `/green-coffee-management/green-coffee-inventory`,
                queryParams: { markSale: 'yes' },
            },
            { label: this.availablityName ? this.availablityName : '' },
        ];
    }

    getSaleOrderDetails(resolve) {
        this.roasterService.getMarkForSaleDetails(this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    const lotDetails = response.result;
                    this.coffeeDetails = response.result;
                    this.soldQuantity = lotDetails.initial_quantity_count - lotDetails.quantity_count;
                    this.soldQuantitySample =
                        lotDetails.sample_initial_quantity_count - lotDetails.sample_quantity_count;
                    this.lotSaleForm.patchValue({ ...lotDetails, quantity_count: lotDetails.initial_quantity_count });
                    this.availablityName = lotDetails.name;
                    this.statusLabel = this.formatStatus(response.result.status);
                    this.refreshBreadcrumb();
                }
                resolve();
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

    getProcuredOrderDetails(resolve) {
        this.roasterService.getProcuredOrderDetails(this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    this.orderDetails = response.result;
                    this.tableValue.push(this.orderDetails);
                }
                resolve();
            },
            (err) => {
                console.log(err);
            },
        );
    }

    updateMarkForSale(productObj) {
        this.roasterService.updateMarkForSale(this.roasterID, this.orderID, productObj).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toasterService.success('Details updated successfully');
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            markSale: 'yes',
                        },
                    };
                    this.router.navigate(['/green-coffee-management/green-coffee-inventory'], navigationExtras);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }

    updateStatus() {
        const status = { status: this.lotSaleForm.value.status };
        this.roasterService.updateMarkForSaleStatus(this.roasterID, this.orderID, status).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toasterService.success('Status updated successfully');
                    this.statusLabel = this.formatStatus(status.status);
                    this.showDropdown = false;
                } else {
                    if (response.messages.status[0] === 'cannot_change') {
                        this.toasterService.error('Please check the Quantity for sale.');
                    } else {
                        this.toasterService.error('Error! Check Quantity for sale');
                    }
                }
            },
            (err) => {
                this.toasterService.error('Error while updating status');
                console.log(err);
            },
        );
    }

    onSave(): void {
        if (this.lotSaleForm.valid) {
            const productObj = { ...this.lotSaleForm.value, quantity_type: ProcuredCoffeeUnit.bags };
            this.updateMarkForSale(productObj);
        } else {
            this.lotSaleForm.markAllAsTouched();
            this.toasterService.error('Please fill all Data');
        }
    }

    onCancel() {
        this.router.navigate([`/green-coffee-management/green-coffee-for-sale-details/${this.orderID}`]);
    }

    openDeleteModal() {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.deleteProductFromList();
                }
            });
    }

    deleteProductFromList() {
        this.roasterService.deleteProcuredCoffee(this.roasterID, this.orderID).subscribe(
            (res: ApiResponse<any>) => {
                if (res.success) {
                    this.toasterService.success('Product deleted successfully');
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            markSale: 'yes',
                        },
                    };
                    this.router.navigate(['/green-coffee-management/green-coffee-inventory'], navigationExtras);
                }
            },
            (err) => {
                this.toasterService.error('Error while deleting the ');
                console.log(err);
            },
        );
    }

    getRoasterVatDetails(resolve) {
        this.userService.getRoasterVatDetails(this.roasterID, 'mr').subscribe((res: ApiResponse<any>) => {
            if (res.success && res.result) {
                this.vatDetailsArray = [];
                res.result.forEach((element) => {
                    this.vatDetailsArray.push({
                        label: `${element.vat_percentage}% ${element.transaction_type}`,
                        value: element.id,
                    });
                });
            }
            resolve();
        });
    }

    checkQuantity() {
        this.lotSaleForm.get('quantity_count').updateValueAndValidity();
        this.lotSaleForm.get('quantity').updateValueAndValidity();
        this.lotSaleForm.get('sample_quantity_count').updateValueAndValidity();
    }

    quantityValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
        if (control.errors?.required) {
            return null;
        }
        const parent = control.parent;
        if (!parent || !this.remainingTotalQuantity) {
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
            this.coffeeDetails?.sample_quantity
        ) {
            quantityCnt += parent.get('sample_quantity_count').value * this.coffeeDetails?.sample_quantity;
        }

        if (this.remainingTotalQuantity - quantityCnt < 0) {
            return { availablequantity: true };
        }
        return null;
    };
}
