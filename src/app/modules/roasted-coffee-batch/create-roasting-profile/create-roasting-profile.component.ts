import { Component, OnInit } from '@angular/core';
import { AuthService, GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-roasting-profile',
    templateUrl: './create-roasting-profile.component.html',
    styleUrls: ['./create-roasting-profile.component.scss'],
})
export class CreateRoastingProfileComponent implements OnInit {
    appLanguage?: any;
    roasterId: number;
    profileId: string;
    roastingForm: FormGroup;
    roastLevelArray: any = [];
    isLoading = false;

    constructor(
        public globals: GlobalsService,
        public cookieService: CookieService,
        public router: Router,
        public route: ActivatedRoute,
        private userService: UserserviceService,
        public toastrService: ToastrService,
        private fb: FormBuilder,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;

        if (this.route.snapshot.queryParams.profileID) {
            this.profileId = decodeURIComponent(this.route.snapshot.queryParams.profileID);
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
        this.isLoading = true;
        this.userService.getRoastingProfileDetail(this.roasterId, this.profileId).subscribe((res) => {
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
            }
            this.isLoading = false;
        });
    }

    createRoastingProfile(productObj) {
        this.userService.addRoastingProfile(this.roasterId, productObj).subscribe(
            (res) => {
                console.log('create roasting profile response <>>>>>>>>>>>', res);
                if (res && res.success) {
                    this.toastrService.success('The Roasting Profile has been added.');
                    this.router.navigate(['/roasted-coffee-batch/roasting-profile']);
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
        this.userService.updateRoastingProfileDetail(this.roasterId, this.profileId, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasting Profile has been updated.');
                    this.router.navigate(['/roasted-coffee-batch/roasting-profile']);
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
        this.router.navigate(['/roasted-coffee-batch/roasting-profile']);
    }
}
