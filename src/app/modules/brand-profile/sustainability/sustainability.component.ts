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

@Component({
    selector: 'app-sustainability',
    templateUrl: './sustainability.component.html',
    styleUrls: ['./sustainability.component.scss'],
})
export class SustainabilityComponent implements OnInit {
    roasterId: string;
    roasterSlug: string;
    breadItems: any[];
    infoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private formSrv: FormService,
        public globals: GlobalsService,
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private roasterService: RoasterserviceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.roasterSlug = this.cookieService.get('roasterSlug');
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: 'Sustainability' },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            intro_file: [null, Validators.compose([Validators.required])],
            intro_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            section1_file: [null, Validators.compose([Validators.required])],
            section1_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            section1_description: ['', Validators.compose([Validators.required, maxWordCountValidator(70)])],
            section2_file: [null, Validators.compose([Validators.required])],
            section2_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            section2_description: ['', Validators.compose([Validators.required, maxWordCountValidator(70)])],
            section3_file: [null, Validators.compose([fileCountValidator(2)])],
            section3_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            section3_description: ['', Validators.compose([Validators.required, maxWordCountValidator(70)])],
            section4_file: [null, Validators.compose([Validators.required])],
            section4_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            section4_description: ['', Validators.compose([Validators.required, maxWordCountValidator(70)])],
            product_short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(40)])],
            product_label_icon: [null, Validators.compose([fileCountValidator(4)])],
        });
        this.getSubstainabilityDetails();
    }

    savePageData() {
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                intro_file: this.infoForm.value.intro_file.id,
                section1_file: this.infoForm.value.section1_file.id,
                section2_file: this.infoForm.value.section2_file.id,
                section3_file_1: this.infoForm.value.section3_file[0].id,
                section3_file_2: this.infoForm.value.section3_file[1].id,
                section4_file_1: this.infoForm.value.section4_file.id,
                product_label_icon_1: this.infoForm.value.product_label_icon[0].id,
                product_label_icon_2: this.infoForm.value.product_label_icon[1].id,
                product_label_icon_3: this.infoForm.value.product_label_icon[2].id,
                product_label_icon_4: this.infoForm.value.product_label_icon[3].id,
            };
            delete postData.section3_file;
            delete postData.section4_file;
            delete postData.product_label_icon;
            this.userService.updateHomeDetails(this.roasterId, postData, 'sustainability').subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Sustainability page Details updated successfully');
                    this.route.navigate(['/brand-profile']);
                } else {
                    this.toastrService.error('Error while updating details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    getSubstainabilityDetails() {
        this.userService.getPageDetails(this.roasterId, 'sustainability').subscribe((res: any) => {
            if (res.success) {
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
                const productIcons: any[] = [];
                for (let i = 1; i <= 4; i++) {
                    if (i === 3) {
                        const tempImages: any[] = [];
                        if (res.result[`section${i}_file_1`]) {
                            tempImages.push({
                                id: res.result[`section${i}_file_1`],
                                url: res.result[`section${i}_file_1_url`],
                            });
                        }
                        if (res.result[`section${i}_file_2`]) {
                            tempImages.push({
                                id: res.result[`section${i}_file_2`],
                                url: res.result[`section${i}_file_2_url`],
                            });
                        }
                        this.infoForm.controls.section3_file.setValue(tempImages);
                    } else if (i === 4) {
                        if (res.result[`section${i}_file_1`]) {
                            this.infoForm.controls[`section${i}_file`].setValue({
                                id: res.result[`section${i}_file_1`],
                                url: res.result[`section${i}_file_1_url`],
                            });
                        }
                    } else {
                        if (res.result[`section${i}_file`]) {
                            this.infoForm.controls[`section${i}_file`].setValue({
                                id: res.result[`section${i}_file`],
                                url: res.result[`section${i}_file_url`],
                            });
                        }
                    }
                    if (res.result[`product_label_icon_${i}`]) {
                        productIcons.push({
                            id: res.result[`product_label_icon_${i}`],
                            url: res.result[`product_label_icon_${i}_url`],
                        });
                    }
                }
                this.infoForm.controls.product_label_icon.setValue(productIcons);
            }
        });
    }
}
