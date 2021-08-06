import { Component, OnInit } from '@angular/core';
import { AuthService, GlobalsService, ResizeService, UserService } from '@services';
import { RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { ResizeableComponent } from '@base-components';
import { ApiResponse } from '@models';
import { ConfirmComponent } from '@app/shared';
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
    orderID: any = '';
    showDropdown = false;
    orderStatus = 'IN_STOCK';
    statusLabel = '';
    saleDetailsPresent = false;
    readOnlyMode = false;
    breadItems: any = [];
    quantityUnitArray: any = [
        { label: 'Bags', value: 'bags' },
        { label: 'kg', value: 'kg' },
    ];
    priceTypeArray: any = [
        { label: 'Per kg', value: 'kg' },
        { label: 'per lb', value: 'lb' },
    ];
    vatDetailsArray: any = [];
    stockTypeArray: any = [
        { label: 'In stock', value: 'IN_STOCK' },
        { label: 'Sold', value: 'SOLD' },
        { label: 'Hidden', value: 'HIDDEN' },
    ];
    weightTypeArray: any = [
        { label: 'kg', value: 'kg' },
        { label: 'lb', value: 'lb' },
        { label: 'tonnes', value: 'tonnes' },
    ];
    lotSaleForm: FormGroup;
    availablityName: any;
    tableColumns = [];
    tableValue = [];
    remaining: any = '--';
    quantityType: any;

    constructor(
        public globals: GlobalsService,
        public route: ActivatedRoute,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        private toasterService: ToastrService,
        private fb: FormBuilder,
        private userService: UserService,
        public sharedService: SharedServiceService,
        protected resizeService: ResizeService,
        private authService: AuthService,
        private dialogService: DialogService,
    ) {
        super(resizeService);
        this.roasterID = this.authService.getOrgId();
        this.orderID = decodeURIComponent(this.route.snapshot.queryParams.orderId);
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
            });
        });
    }

    initTable() {
        this.tableColumns = [
            {
                field: 'id',
                header: this.globals.languageJson?.order_id,
                sortable: false,
                width: 12,
            },
            {
                field: 'lot_id',
                header: this.globals.languageJson?.lot_id,
                sortable: false,
                width: 10,
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
                width: 12,
            },
            {
                field: 'species',
                header: this.globals.languageJson?.species,
                sortable: false,
                width: 12,
            },
            {
                field: 'varieties',
                header: this.globals.languageJson?.variety,
                sortable: false,
                width: 12,
            },
            {
                field: 'price',
                header: this.globals.languageJson?.buying_price,
                sortable: false,
                width: 12,
            },
            {
                field: 'cup_score',
                header: this.globals.languageJson?.cupping_score,
                width: 11,
            },
            {
                field: 'quantity',
                header: this.globals.languageJson?.stock_in_hand,
                sortable: false,
                width: 18,
            },
        ];
    }

    initForm() {
        this.lotSaleForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            price: ['', Validators.compose([Validators.required])],
            price_per_unit: ['kg', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required])],
            quantity_type: ['bags', Validators.compose([Validators.required])],
            quantity_count: [null, Validators.compose([Validators.required])],
            quantity_unit: ['kg', Validators.compose([Validators.required])],
            minimum_order_quantity_count: ['', Validators.compose([Validators.required])],
            vat_settings_id: [null, Validators.compose([Validators.required])],
            status: ['IN_STOCK', Validators.compose([Validators.required])],
        });
        this.lotSaleForm.get('quantity_type').valueChanges.subscribe((value) => {
            this.lotSaleForm.patchValue({ quantity_type: value }, { emitEvent: false });
        });
    }

    refreshBreadcrumb() {
        this.breadItems = [
            { label: 'Home', routerLink: '/' },
            { label: 'Inventory' },
            { label: 'Green coffee management', routerLink: '/green-coffee-management/green-coffee-inventory' },
            {
                label: 'Marked for sale',
                routerLink: `/green-coffee-management/green-coffee-inventory`,
                queryParams: { markSale: 'yes' },
            },
            { label: this.availablityName ? this.availablityName : '' },
        ];
    }

    getSaleOrderDetails(resolve) {
        this.roasterService.getMarkForSaleDetails(this.roasterID, this.orderID).subscribe(
            (response) => {
                if (response.success && response.result) {
                    const lotDetails = response.result;
                    this.lotSaleForm.patchValue(lotDetails);
                    this.orderStatus = response.result.status;
                    this.availablityName = lotDetails.name;
                    this.statusLabel = this.formatStatus(this.orderStatus);
                    if (lotDetails.quantity_type.toLowerCase() === 'bags') {
                        const remaining = lotDetails.quantity_count;
                        if (remaining > 0) {
                            this.remaining = `${remaining} Bags`;
                        } else {
                            this.remaining = '0 Bags';
                        }
                        this.lotSaleForm.patchValue(
                            { quantity_type: lotDetails.quantity_type.toLowerCase() },
                            { emitEvent: false },
                        );
                    } else if (lotDetails.quantity_type.toLowerCase() === 'kg') {
                        const remaining = lotDetails.quantity_count;
                        if (remaining > 0) {
                            this.remaining = `${remaining} kg`;
                        } else {
                            this.remaining = '0 kg';
                        }
                        this.lotSaleForm.patchValue(
                            { quantity_type: lotDetails.quantity_type.toLowerCase() },
                            { emitEvent: false },
                        );
                    }
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
        this.roasterService.getProcuredCoffeeDetails(this.roasterID, this.orderID).subscribe(
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
            const productObj = this.lotSaleForm.value;
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
                showHeader: false,
                styleClass: 'confirm-dialog',
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

    quantityTypeChange() {
        this.quantityType = this.lotSaleForm.value.quantity_type;
        this.changeQuantity(this.lotSaleForm.value.quantity_count);
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
