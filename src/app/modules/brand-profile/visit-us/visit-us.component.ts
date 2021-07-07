import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { COUNTRY_LIST } from '@constants';
import { maxWordCountValidator } from '@utils';
import { AuthService, BrandService, CommonService, GeneralService, GlobalsService, UserService } from '@services';
import { ConfirmComponent } from '@shared';
import * as _ from 'underscore';

@Component({
    selector: 'app-visit-us',
    templateUrl: './visit-us.component.html',
    styleUrls: ['./visit-us.component.scss'],
})
export class VisitUsComponent implements OnInit {
    public readonly COUNTRY_LIST = COUNTRY_LIST;
    roasterId: number;
    breadItems: any[];
    infoForm: FormGroup;
    profileForm: FormGroup;
    cities: any[] = [];
    questionForm: FormGroup;
    editQuestion = false;
    selQuestion = null;

    savedFaqArray: any[] = [];

    latitude: number;
    longitude: number;
    zoom = 13;

    constructor(
        public dialogSrv: DialogService,
        private fb: FormBuilder,
        private router: Router,
        public globals: GlobalsService,
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private userService: UserService,
        public generalService: GeneralService,
        private brandService: BrandService,
        private authService: AuthService,
        private commonService: CommonService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }
    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: 'Visit us' },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            store_open_days: ['', Validators.compose([Validators.required])],
            storeTime: [null],
        });
        this.profileForm = this.fb.group({
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: [''],
            city: ['', Validators.compose([Validators.required])],
            zipcode: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            phone: ['', Validators.compose([Validators.required])],
        });
        this.getVisitDetails();
        this.getProfile();
        this.getFAQList();
    }

    getVisitDetails() {
        this.userService.getPageDetails(this.roasterId, 'visit-us').subscribe(async (res: any) => {
            if (res.success) {
                this.infoForm.patchValue(res.result);
                this.infoForm.get('storeTime').setValue([res.result.store_open_time, res.result.store_close_time]);
                if (res.result.banner_file) {
                    this.infoForm.controls.banner_file.setValue({
                        id: res.result.banner_file,
                        url: res.result.banner_file_url,
                    });
                }
            }
        });
    }

    getProfile() {
        this.generalService.getProfile().subscribe((res: any) => {
            this.profileForm.patchValue(res.result);
            this.latitude = res.result.latitude;
            this.longitude = res.result.longitude;
            this.changeCountry();
        });
    }

    savePageData() {
        if (this.infoForm.valid && this.profileForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                store_open_time: this.infoForm.value.storeTime[0],
                store_close_time: this.infoForm.value.storeTime[1],
            };
            delete postData.storeTime;
            const promises = [];
            promises.push(
                new Promise((resolve, reject) =>
                    this.brandService.updatePageDetails('visit-us', postData).subscribe((res: any) => {
                        if (res.success) {
                            resolve(res.result);
                        } else {
                            reject();
                        }
                    }),
                ),
            );
            const profileData = {
                ...this.profileForm.value,
                latitude: this.latitude,
                longitude: this.longitude,
            };
            promises.push(
                new Promise((resolve, reject) =>
                    this.generalService.updateProfile(profileData).subscribe((res: any) => {
                        if (res.success) {
                            resolve(res.result);
                        } else {
                            reject();
                        }
                    }),
                ),
            );

            Promise.all(promises)
                .then((result) => {
                    this.toastrService.success('Visit page Details updated successfully');
                    this.router.navigate(['/brand-profile']);
                })
                .catch((error) => {
                    this.toastrService.error('Error while updating details');
                });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    changeCountry() {
        if (this.profileForm.value.country) {
            this.cities = [];
            this.commonService.getCountry(this.profileForm.value.country).cities.forEach((element) => {
                this.cities.push({ label: element, value: element });
            });
        }
    }

    getFAQList() {
        this.userService.getFAQList(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.savedFaqArray = res.result || [];
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousIndex !== event.currentIndex) {
            moveItemInArray(this.savedFaqArray, event.previousIndex, event.currentIndex);
            this.sortFAQ();
        }
    }

    refreshQuestionForm(idx = null) {
        this.questionForm = this.fb.group({
            question: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            answer: ['', Validators.compose([Validators.required, maxWordCountValidator(100)])],
        });
        this.selQuestion = idx;
        if (idx != null) {
            this.questionForm.patchValue(this.savedFaqArray[idx]);
        }
        this.editQuestion = true;
    }

    saveQuestion() {
        if (this.questionForm.valid) {
            const postData = {
                ...this.questionForm.value,
                status: 'ENABLED',
                sort_priority:
                    this.selQuestion == null
                        ? this.savedFaqArray.length + 1
                        : this.savedFaqArray[this.selQuestion].sort_priority,
            };
            if (this.selQuestion == null) {
                this.userService.addFAQ(this.roasterId, postData).subscribe(
                    (res: any) => {
                        if (res.success) {
                            this.getFAQList();
                            this.toastrService.success('FAQ added successfully');
                            this.editQuestion = false;
                        } else {
                            this.toastrService.error('Error while adding');
                        }
                    },
                    (err) => {
                        this.toastrService.error('Error while adding');
                    },
                );
            } else {
                this.userService.updateFAQ(this.roasterId, this.savedFaqArray[this.selQuestion].id, postData).subscribe(
                    (res: any) => {
                        if (res.success) {
                            this.getFAQList();
                            this.toastrService.success('FAQ updated successfully');
                            this.editQuestion = false;
                        } else {
                            this.toastrService.error('Error while updating');
                        }
                    },
                    (err) => {
                        this.toastrService.error('Error while updating');
                    },
                );
            }
        } else {
            this.questionForm.markAllAsTouched();
        }
    }

    deleteFAQ(faq) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Confirm delete',
                    desp: 'Are you sure want to delete faq',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.userService.deleteFAQ(this.roasterId, faq.id).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success('The selected FAQ has been deleted successfully');
                            this.getFAQList();
                        } else {
                            this.toastrService.error('Something went wrong while deleting the FAQ');
                        }
                    });
                }
            });
    }

    sortFAQ() {
        const sortPriorities = _.chain(this.savedFaqArray)
            .map((item, index) => {
                return { faq_id: item.id, sort_priority: index + 1 };
            })
            .value();
        this.userService.sortFAQ(this.roasterId, { sort_priorities: sortPriorities }).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('The FAQ order has been updated successfully');
                this.getFAQList();
            } else {
                this.toastrService.error('Something went wrong while update the FAQ order');
            }
        });
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('Current position:', position.coords);
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                },
                (err) => {
                    console.log('error', err);
                },
                { timeout: Infinity },
            );
        }
    }

    markerDragEnd(event) {
        this.latitude = event.coords.lat;
        this.longitude = event.coords.lng;
    }
}
