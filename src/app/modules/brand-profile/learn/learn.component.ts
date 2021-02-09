import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { maxWordCountValidator, fileCountValidator } from '@services';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { UserserviceService } from '@services';
import { RoasterserviceService } from '@services';
import * as _ from 'lodash';
@Component({
    selector: 'app-learn',
    templateUrl: './learn.component.html',
    styleUrls: ['./learn.component.scss'],
})
export class LearnComponent implements OnInit {
    roasterId: string;
    breadItems: any[];
    infoForm: FormGroup;

    appLanguage?: any;
    brandProfileActive: any = 0;
    countValue: any = 0;
    banner_title: string = '';
    intro_title: string = '';
    title: string = '';
    answer: string = '';
    answer1: string = '';
    answer2: string = '';
    answer3: string = '';
    answer4: string = '';
    imageUrl: any;
    banner_id: any;
    intro_id: any;
    step1_id: any;
    step2_id: any;
    step3_id: any;
    step4_id: any;
    banner_image_name: any;
    intro_image_name: any;
    step1_image_name: any;
    step2_image_name: any;
    step3_image_name: any;
    step4_image_name: any;

    constructor(
        private fb: FormBuilder,
        private formSrv: FormService,
        public globals: GlobalsService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public userService: UserserviceService,
        public route: Router,
        public roasterService: RoasterserviceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/welcome-aboard' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: 'Learn' },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            intro_file: [null, Validators.compose([Validators.required])],
            intro_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            step1_file: [null, Validators.compose([Validators.required])],
            step1_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            step1_short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
            step2_file: [null, Validators.compose([Validators.required])],
            step2_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            step2_short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
            step3_file: [null, Validators.compose([Validators.required])],
            step3_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            step3_short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
            step4_file: [null, Validators.compose([Validators.required])],
            step4_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            step4_short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
        });
        this.getLearnDetails();
    }

    getLearnDetails() {
        this.userService.getPageDetails(this.roasterId, 'learn').subscribe((res: any) => {
            if (res.success) {
                console.log('Learn:', res.result);
                this.infoForm.patchValue(res.result);
                if (res.result.banner_file) {
                    this.infoForm.controls.banner_file.setValue({
                        id: res.result.banner_file,
                        url: res.result.banner_file_url,
                    });
                }
                if (res.result.intro_file) {
                    this.infoForm.controls.intro_file.setValue({
                        id: res.result.intro_file,
                        url: res.result.intro_file_url,
                    });
                }
                for (let i = 1; i <= 4; i++) {
                    if (res.result[`step${i}_file`]) {
                        this.infoForm.controls[`step${i}_file`].setValue({
                            id: res.result[`step${i}_file`],
                            url: res.result[`step${i}_file_url`],
                        });
                    }
                }
            }
        });
    }

    saveBrandProfile() {
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                intro_file: this.infoForm.value.intro_file.id,
                step1_file: this.infoForm.value.step1_file.id,
                step2_file: this.infoForm.value.step2_file.id,
                step3_file: this.infoForm.value.step3_file.id,
                step4_file: this.infoForm.value.step4_file.id,
            };
            this.userService.updateHomeDetails(this.roasterId, postData, 'learn').subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Learn page Details updated successfully');
                    this.route.navigate(['/brand-profile']);
                } else {
                    this.toastrService.error('Error while updating details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }
}
