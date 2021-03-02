import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-roasted-batch',
    templateUrl: './new-roasted-batch.component.html',
    styleUrls: ['./new-roasted-batch.component.scss'],
})
export class NewRoastedBatchComponent implements OnInit {
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
    batchId: string;
    flavourProfileArray: any = [];
    orderId: string;
    orderDetails: any = {};
    rating: any;
    flavourArray: any = [];

    breadCrumbItem: MenuItem[] = [];
    batchForm: FormGroup;
    roastProfileArray: any = [];
    weightTypeArray: any = '';
    ordId: any;
    // isflavourProfile = false;
    getFlavourArray: any = [];
    constructor(
        public globals: GlobalsService,
        public userService: UserserviceService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
        public route: ActivatedRoute,
        public cookieService: CookieService,
        private fb: FormBuilder,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
        this.getRoastingProfiles();

        if (this.route.snapshot.queryParams.batchId && this.route.snapshot.queryParams.ordId) {
            this.batchId = decodeURIComponent(this.route.snapshot.queryParams.batchId);
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams.ordId);
            if (this.ordId) {
                this.getOrderDetails();
            }
            this.getRoastedBatch();
        } else if (this.route.snapshot.queryParams.ordId) {
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams.ordId);
            this.getOrderDetails();
            this.getRoasterFlavourProfile();
        } else {
            this.ordId = 'select the order';
            this.getRoasterFlavourProfile();
        }
        this.batchForm = this.fb.group({
            roast_batch_name: ['', Validators.compose([Validators.required])],
            roasting_profile_id: ['', Validators.compose([Validators.required])],
            roasting_profile_quantity: ['', Validators.compose([Validators.required])],
            aroma: ['', Validators.compose([Validators.required])],
            acidity: ['', Validators.compose([Validators.required])],
            body: ['', Validators.compose([Validators.required])],
            flavour: ['', Validators.compose([Validators.required])],
            roaster_notes: ['', Validators.compose([Validators.required])],
            roasting_profile_unit: ['lb'],
            roaster_ref_no: [{ value: '', disabled: true }],
            batch_ref_no: [''],
            processing: [{ value: '', disabled: true }],
        });
        this.supplyBreadCrumb();

        this.weightTypeArray = [
            { label: 'lb', value: 'lb' },
            { label: 'kg', value: 'kg' },
        ];
    }

    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.roasted_coffee,
            routerLink: '/roasted-coffee-batch/roasted-coffee-batchs',
            disabled: false,
        };
        const obj3: MenuItem = {
            label: this.globals.languageJson?.new_roasted_batch,
            routerLink: 'features/add-product',
            disabled: false,
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
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
                const batchDetails = res.result;
                const batchFields = [
                    'roast_batch_name',
                    'roaster_notes',
                    'flavour',
                    'acidity',
                    'aroma',
                    'body',
                    'roasting_profile_quantity',
                    'roasting_profile_unit',
                    'roasting_profile_id',
                    // 'roaster_ref_no',
                    'batch_ref_no',
                    // 'processing',
                ];

                batchFields.forEach((ele) => {
                    const getValue = batchDetails[ele];
                    this.batchForm.controls[ele].setValue(getValue);
                });
            }
            this.getRoasterFlavourProfile();
        });
    }

    getRoastingProfiles() {
        this.roasterService.getRoastingProfile(this.roasterId).subscribe((data) => {
            if (data.success) {
                this.roastingProfile = data.result;
                this.roastingProfile.forEach((element) => {
                    const sample = {
                        label: element.roast_profile_name,
                        value: element.id,
                    };
                    this.roastProfileArray.push(sample);
                });
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
        this.orderId = this.globals.selected_order_id;
        this.roasterService.getViewOrderDetails(this.roasterId, this.ordId).subscribe((response) => {
            if (response.success) {
                this.orderDetails = response.result;
                this.getRatingData(this.orderDetails.estate_id);
                this.batchForm.controls['roaster_ref_no'].setValue(this.orderDetails.order_reference);
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
        if (this.ordId && this.batchId) {
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    batchId: this.batchId ? this.batchId : '',
                    ordId: this.ordId ? this.ordId : '',
                },
            };
            this.router.navigate(['/roasted-coffee-batch/select-order-list'], navigationExtras);
        } else {
            this.router.navigate(['/roasted-coffee-batch/select-order-list']);
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
}
