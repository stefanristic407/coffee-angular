import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
    AuthService,
    CoffeeStoryService,
    DownloadService,
    OrganizationService,
    PurchaseService,
    RoasterService,
    UserService,
} from '@services';
import { SelectOrderTableComponent } from '../select-order-table/select-order-table.component';
import { ConfirmComponent } from '@shared';
import { ApiResponse, Download, OrderDetails, OrganizationDetails } from '@models';
import { environment } from '@env/environment';
import { maxValidator, minValidator } from '@utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '@base-components';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-new-roasted-batch',
    templateUrl: './new-roasted-batch.component.html',
    styleUrls: ['./new-roasted-batch.component.scss'],
})
export class NewRoastedBatchComponent extends DestroyableComponent implements OnInit {
    readonly env = environment;
    selectable = true;
    removable = true;
    flavourProfile: any;
    roasterFlavourProfile: any;
    batchId: number;
    orderDetails: any = {};
    rating: any;
    coffeeStory: any;
    batchForm: FormGroup;
    roastProfileArray: SelectItem[] = [];
    weightTypeArray: SelectItem[] = [
        { label: 'lb', value: 'lb' },
        { label: 'kg', value: 'kg' },
        { label: 'g', value: 'g' },
    ];
    ordId: any;
    @ViewChild(SelectOrderTableComponent, { static: false })
    selectOrd: SelectOrderTableComponent;
    breadItems = [
        { label: 'Home', routerLink: '/' },
        { label: 'Inventory', routerLink: '/' },
        {
            label: 'Roasted coffee batches',
            routerLink: '/roasted-coffee-batch/roasted-coffee-batchs',
        },
        { label: 'New roasted coffee batch' },
    ];
    showOrder: boolean;
    unit = 'lb';
    isLoadingCoffeeBatch = false;

    constructor(
        private coffeeStorySrv: CoffeeStoryService,
        private dialogSrv: DialogService,
        private downloadService: DownloadService,
        private fb: FormBuilder,
        private organizationService: OrganizationService,
        private purchaseService: PurchaseService,
        private roasterService: RoasterService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private userService: UserService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.batchId = this.route.snapshot.queryParams.batchId;
        this.ordId = this.route.snapshot.queryParams.ordId;
        this.getData();
        this.batchForm = this.fb.group({
            roast_batch_name: ['', Validators.compose([Validators.required])],
            order_id: [this.ordId || null, Validators.compose([Validators.required])],
            roasting_profile_id: ['', Validators.compose([Validators.required])],
            green_coffee_quantity: [
                null,
                Validators.compose([Validators.required, minValidator('roasting_profile_quantity')]),
            ],
            roasting_profile_quantity: [
                null,
                Validators.compose([Validators.required, maxValidator('green_coffee_quantity')]),
            ],
            waste_quantity: [{ value: '', disabled: true }],
            aroma: [null],
            acidity: [null],
            body: [null],
            flavour: [null],
            processing: { value: null, disabled: true },
            roaster_notes: [''],
            roaster_ref_no: { value: '', disabled: true },
            batch_ref_no: [''],
        });

        this.batchForm.controls.green_coffee_quantity.valueChanges
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(() => {
                this.setWasteQuantityValue();
            });
        this.batchForm.controls.roasting_profile_quantity.valueChanges
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(() => {
                this.setWasteQuantityValue();
            });
    }

    setWasteQuantityValue(): void {
        this.batchForm.controls.waste_quantity.setValue(
            `${
                this.batchForm.controls.green_coffee_quantity.value -
                this.batchForm.controls.roasting_profile_quantity.value
            } ${this.unit}`,
        );
    }

    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getRoastedBatch() {
        this.isLoadingCoffeeBatch = true;
        this.userService.getRoastedBatchDetail(this.batchId).subscribe((res) => {
            this.isLoadingCoffeeBatch = false;
            if (res && res.result) {
                this.breadItems[3].label = this.capitalizeFirstLetter(res.result.roast_batch_name);
                this.batchForm.patchValue({
                    ...res.result,
                    roaster_ref_no: this.orderDetails.order_reference,
                    processing: this.orderDetails.processing,
                });
                this.flavourProfile = (res.result.flavour_profile || []).map((item) => {
                    return { id: item.flavour_profile_id, name: item.flavour_profile_name };
                });
                this.unit = res.result.roasting_profile_unit;
                this.setWasteQuantityValue();
            }
        });
    }

    getData() {
        this.isLoadingCoffeeBatch = true;
        this.roasterService.getRoastingProfile().subscribe((data) => {
            if (data.success) {
                this.roastProfileArray = (data.result || []).map((item: any) => {
                    return {
                        label: item.roast_profile_name,
                        value: item.id,
                    };
                });
                this.roastProfileArray.push({ label: '', value: 'button' });
                if (this.ordId) {
                    this.getOrderDetails();
                }
                if (this.batchId) {
                    this.getRoastedBatch();
                } else {
                    this.isLoadingCoffeeBatch = false;
                }
                if (this.ordId && this.batchId) {
                    this.getRoastedBatchStory();
                }
                this.getRoasterFlavourProfile();
            } else {
                this.toastrService.error('Error while getting the roasting profiles');
            }
        });
    }

    getRoasterFlavourProfile() {
        this.userService.getRoasterFlavourProfile().subscribe((data) => {
            if (data.success) {
                this.roasterFlavourProfile = data.result.map((item) => {
                    return { label: item.name, value: item };
                });
            } else {
                this.toastrService.error('Error while getting the roasting Flavor Profile');
            }
        });
    }

    getOrderDetails() {
        this.purchaseService
            .getOrderDetailsById(this.ordId, OrganizationType.ESTATE)
            .subscribe((response: OrderDetails) => {
                if (response) {
                    this.orderDetails = response;
                    this.getRatingData(this.orderDetails.estate_id);
                    this.batchForm.controls.roaster_ref_no.setValue(this.orderDetails.order_reference);
                    this.batchForm.controls.processing.setValue(this.orderDetails.processing);
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

    updateRoastedBatch(productObj) {
        this.userService.updateRoastedBatchDetail(this.batchId, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasted Batch has been updated.');
                    this.router.navigate(['/roasted-coffee-batch/roasted-coffee-batchs']);
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
        this.userService.addRoastedBatches(productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasted Batch  has been added.');
                    this.router.navigate(['/roasted-coffee-batch/roasted-coffee-batchs']);
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
            this.toastrService.error('Please fill all data');
            return;
        }

        const productObj = {
            ...this.batchForm.getRawValue(),
            flavour_profile: this.flavourProfile?.length ? this.flavourProfile.map((ele) => ele.id) : null,
            roasting_profile_unit: this.unit,
            green_coffee_unit: this.unit,
            waste_quantity:
                this.batchForm.controls.green_coffee_quantity.value -
                this.batchForm.controls.roasting_profile_quantity.value,
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
            this.batchForm.get('order_id').setValue(id);
            this.getOrderDetails();
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
}
