import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService, CoffeeStoryService, DownloadService, GlobalsService, UserService } from '@services';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SelectOrderTableComponent } from '../select-order-table/select-order-table.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { Download } from '@models';
import { environment } from '@env/environment';
import { maxValidator, minValidator } from '@utils';
import { minMax } from '@syncfusion/ej2-angular-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-new-roasted-batch',
    templateUrl: './new-roasted-batch.component.html',
    styleUrls: ['./new-roasted-batch.component.scss'],
})
export class NewRoastedBatchComponent implements OnInit, OnDestroy {
    readonly env = environment;
    langChips: any = [];
    selectable = true;
    removable = true;
    appLanguage?: any;
    roasterId: number;
    roastingProfile: any;
    roasterFlavourProfile: any;
    flavour: any;
    processing: any;
    quantity: any;
    batchId: number;
    flavourProfileArray: any = [];
    orderDetails: any = {};
    rating: any;
    flavourArray: any = [];
    coffeeStory: any;
    batchDetails: any;
    batchForm: FormGroup;
    roastProfileArray: any = [];
    weightTypeArray: any = '';
    ordId: any;
    getFlavourArray: any = [];
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
    destroy$: Subject<boolean> = new Subject();
    isLoadingCoffeeBatch = false;

    constructor(
        public dialogSrv: DialogService,
        public globals: GlobalsService,
        public userService: UserService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
        public route: ActivatedRoute,
        public cookieService: CookieService,
        private fb: FormBuilder,
        private coffeeStorySrv: CoffeeStoryService,
        public downloadService: DownloadService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
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
            aroma: [''],
            acidity: [''],
            body: [''],
            flavour: [''],
            roaster_notes: [''],
            roaster_ref_no: [{ value: '', disabled: true }],
            batch_ref_no: [''],
        });

        this.weightTypeArray = [
            { label: 'lb', value: 'lb' },
            { label: 'kg', value: 'kg' },
            { label: 'g', value: 'g' },
        ];
        this.batchForm.controls.green_coffee_quantity.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.setWasteQuantityValue();
        });
        this.batchForm.controls.roasting_profile_quantity.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
        this.userService.getRoastedBatchDetail(this.roasterId, this.batchId).subscribe((res) => {
            this.isLoadingCoffeeBatch = false;
            if (res && res.result) {
                this.breadItems[3].label = this.capitalizeFirstLetter(res.result.roast_batch_name);
                this.flavourArray = res.result.flavour_profile || [];
                this.flavourArray.forEach((element, index) => {
                    const chips = {
                        id: element.flavour_profile_id,
                        name: element.flavour_profile_name,
                    };
                    this.getFlavourArray.push(chips);
                });
                this.batchDetails = res.result;
                this.batchForm.patchValue(this.batchDetails);
                this.unit = res.result.roasting_profile_unit;
                this.setWasteQuantityValue();
            }
            this.getRoasterFlavourProfile();
        });
    }

    getData() {
        this.isLoadingCoffeeBatch = true;
        this.roasterService.getRoastingProfile().subscribe((data) => {
            if (data.success) {
                this.roastingProfile = data.result;
                this.roastProfileArray = this.roastingProfile.map((item: any) => {
                    return {
                        label: item.roast_profile_name,
                        value: item.id,
                    };
                });
                const button = {
                    label: '',
                    value: 'button',
                };
                this.roastProfileArray.push(button);
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
        this.userService.getRoasterFlavourProfile(this.roasterId).subscribe((data) => {
            if (data.success) {
                this.roasterFlavourProfile = data.result;
                this.langChips = [];
                if (this.getFlavourArray.length > 0) {
                    this.getFlavourArray.forEach((element) => {
                        const findObj = data.result.find((item) => item.name === element.name);
                        if (findObj) {
                            this.langChips.push(findObj);
                        }
                    });
                }
            } else {
                this.toastrService.error('Error while getting the roasting Flavor Profile');
            }
        });
    }

    getOrderDetails() {
        this.roasterService.getViewOrderDetails(this.roasterId, this.ordId).subscribe((response) => {
            if (response.success) {
                this.orderDetails = response.result;
                this.getRatingData(this.orderDetails.estate_id);
                this.batchForm.controls.roaster_ref_no.setValue(this.orderDetails.order_reference);
            } else {
                this.toastrService.error('Error while getting the order list');
            }
        });
    }

    getRatingData(value: any) {
        this.userService.getAvailableEstateList(this.roasterId, value).subscribe((data) => {
            if (data.success) {
                this.rating = data.result.rating;
            } else {
                this.rating = 0.0;
            }
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
        this.userService.updateRoastedBatchDetail(this.roasterId, this.batchId, productObj).subscribe(
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
        this.userService.addRoastedBatches(this.roasterId, productObj).subscribe(
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

        this.flavourProfileArray = this.langChips.map((ele) => {
            return ele.id;
        });
        const productObj = {
            ...this.batchForm.value,
            flavour_profile: this.flavourProfileArray,
            roasting_profile_unit: this.unit,
            green_coffee_unit: this.unit,
            waste_quantity:
                this.batchForm.controls.green_coffee_quantity.value -
                this.batchForm.controls.roasting_profile_quantity.value,
        };

        for (const [key, value] of Object.entries(productObj)) {
            if (!value) {
                delete productObj[key];
            }
        }
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

    addLangProfile(event) {
        const existedItem = this.langChips.find((item) => item.id === event.value.id);
        if (existedItem) {
            return;
        }
        const name = event.value.name;

        if ((name || '').trim() && event.value) {
            this.langChips = [...this.langChips, event.value];
        }
    }

    onDownloadQr() {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Please confirm!',
                    desp: 'Are you sure want to download',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
