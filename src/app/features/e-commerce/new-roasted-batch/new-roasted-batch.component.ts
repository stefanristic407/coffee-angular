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
    styleUrls: ['./new-roasted-batch.component.css'],
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

        if (this.route.snapshot.queryParams['batchId']) {
            this.editFlag = true;
            this.batchId = decodeURIComponent(this.route.snapshot.queryParams['batchId']);
            this.getRoastedBatch();
        }
        if (this.globals.selected_order_id == undefined) {
            this.showDetails = false;
        } else {
            this.showDetails = true;
            this.getOrderDetails();
        }
        this.batchForm = this.fb.group({
            roast_batch_name: ['', Validators.compose([Validators.required])],
            // roast_level: ['', Validators.compose([Validators.required])],
            // temperature: ['', Validators.compose([Validators.required])],
            // roast_duration: ['', Validators.compose([Validators.required])],
            // machine_type: ['', Validators.compose([Validators.required])],
        });
        this.supplyBreadCrumb();
    }

    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/features/welcome-aboard',
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

    setCupping(cuppdata: any) {
        this.cupping = cuppdata;
    }
    toggleCupping() {
        this.showCupping = !this.showCupping;
        if (this.showCupping == false) {
            document.getElementById('cupping_id').style.border = '1px solid #d6d6d6';
        } else {
            document.getElementById('cupping_id').style.border = '1px solid #d6d6d6';
        }
    }

    addLang(value: any) {
        const id = value.id;
        const name = value.name;

        // Add our fruit
        if ((name || '').trim()) {
            this.langChips.push(value);
            this.flavour_profile_array.push(id);
        }

        console.log(this.flavour_profile_array);

        // // Reset the input value
        // if (input) {
        //   input.value = '';
        // }
    }

    remove(lang: any): void {
        const index = this.langChips.indexOf(lang);
        // this.langChips.slice(lang);

        console.log(this.flavour_profile_array);
        if (index >= 0) {
            this.langChips.splice(index, 1);
            this.flavour_profile_array.splice(index, 1);
        }
    }

    getRoastedBatch() {
        this.userService.getRoastedBatchDetail(this.roaster_id, this.batchId).subscribe((data) => {
            if (data['success'] == true) {
                this.roast_batch_name = data['result'].roast_batch_name;
                this.flavour = data['result'].flavour;
                this.notes = data['result'].roaster_notes;
                this.acidity = data['result'].acidity;
                this.aroma = data['result'].aroma;
                this.body = data['result'].body;
                this.processing = data['result'].processing;
                this.quantity_unit = data['result'].roasting_profile_unit;
                this.quantity = data['result'].roasting_profile_quantity;
                this.flavour_array = data['result'].flavour_profile;
                this.flavour_array.forEach((element, index) => {
                    let chips = {
                        id: element.flavour_profile_id,
                        name: element.flavour_profile_name,
                    };
                    this.langChips.push(chips);
                    this.flavour_profile_array.push(element.flavour_profile_id);
                });
                this.cupping = data['result'].roasting_profile_id;
                this.roasting_profile_name = data['result'].roasting_profile_name;
            }
        });
    }

    getRoastingProfiles() {
        this.roasterService.getRoastingProfile(this.roaster_id).subscribe((data) => {
            if (data['success'] == true) {
                this.roastingProfile = data['result'];
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

    countryName(value: any) {
        return this.roasteryProfileService.countryList.find((con) => con.isoCode == value).name;
    }

    addRoastedCoffeeBatch() {
        // this.loginButtonValue = "Saving";
        // if (this.profile_name == "" || this.roast_level == '' || this.roast_duration == '' || this.machine_type == '' || this.temperature == '') {
        //   this.toastrService.error("Please fill up the details");
        // }
        // else{
        console.log(this.orderId);
        var data = {
            roast_batch_name: this.roast_batch_name,
            order_id: parseInt(this.orderId),
            roasting_profile_id: parseInt(this.cupping),
            roasting_profile_quantity: parseInt(this.quantity),
            roasting_profile_unit: this.quantity_unit,
            flavour_profile: this.flavour_profile_array,
            aroma: parseInt(this.aroma),
            body: parseInt(this.body),
            flavour: parseInt(this.flavour),
            acidity: parseInt(this.acidity),
            processing: this.processing,
            roaster_notes: this.notes,
        };
        if (this.editFlag == true) {
            this.userService.updateRoastedBatchDetail(this.roaster_id, this.batchId, data).subscribe((res) => {
                if (res['success'] == true) {
                    // this.loginButtonValue = "Save";
                    this.toastrService.success('The Roasted Batch has been Updated.');
                    this.router.navigate(['/features/roasted-coffee-batch']);
                } else {
                    // this.loginButtonValue = "Save";
                    this.toastrService.error('Error while updating the Roasted Batch');
                }
            });
        } else {
            this.userService.addRoastedBatches(this.roaster_id, data).subscribe((response) => {
                if (response['success'] == true) {
                    // this.loginButtonValue = "Save";
                    this.toastrService.success('The Roasted Batch has been added.');
                    this.router.navigate(['/features/roasted-coffee-batch']);
                } else {
                    // this.loginButtonValue = "Save";
                    this.toastrService.error('Error while adding the Roasted Batch');
                }
            });
        }
    }
    // }
    onSave() {}
}
