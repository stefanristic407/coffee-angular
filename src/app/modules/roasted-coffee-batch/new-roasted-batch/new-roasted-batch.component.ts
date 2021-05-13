import { Component, OnInit, ViewChild } from '@angular/core';
import { CoffeeStoryService, DownloadService, GlobalsService } from '@services';
import { UserserviceService } from '@services';
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

@Component({
    selector: 'app-new-roasted-batch',
    templateUrl: './new-roasted-batch.component.html',
    styleUrls: ['./new-roasted-batch.component.scss'],
})
export class NewRoastedBatchComponent implements OnInit {
    readonly env = environment;
    langChips: any = [];
    selectable = true;
    removable = true;
    appLanguage?: any;
    roasterId: string;
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

    breadCrumbItem: MenuItem[] = [];
    batchForm: FormGroup;
    roastProfileArray: any = [];
    weightTypeArray: any = '';
    ordId: any;
    // isflavourProfile = false;
    getFlavourArray: any = [];
    @ViewChild(SelectOrderTableComponent, { static: false })
    selectOrd: SelectOrderTableComponent;
    breadItems = [
        { label: 'Home', routerLink: '/' },
        {
            label: 'Roasted coffee',
            routerLink: '/roasted-coffee-batch/roasted-coffee-batchs',
        },
        { label: 'New roasted coffee batch' },
    ];
    showOrder: boolean;
    constructor(
        public dialogSrv: DialogService,
        public globals: GlobalsService,
        public userService: UserserviceService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
        public route: ActivatedRoute,
        public cookieService: CookieService,
        private fb: FormBuilder,
        private coffeeStorySrv: CoffeeStoryService,
        public downloadService: DownloadService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
        this.getRoastingProfiles();

        if (this.route.snapshot.queryParams.batchId && this.route.snapshot.queryParams.ordId) {
            this.batchId = +decodeURIComponent(this.route.snapshot.queryParams.batchId);
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams.ordId);
            if (this.ordId) {
                this.getOrderDetails();
            }
            this.getRoastedBatch();
            this.getRoastedBatchStory();
        } else if (this.route.snapshot.queryParams.ordId) {
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams.ordId);
            this.getOrderDetails();
            this.getRoasterFlavourProfile();
        } else {
            //  this.ordId = 'select the order';
            this.getRoasterFlavourProfile();
        }
        this.batchForm = this.fb.group({
            roast_batch_name: ['', Validators.compose([Validators.required])],
            roasting_profile_id: ['', Validators.compose([Validators.required])],
            green_coffee_quantity: [
                null,
                Validators.compose([Validators.required, minValidator('roasting_profile_quantity')]),
            ],
            green_coffee_unit: ['lb'],
            roasting_profile_quantity: [
                null,
                Validators.compose([Validators.required, maxValidator('green_coffee_quantity')]),
            ],
            roasting_profile_unit: ['lb'],
            waste_quantity: [null],
            waste_unit: ['lb'],
            aroma: [''],
            acidity: [''],
            body: [''],
            flavour: [''],
            roaster_notes: ['', Validators.compose([Validators.required])],
            roaster_ref_no: [{ value: '', disabled: true }],
            batch_ref_no: [''],
            processing: [{ value: '', disabled: true }],
        });

        this.weightTypeArray = [
            { label: 'lb', value: 'lb' },
            { label: 'kg', value: 'kg' },
        ];
        // disable mousewheel on a input number field when in focus
        // (to prevent Cromium browsers change the value when scrolling)
        $(document).on('wheel', 'input[type=number]', function (e) {
            $(this).blur();
        });
    }

    getRoastedBatch() {
        this.userService.getRoastedBatchDetail(this.roasterId, this.batchId).subscribe((res) => {
            if (res && res.result) {
                this.flavourArray = res.result.flavour_profile;
                this.flavourArray.forEach((element, index) => {
                    const chips = {
                        id: element.flavour_profile_id,
                        name: element.flavour_profile_name,
                    };
                    this.getFlavourArray.push(chips);
                });
                this.batchDetails = res.result;

                this.batchForm.patchValue(this.batchDetails);
            }
            this.getRoasterFlavourProfile();
        });
    }

    getRoastingProfiles() {
        this.roasterService.getRoastingProfile().subscribe((data) => {
            if (data.success) {
                this.roastingProfile = data.result;
                this.roastingProfile.forEach((element) => {
                    const sample = {
                        label: element.roast_profile_name,
                        value: element.id,
                    };
                    this.roastProfileArray.push(sample);
                });
                const button = {
                    label: '',
                    value: 'button',
                };
                this.roastProfileArray.push(button);
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
                this.toastrService.error('Error while getting the roasting Flavour Profile');
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
                }
            },
            (err) => {
                this.toastrService.error('Error while adding the roasted batch ');
            },
        );
    }
    validateForms() {
        let returnFlag = true;
        if (!this.batchForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        return returnFlag;
    }
    onSave() {
        if (this.validateForms()) {
            this.flavourProfileArray = this.langChips.map((ele) => {
                return ele.id;
            });
            if (this.flavourProfileArray.length > 0) {
                const productObj = this.batchForm.value;
                productObj.flavour_profile = this.flavourProfileArray;
                delete productObj.batch_ref_no;
                productObj.order_id = Number(this.ordId);
                if (this.batchId) {
                    this.updateRoastedBatch(productObj);
                } else {
                    delete productObj.batch_ref_no;
                    this.createRoastedBatch(productObj);
                }
            } else {
                // this.isflavourProfile = true;
                this.toastrService.error('Please fill Flavour Profile');
            }
        } else {
            this.batchForm.markAllAsTouched();
            this.toastrService.error('Please fill all Data');
        }
    }
    selectOrder() {
        this.showOrder = true;
        // if (this.ordId && this.batchId) {
        //     const navigationExtras: NavigationExtras = {
        //         queryParams: {
        //             batchId: this.batchId ? this.batchId : '',
        //             ordId: this.ordId ? this.ordId : '',
        //         },
        //     };
        //     this.router.navigate(['/roasted-coffee-batch/select-order-list'], navigationExtras);
        // } else {
        //     this.router.navigate(['/roasted-coffee-batch/select-order-list']);
        // }
    }
    setOrder(id: string) {
        this.showOrder = false;
        if (id !== '') {
            this.ordId = id;
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
                    this.downloadService.download(this.coffeeStory.qr_code_url).subscribe(
                        (res: Download) => {
                            if (res.state === 'DONE') {
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
}
