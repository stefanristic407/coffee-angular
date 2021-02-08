import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { maxWordCountValidator, fileCountValidator } from '@services';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { UserserviceService } from '@services';
@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
    roasterId: string;
    breadItems: any[];
    infoForm: FormGroup;

    appLanguage?: any;
    brandProfileActive: any = 0;
    banner_file: any;
    intro_file_1: any;
    intro_file_2: any;
    file: any;
    banner_title: string = '';
    intro_title: string = '';
    title: string = '';
    short_description: string = '';
    intro_short_description: string = '';
    banner_image_name: any;
    intro_image_name_1: string = '';
    intro_image_name_2: string = '';
    file_image_name: any;
    teamList: [] = [];
    select_user = '';
    new_users = '';
    selectedMembers: [] = [];
    roasterUsers: any[] = [];
    showAddEmp = true;
    addUserId: any = '';
    assignButtonValue = '';

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
            { label: 'About us' },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            intro_file_1: [null, Validators.compose([Validators.required])],
            intro_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            intro_short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
            file: [null, Validators.compose([Validators.required])],
            title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(100)])],
            team_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            team_description: ['', Validators.compose([Validators.required, maxWordCountValidator(30)])],
        });
        this.language();
        this.getAboutDetails();
        this.getMembers();
        this.getRoasterUsers();
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.brandProfileActive++;
    }

    getAboutDetails() {
        this.userService.getPageDetails(this.roasterId, 'about-us').subscribe((res: any) => {
            if (res.success) {
                console.log('About us:', res.result);
                this.infoForm.patchValue(res.result);
                if (res.result.banner_file) {
                    this.infoForm.controls.banner_file.setValue({
                        id: res.result.banner_file,
                        url: res.result.banner_file_url,
                    });
                }
                if (res.result.intro_file_1) {
                    this.infoForm.controls.intro_file_1.setValue({
                        id: res.result.intro_file_1,
                        url: res.result.intro_file_1_url,
                    });
                }
                if (res.result.file) {
                    this.infoForm.controls.file.setValue({
                        id: res.result.file,
                        url: res.result.file_url,
                    });
                }

                (this.title = res['result'].title),
                    (this.intro_short_description = res['result'].intro_short_description);
                (this.file = res['result'].file), (this.banner_title = res['result'].banner_title);
                this.intro_title = res['result'].intro_title;
                (this.banner_file = res['result'].banner_file),
                    (this.short_description = res['result'].short_description),
                    (this.intro_file_1 = res['result'].intro_file_1),
                    (this.intro_file_2 = res['result'].intro_file_2);
            }
        });
    }

    //save the upload files
    onFileChange(event: any, width: any, height: any, FieldValue: any) {
        var files = event.target.files;
        // this.fileEvent = this.files;
        if (FieldValue == 'Intro' && files.length != 2) {
            if (files.length > 2) {
                this.toastrService.error('You can only upload a maximum of 2 files');
                return;
            } else {
                this.toastrService.error('Please upload 2 files');
                return;
            }
        }
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                if (
                    files[i].type == 'image/png' ||
                    files[i].type == 'image/jpg' ||
                    files[i].type == 'image/jpeg' ||
                    files[0].type == 'image/gif'
                ) {
                    let reader = new FileReader();
                    let img = new Image();
                    let fileValue = event.target.files[i];
                    img.src = window.URL.createObjectURL(fileValue);
                    reader.readAsDataURL(fileValue);
                    reader.onload = () => {
                        setTimeout(() => {
                            const widthValue = img.naturalWidth;
                            const heightValue = img.naturalHeight;

                            window.URL.revokeObjectURL(img.src);
                            console.log(widthValue + '*' + widthValue);
                            if (widthValue === width && widthValue === height) {
                                alert(`photo should be ${width} x ${height} size`);
                            } else {
                                var imgURL = reader.result;
                                if (imgURL) {
                                    let formData: FormData = new FormData();
                                    console.log(files[0]);
                                    formData.append('file', fileValue, fileValue.name);
                                    formData.append('name', fileValue.name);
                                    formData.append('file_module', 'Brand-Profile');
                                    formData.append('api_call', '/ro/' + this.roasterId + '/file-manager/files');
                                    formData.append('token', this.cookieService.get('Auth'));
                                    this.roasterService.uploadFiles(formData).subscribe((data) => {
                                        if (data['success'] == true) {
                                            this.toastrService.success('File uploaded successfully');
                                            if (FieldValue == 'Banner') {
                                                this.banner_file = data['result'].id;
                                                this.banner_image_name = fileValue.name;
                                            } else if (FieldValue == 'Intro') {
                                                this['intro_file_' + [i + 1]] = data['result'].id;
                                                // this.intro_file = data['result'].id;
                                                this['intro_image_name_' + [i + 1]] = fileValue.name;
                                            } else if (FieldValue == 'File') {
                                                this.file = data['result'].id;
                                                this.file_image_name = fileValue.name;
                                            }
                                        } else {
                                            this.toastrService.error('Error while uploading the File');
                                        }
                                    });
                                }
                            }
                        }, 2000);
                        // console.log(imgURL);
                    };
                } else if (
                    files[i].type == 'video/mp4' ||
                    files[i].type == 'video/mpeg' ||
                    files[i].type == 'video/mov' ||
                    files[i].type == 'video/wmv' ||
                    files[i].type == 'video/flv' ||
                    files[i].type == 'video/webm'
                ) {
                    console.log('Video');
                    let fileValue = event.target.files[i];
                    let formData: FormData = new FormData();
                    formData.append('file', fileValue, fileValue.name);
                    formData.append('name', fileValue.name);
                    formData.append('file_module', 'Brand-Profile');
                    formData.append('api_call', '/ro/' + this.roasterId + '/file-manager/files');
                    formData.append('token', this.cookieService.get('Auth'));
                    this.roasterService.uploadFiles(formData).subscribe((data) => {
                        if (data['success'] == true) {
                            this.toastrService.success('File uploaded successfully');
                            if (FieldValue == 'Banner') {
                                this.banner_file = data['result'].id;
                                this.banner_image_name = fileValue.name;
                            } else if (FieldValue == 'Intro') {
                                this['intro_file_' + [i + 1]] = data['result'].id;
                                this['intro_image_name_' + [i + 1]] = fileValue.name;
                            } else if (FieldValue == 'File') {
                                this.file = data['result'].id;
                                this.file_image_name = fileValue.name;
                            }
                        } else {
                            this.toastrService.error('Error while uploading the File');
                        }
                    });
                } else {
                    this.toastrService.error('If image, please select JPG,PNG or JPEG ');
                    this.toastrService.error('If Video, Please select MP4,MOV,WMV');
                }
            } //for loop
        }
    }

    saveAboutProfile() {
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                intro_file_1: this.infoForm.value.intro_file_1.id,
                file: this.infoForm.value.file.id,
            };
            delete postData.roastery_images;
            this.userService.updateHomeDetails(this.roasterId, postData, 'about-us').subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('About page Details updated successfully');
                    this.route.navigate(['/brand-profile']);
                } else {
                    this.toastrService.error('Error while updating details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    selectUser(value) {
        this.new_users = value.firstname;
        // console.log(value)
    }

    getRoasterUsers() {
        this.roasterService.getRoasterUsers(this.roasterId).subscribe((data) => {
            if (data['success'] == true) {
                this.roasterUsers = data['result'];
            }
        });
    }

    getMembers() {
        this.userService.getTeamMembers(this.roasterId, 'top-contacts').subscribe((data) => {
            this.teamList = data['result'];
            console.log(data);
        });
    }

    addMember() {
        // return;
        const payload = {
            user_id: +this.addUserId,
        };
        this.roasterService.addRoasterContacts(this.roasterId, payload).subscribe(
            (data) => {
                if (data['success'] == true) {
                    this.toastrService.success('Contact added successfully');
                    this.showAddEmp = true;
                    this.getMembers();
                }
            },
            (err) => {
                this.toastrService.error('Error while updating details');
            },
        );
    }

    removeUser(id) {
        this.roasterService.deleteRoasterContacts(this.roasterId, id).subscribe(
            (data) => {
                if (data['success'] == true) {
                    this.toastrService.success('Contact removed successfully');
                    this.showAddEmp = true;
                    this.getMembers();
                }
            },
            (err) => {
                this.toastrService.success('Error while updating');
            },
        );
    }

    cancelAssign() {
        this.showAddEmp = true;
    }
}
