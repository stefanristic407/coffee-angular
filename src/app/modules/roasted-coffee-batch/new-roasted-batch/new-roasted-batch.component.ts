import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { OrganizationType, QuantityUnit } from '@enums';
import { environment } from '@env/environment';
import { Download, OrderDetails } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { CoffeeStoryService, DownloadService, InventoryService, OrganizationService, PurchaseService } from '@services';
import { ConfirmComponent } from '@shared';
import { convert2Kg, convertKg, maxValidator, minValidator, quantityMaxValidator } from '@utils';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';
import { RoastingProfileDialogComponent } from '../roasting-profile-dialog/roasting-profile-dialog.component';

@Component({
    selector: 'app-new-roasted-batch',
    templateUrl: './new-roasted-batch.component.html',
    styleUrls: ['./new-roasted-batch.component.scss'],
})
export class NewRoastedBatchComponent extends DestroyableComponent implements OnInit {
    readonly env = environment;
    isTestBatchOptions = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];
    weightTypeArray: SelectItem[] = [
        { label: 'lb', value: 'lb' },
        { label: 'kg', value: 'kg' },
    ];
    batchId: number;
    orderDetails: any = {};
    roastedBatchDetails: any = {};
    rating: any;
    coffeeStory: any;
    batchForm: FormGroup;
    roastProfileArray: SelectItem[] = [];
    ordId: any;
    breadItems = [
        { label: this.translator.instant('home'), routerLink: '/' },
        { label: this.translator.instant('inventory'), routerLink: '/' },
        {
            label: this.translator.instant('menu_rc_inventory'),
            routerLink: '/roasted-coffee-batch/roasted-coffee-batches',
        },
        { label: 'New roasted coffee batch' },
    ];
    showOrder: boolean;
    isLoadingCoffeeBatch = false;
    remainingTotalQuantity = 0;

    constructor(
        private coffeeStorySrv: CoffeeStoryService,
        private dialogSrv: DialogService,
        private downloadService: DownloadService,
        private fb: FormBuilder,
        private organizationService: OrganizationService,
        private purchaseService: PurchaseService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private inventorySrv: InventoryService,
        private translator: TranslateService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.batchId = this.route.snapshot.queryParams.batchId;
        this.ordId = this.route.snapshot.queryParams.ordId;
        this.getData();
        this.batchForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            is_test_batch: [false, Validators.compose([Validators.required])],
            gc_order_id: [this.ordId || null, Validators.compose([Validators.required])],
            roasting_profile_id: ['', Validators.compose([Validators.required])],
            green_coffee_quantity: [
                null,
                Validators.compose([
                    Validators.required,
                    minValidator('roasted_coffee_quantity'),
                    (control: AbstractControl) =>
                        quantityMaxValidator('quantity_unit', this.remainingTotalQuantity)(control),
                ]),
            ],
            quantity_unit: [QuantityUnit.lb],
            roasted_coffee_quantity: [
                null,
                Validators.compose([Validators.required, maxValidator('green_coffee_quantity')]),
            ],
            waste_quantity: [{ value: '', disabled: true }],
            roaster_ref_no: { value: '', disabled: true },
            batch_ref_no: [''],
            roasted_date: [null],
            best_before_date: [null],
        });

        this.batchForm.controls.green_coffee_quantity.valueChanges
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(() => {
                this.setWasteQuantityValue();
            });
        this.batchForm.controls.roasted_coffee_quantity.valueChanges
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(() => {
                this.setWasteQuantityValue();
            });
    }

    setWasteQuantityValue(): void {
        this.batchForm.controls.waste_quantity.setValue(
            `${
                this.batchForm.controls.green_coffee_quantity.value -
                this.batchForm.controls.roasted_coffee_quantity.value
            } ${this.batchForm.value.quantity_unit}`,
        );
    }

    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getData() {
        this.isLoadingCoffeeBatch = true;
        const promises = [];
        promises.push(new Promise((resolve, reject) => this.getRoastingProfile(resolve, reject)));
        if (this.ordId) {
            promises.push(new Promise((resolve, reject) => this.getOrderDetails(resolve, reject)));
        }
        if (this.batchId) {
            promises.push(new Promise((resolve, reject) => this.getRoastedBatch(resolve, reject)));
        }
        Promise.all(promises).then(() => {
            this.isLoadingCoffeeBatch = false;
            this.calcRemainningQuantity();
        });
        if (this.ordId && this.batchId) {
            this.getRoastedBatchStory();
        }
    }

    getRoastingProfile(resolve?, reject?) {
        this.inventorySrv.getRoastingProfiles().subscribe((data) => {
            if (data.success) {
                this.roastProfileArray = (data.result || []).map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                });
                if (resolve) {
                    resolve();
                }
            } else {
                this.toastrService.error('Error while getting the roasting profiles');
            }
        });
    }

    getRoastedBatch(resolve?, reject?) {
        this.inventorySrv.getRoastedBatch(this.batchId).subscribe((res) => {
            if (res && res.result) {
                this.breadItems[3].label = res.result.name || 'NA';
                const unit = res.result.quantity_unit;
                this.batchForm.patchValue({
                    ...res.result,
                    green_coffee_quantity: convertKg(res.result.green_coffee_quantity, unit),
                    roasted_coffee_quantity: convertKg(res.result.roasted_coffee_quantity, unit),
                    roaster_ref_no: this.orderDetails.order_reference,
                });
                this.roastedBatchDetails = res.result;
                this.setWasteQuantityValue();
                if (resolve) {
                    resolve();
                }
            }
        });
    }

    getOrderDetails(resolve?, reject?) {
        this.purchaseService
            .getOrderDetailsById(this.ordId, OrganizationType.ESTATE)
            .subscribe((response: OrderDetails) => {
                if (response) {
                    this.orderDetails = response;
                    this.getRatingData(this.orderDetails.estate_id);
                    this.batchForm.controls.roaster_ref_no.setValue(this.orderDetails.order_reference);
                    if (resolve) {
                        resolve();
                    }
                } else {
                    this.toastrService.error('Error while getting the order list');
                }
            });
    }

    getRatingData(estateId: number) {
        this.organizationService.getProfile(estateId, OrganizationType.ESTATE).subscribe({
            next: (result) => {
                if (result) {
                    this.rating = result.rating;
                } else {
                    this.rating = 0.0;
                }
            },
        });
    }

    getRoastedBatchStory() {
        this.coffeeStorySrv.getRoastedBatchStory(this.batchId).subscribe(
            (res: any) => {
                if (res.success && res.result) {
                    this.coffeeStory = res.result;
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }

    calcRemainningQuantity() {
        this.remainingTotalQuantity =
            this.orderDetails.remaining_total_quantity + (this.roastedBatchDetails?.green_coffee_quantity || 0);
    }

    changeUnit() {
        this.setWasteQuantityValue();
        this.batchForm.get('green_coffee_quantity').updateValueAndValidity();
    }

    updateRoastedBatch(productObj) {
        this.inventorySrv.updateRoastedBatch(this.batchId, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasted Batch has been updated.');
                    this.router.navigate(['/roasted-coffee-batch/roasted-coffee-batches']);
                } else if (res.messages) {
                    this.toastrService.error('Order Id ' + res.messages.order_id[0].replace('_', ' ') + '.');
                } else {
                    this.toastrService.error('Error while updating the roasted batch');
                }
            },
            (err) => {
                this.toastrService.error('Error while updating the roasted batch');
            },
        );
    }

    createRoastedBatch(productObj) {
        this.inventorySrv.createRoastedBatch(productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasted Batch  has been added.');
                    this.router.navigate(['/roasted-coffee-batch/roasted-coffee-batches']);
                } else if (res.messages) {
                    this.toastrService.error('Order Id ' + res.messages.order_id[0].replace('_', ' ') + '.');
                } else {
                    this.toastrService.error('Error while adding the roasted batch ');
                }
            },
            (err) => {
                this.toastrService.error('Error while adding the roasted batch ');
            },
        );
    }

    onSave() {
        if (this.batchForm.invalid) {
            this.batchForm.markAllAsTouched();
            this.toastrService.error(this.translator.instant('please_check_form_data'));
            return;
        }

        const unit = this.batchForm.value.quantity_unit;
        const productObj = {
            ...this.batchForm.getRawValue(),
            green_coffee_quantity: convert2Kg(this.batchForm.value.green_coffee_quantity, unit),
            roasted_coffee_quantity: convert2Kg(this.batchForm.value.roasted_coffee_quantity, unit),
            waste_quantity: convert2Kg(
                this.batchForm.controls.green_coffee_quantity.value -
                    this.batchForm.controls.roasted_coffee_quantity.value,
                unit,
            ),
            roasted_date: this.batchForm.value.roasted_date
                ? moment(this.batchForm.value.roasted_date).format('yy-MM-DD')
                : null,
            best_before_date: this.batchForm.value.best_before_date
                ? moment(this.batchForm.value.best_before_date).format('yy-MM-DD')
                : null,
        };

        if (this.batchId) {
            this.updateRoastedBatch(productObj);
        } else {
            this.createRoastedBatch(productObj);
        }
    }

    setOrder(id: number) {
        this.showOrder = false;
        if (id) {
            this.ordId = id;
            this.batchForm.get('gc_order_id').setValue(id);
            this.getOrderDetails();
            const promises = [];
            promises.push(new Promise((resolve, reject) => this.getOrderDetails(resolve, reject)));
            Promise.all(promises).then(() => {
                this.calcRemainningQuantity();
            });
        }
    }

    onDownloadQr() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Please confirm!',
                    desp: 'Are you sure want to download',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.downloadService.imageDownload(this.coffeeStory.qr_code_url, 'qr-code.svg').subscribe(
                        (res: Download) => {
                            if (res.progress === 100) {
                                this.toastrService.success('Downloaded successfully');
                            }
                        },
                        (error) => {
                            this.toastrService.error('Download failed');
                        },
                    );
                }
            });
    }

    onCopy(): void {
        this.toastrService.success('Successfully copied');
    }

    createRoastingProfile() {
        this.dialogSrv.open(RoastingProfileDialogComponent, {}).onClose.subscribe((data: any) => {
            if (data?.success) {
                this.roastProfileArray.push({
                    label: data.newItem.name,
                    value: data.newItem.id,
                });
                this.batchForm.get('roasting_profile_id').setValue(data.newItem.id);
            }
        });
    }
}
