import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { maxWordCountValidator, fileCountValidator } from '@services';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    loaded = false;
    breadItems: any[];
    certificates: any[];
    roasterId: string;
    featureId: any;

    infoForm: FormGroup;

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
            { label: 'Farm Link' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: this.globals.languageJson?.home_page },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            intro_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
            wizard_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            wizard_sub_heading: ['', Validators.compose([maxWordCountValidator(15)])],
            wizard_image: [null, Validators.compose([Validators.required])],
            featured_products_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            traceability_story_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            traceability_story_sub_heading: ['', Validators.compose([maxWordCountValidator(30)])],
            traceability_story_file_1: [null, Validators.compose([Validators.required])],
            sustainability_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            sustainability_sub_heading: ['', Validators.compose([maxWordCountValidator(25)])],
            sustainability_file_1: [null, Validators.compose([Validators.required])],
            roastery_images_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            roastery_images: [null, Validators.compose([fileCountValidator(2)])],
        });
        this.getHomeDetails();
        this.loaded = true;
    }

    onFileChange(event: any, width: any, height: any, FieldValue: any) {
        const files = event.target.files;

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                if (
                    files[i].type === 'image/png' ||
                    files[i].type === 'image/jpg' ||
                    files[i].type === 'image/jpeg' ||
                    files[0].type === 'image/gif'
                ) {
                    const reader = new FileReader();
                    const img = new Image();
                    const fileValue = event.target.files[i];
                    // console.log(fileValue)
                    img.src = window.URL.createObjectURL(fileValue);
                    reader.readAsDataURL(fileValue);
                    reader.onload = () => {
                        setTimeout(() => {
                            const widthValue = img.naturalWidth;
                            const heightValue = img.naturalHeight;

                            window.URL.revokeObjectURL(img.src);
                            // console.log(widthValue + '*' + widthValue);
                            if (widthValue === width && widthValue === height) {
                                alert(`photo should be ${width} x ${height} size`);
                            } else {
                                const imgURL = reader.result;
                                if (imgURL) {
                                    const formData: FormData = new FormData();
                                    const fileName = fileValue.name;
                                    formData.append('file', fileValue, fileName);
                                    formData.append('name', fileName);
                                    formData.append('file_module', 'Brand-Profile');
                                    formData.append('api_call', '/ro/' + this.roasterId + '/file-manager/files');
                                    formData.append('token', this.cookieService.get('Auth'));
                                    // this.roasterService.uploadFiles(formData).subscribe((data) => {
                                    //     if (data['success'] === true) {
                                    //         this.toastrService.success('File uploaded successfully');
                                    //         if (FieldValue === 'Traceability') {
                                    //             this['traceability_id_' + [i + 1]] = data['result'].id;
                                    //             this['traceability_image_name_' + [i + 1]] = fileName;
                                    //         } else if (FieldValue === 'Substainability') {
                                    //             this['substainability_id_' + [i + 1]] = data['result'].id;
                                    //             this['substainability_image_name_' + [i + 1]] = fileName;
                                    //         } else if (FieldValue === 'Feature') {
                                    //             this.feature_id = data['result'].id;
                                    //             this.feature_image_name = fileName;
                                    //         }
                                    //     } else {
                                    //         this.toastrService.error('Error while uploading the File');
                                    //     }
                                    // });
                                }
                            }
                        }, 2000);
                    };
                }
            }
        }
    }

    saveHomeProfile() {
        console.log(this.infoForm.value);
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                wizard_image: this.infoForm.value.wizard_image.id,
                traceability_story_file_1: this.infoForm.value.traceability_story_file_1.id,
                sustainability_file_1: this.infoForm.value.sustainability_file_1.id,
                roastery_image_1: this.infoForm.value.roastery_images[0].id,
                roastery_image_2: this.infoForm.value.roastery_images[1].id,
            };
            delete postData.roastery_images;
            console.log(postData);
            this.userService.updateHomeDetails(this.roasterId, postData, 'home-page').subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Home page Details updated successfully');
                    this.route.navigate(['/brand-profile']);
                } else {
                    this.toastrService.error('Error while updating details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    getHomeDetails() {
        this.userService.getPageDetails(this.roasterId, 'home-page').subscribe((res: any) => {
            if (res.success) {
                console.log('Home page data:', res.result);
                this.infoForm.patchValue(res.result);
                if (res.result.banner_file) {
                    this.infoForm.controls.banner_file.setValue({
                        id: res.result.banner_file,
                        url: res.result.banner_file_url,
                    });
                }
                if (res.result.wizard_image) {
                    this.infoForm.controls.wizard_image.setValue({
                        id: res.result.wizard_image,
                        url: res.result.wizard_image_url,
                    });
                }
                if (res.result.traceability_story_file_1) {
                    this.infoForm.controls.traceability_story_file_1.setValue({
                        id: res.result.traceability_story_file_1,
                        url: res.result.traceability_story_file_1_url,
                    });
                }
                if (res.result.sustainability_file_1) {
                    this.infoForm.controls.sustainability_file_1.setValue({
                        id: res.result.sustainability_file_1,
                        url: res.result.sustainability_file_1_url,
                    });
                }
                const rosteryImages: any[] = [];
                if (res.result.roastery_image_1) {
                    rosteryImages.push({
                        id: res.result.roastery_image_1,
                        url: res.result.roastery_image_1_url,
                    });
                }
                if (res.result.roastery_image_2) {
                    rosteryImages.push({
                        id: res.result.roastery_image_2,
                        url: res.result.roastery_image_2_url,
                    });
                }
                this.infoForm.controls.roastery_images.setValue(rosteryImages);

                // this.banner_image_name = await this.userService
                //     .getFileDetails(this.roaster_id, this.banner_id)
                //     .pipe(map((response) => response['name']))
                //     .toPromise();
            }
        });
    }
}
