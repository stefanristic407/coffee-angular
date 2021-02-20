import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-roasting-profile',
    templateUrl: './create-roasting-profile.component.html',
    styleUrls: ['./create-roasting-profile.component.scss'],
})
export class CreateRoastingProfileComponent implements OnInit {
    appLanguage?: any;

    roaster_id: string;
    loginButtonValue: string = 'Save';
    profileId: string;

    roastingForm: FormGroup;
    roastLevelArray: any = [];

    constructor(
        public globals: GlobalsService,
        public cookieService: CookieService,
        public router: Router,
        public route: ActivatedRoute,
        private userService: UserserviceService,
        public toastrService: ToastrService,
        private fb: FormBuilder,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;

        if (this.route.snapshot.queryParams['profileID']) {
            this.profileId = decodeURIComponent(this.route.snapshot.queryParams['profileID']);
            this.getRoastingProfile();
        }

        this.roastingForm = this.fb.group({
            roast_profile_name: ['', Validators.compose([Validators.required])],
            roast_level: ['', Validators.compose([Validators.required])],
            temperature: ['', Validators.compose([Validators.required])],
            roast_duration: ['', Validators.compose([Validators.required])],
            machine_type: ['', Validators.compose([Validators.required])],
        });
        this.roastLevelArray = [
            { label: 'Light', value: 1 },
            { label: 'Light Medium', value: 2 },
            { label: 'Medium', value: 3 },
            { label: 'Medium Dark', value: 4 },
            { label: 'Dark', value: 5 },
        ];
    }

    getRoastingProfile() {
        this.userService.getRoastingProfileDetail(this.roaster_id, this.profileId).subscribe((res) => {
            if (res && res.result) {
                const productDetails = res.result;
                const productFields = [
                    'roast_profile_name',
                    'roast_level',
                    'temperature',
                    'roast_duration',
                    'machine_type',
                ];
                productFields.forEach((ele) => {
                    const getValue = productDetails[ele];
                    this.roastingForm.controls[ele].setValue(getValue);
                });

                //     if (data['success'] == true) {
                //         this.profile_name = data['result'].roast_profile_name;
                //         this.roast_level = data['result'].roast_level;
                //         this.temperature = data['result'].temperature;
                //         this.roast_duration = data['result'].roast_duration;
                //         this.machine_type = data['result'].machine_type;
                //     }
                // });
            }
        });
    }

    // addRoastingProfile() {
    //     if (
    //         this.profile_name == '' ||
    //         this.roast_level == '' ||
    //         this.roast_duration == '' ||
    //         this.machine_type == '' ||
    //         this.temperature == ''
    //     ) {
    //     } else {
    //         var data = {
    //             roast_profile_name: this.profile_name,
    //             roast_level: parseInt(this.roast_level),
    //             roast_duration: parseInt(this.roast_duration),
    //             temperature: parseInt(this.temperature),
    //             machine_type: this.machine_type,
    //         };
    //         if (this.editFlag == true) {
    //             this.userService.updateRoastingProfileDetail(this.roaster_id, this.profileId, data).subscribe((res) => {
    //                 if (res['success'] == true) {
    //                     this.loginButtonValue = 'Save';
    //                     this.toastrService.success('The Roasting Profile has been Updated.');
    //                     this.router.navigate(['/features/roasting-profile']);
    //                 } else {
    //                     this.loginButtonValue = 'Save';
    //                     this.toastrService.error('Error while updating the roasting profile');
    //                 }
    //             });
    //         } else {
    //             this.userService.addRoastingProfile(this.roaster_id, data).subscribe((response) => {
    //                 if (response['success'] == true) {
    //                     this.loginButtonValue = 'Save';
    //                     this.toastrService.success('The Roasting Profile has been added.');
    //                     this.router.navigate(['/features/roasting-profile']);
    //                 } else {
    //                     this.loginButtonValue = 'Save';
    //                     this.toastrService.error('Error while adding the roasting profile');
    //                 }
    //             });
    //         }
    //     }
    // }
    createRoastingProfile(productObj) {
        this.userService.addRoastingProfile(this.roaster_id, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasting Profile has been added.');
                    this.router.navigate(['/features/roasting-profile']);
                } else {
                    this.toastrService.error('Error while adding the roasting profile');
                }
            },
            (err) => {
                this.toastrService.error('Error while adding the roasting profile');
            },
        );
    }
    updateRoastingProfile(productObj) {
        this.userService.updateRoastingProfileDetail(this.roaster_id, this.profileId, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasting Profile has been updated.');
                    this.router.navigate(['/features/roasting-profile']);
                } else {
                    this.toastrService.error('Error while updating the roasting profile');
                }
            },
            (err) => {
                this.toastrService.error('Error while updating the roasting profile');
            },
        );
    }
    validateForms() {
        let returnFlag = true;
        if (!this.roastingForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        return returnFlag;
    }
    onSave(): void {
        if (this.validateForms()) {
            const productObj = this.roastingForm.value;
            if (this.profileId) {
                this.updateRoastingProfile(productObj);
            } else {
                this.createRoastingProfile(productObj);
            }
        } else {
            this.roastingForm.markAllAsTouched();

            this.toastrService.error('Please fill all Data');
        }
    }
    onCancel() {
        this.router.navigate(['/features/roasting-profile']);
    }
}
