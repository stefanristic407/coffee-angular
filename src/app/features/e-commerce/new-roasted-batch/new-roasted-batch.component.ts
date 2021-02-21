import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-roasted-batch',
    templateUrl: './new-roasted-batch.component.html',
    styleUrls: ['./new-roasted-batch.component.scss'],
})
export class NewRoastedBatchComponent implements OnInit {
    cupping_type: any = '';
    cupping: any;
    showCupping: boolean = true;
    langChips: any = [];
    selectable = true;
    removable = true;
    appLanguage?: any;
    greenIconShow: boolean = false;
    roaster_id: string;
    roastingProfile: any;
    roasterFlavourProfile: any;
    showDetails: boolean = false;
    notes: any;
    aroma: any;
    flavour: any;
    body: any;
    processing: any;
    acidity: any;
    quantity: any;
    quantity_unit: any = 'kg';
    roast_batch_name: any;
    editFlag: boolean = false;
    batchId: string;
    flavour_profile_array: any = [];
    orderId: string;
    orderDetails: any = {};
    rating: any;
    roasting_profile_name: any;
    flavour_array: any = [];

    breadCrumbItem: MenuItem[] = [];
    batchForm: FormGroup;
    roastProfileArray: any = [];
    weightTypeArray: any = '';
    ordId: any;

    constructor(
        public globals: GlobalsService,
        public userService: UserserviceService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public router: Router,
        public route: ActivatedRoute,
        public roasteryProfileService: RoasteryProfileService,
        public cookieService: CookieService,
        private fb: FormBuilder,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.cupping = '';
        this.appLanguage = this.globals.languageJson;
        this.getRoastingProfiles();
        this.getRoasterFlavourProfile();

        if (this.route.snapshot.queryParams['batchId'] && this.route.snapshot.queryParams['ordId']) {
            this.editFlag = true;
            this.batchId = decodeURIComponent(this.route.snapshot.queryParams['batchId']);
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams['ordId']);
            if (this.ordId) {
                this.getOrderDetails();
            }
            this.getRoastedBatch();
        } else if (this.route.snapshot.queryParams['ordId']) {
            this.ordId = decodeURIComponent(this.route.snapshot.queryParams['ordId']);
        } else {
            this.ordId = 'select the order';
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
            roasting_profile_unit: [''],
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
            routerLink: '/features/roasted-coffee-batch',
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
    addLang(value: any) {
        const id = value.id;
        const name = value.name;
        if ((name || '').trim()) {
            this.langChips.push(value);
            this.flavour_profile_array.push(id);
        }
    }

    remove(lang: any): void {
        const index = this.langChips.indexOf(lang);
        console.log(this.flavour_profile_array);
        if (index >= 0) {
            this.langChips.splice(index, 1);
            this.flavour_profile_array.splice(index, 1);
        }
    }

    getRoastedBatch() {
        this.userService.getRoastedBatchDetail(this.roaster_id, this.batchId).subscribe((res) => {
            if (res && res.result) {
                this.flavour_array = res.result['flavour_profile'];
                console.log(this.flavour_array);
                this.flavour_array.forEach((element, index) => {
                    let chips = {
                        id: element.flavour_profile_id,
                        name: element.flavour_profile_name,
                    };
                    this.langChips.push(chips);
                    this.flavour_profile_array.push(element.flavour_profile_id);
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
                ];

                batchFields.forEach((ele) => {
                    const getValue = batchDetails[ele];
                    this.batchForm.controls[ele].setValue(getValue);
                });
            }
        });
    }

    getRoastingProfiles() {
        this.roasterService.getRoastingProfile(this.roaster_id).subscribe((data) => {
            if (data['success'] == true) {
                this.roastingProfile = data['result'];
                this.roastingProfile.forEach((element) => {
                    const sample = {
                        label: element.roast_profile_name,
                        value: element.id,
                    };
                    this.roastProfileArray.push(sample);
                });
                console.log(this.roastProfileArray);
            } else {
                this.toastrService.error('Error while getting the roasting profiles');
            }
        });
    }

    getRoasterFlavourProfile() {
        this.userService.getRoasterFlavourProfile(this.roaster_id).subscribe((data) => {
            if (data['success'] == true) {
                this.roasterFlavourProfile = data['result'];
            } else {
                this.toastrService.error('Error while getting the roasting Flavour Profile');
            }
        });
    }

    getOrderDetails() {
        this.orderId = this.globals.selected_order_id;
        this.roasterService.getViewOrderDetails(this.roaster_id, this.orderId).subscribe((response) => {
            if (response['success'] == true) {
                this.orderDetails = response['result'];
                console.log(this.orderDetails);
                this.getRatingData(this.orderDetails.estate_id);
            } else {
                this.toastrService.error('Error while getting the order list');
            }
        });
    }
    getRatingData(value: any) {
        this.userService.getAvailableEstateList(this.roaster_id, value).subscribe((data) => {
            if (data['success'] == true) {
                this.rating = data['result'].rating;
            } else {
                this.rating = 0.0;
            }
        });
    }

    updateRoastedBatch(productObj) {
        this.userService.updateRoastedBatchDetail(this.roaster_id, this.batchId, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasted Batch has been updated.');
                    this.router.navigate(['/features/roasting-profile']);
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
        this.userService.addRoastedBatches(this.roaster_id, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasted Batch  has been added.');
                    this.router.navigate(['/features/roasted-coffee-batch']);
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
            const productObj = this.batchForm.value;
            productObj['flavour_profile'] = this.flavour_profile_array;
            productObj['processing'] = 'Test';
            productObj['order_id'] = parseInt(this.ordId);
            console.log(productObj);
            if (this.batchId) {
                this.updateRoastedBatch(productObj);
            } else {
                this.createRoastedBatch(productObj);
            }
        } else {
            this.batchForm.markAllAsTouched();

            this.toastrService.error('Please fill all Data');
        }
    }
    onCancel() {}
}
