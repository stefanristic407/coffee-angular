import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { maxWordCountValidator } from '@services';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { UserserviceService } from '@services';
import { ConfirmComponent } from '@shared';
@Component({
    selector: 'app-visit-us',
    templateUrl: './visit-us.component.html',
    styleUrls: ['./visit-us.component.scss'],
    providers: [DialogService],
})
export class VisitUsComponent implements OnInit {
    roasterId: string;
    roasterSlug: string;
    breadItems: any[];
    infoForm: FormGroup;
    cities: any[] = [];
    questionForm: FormGroup;
    editQuestion = false;
    selQuestion = null;

    savedFaqArray: any[] = [];

    constructor(
        public dialogSrv: DialogService,
        private fb: FormBuilder,
        private router: Router,
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
            { label: this.globals.languageJson?.home, routerLink: '/features/welcome-aboard' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: 'Visit us' },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            address1: ['', Validators.compose([Validators.required])],
            address2: [''],
            city: ['', Validators.compose([Validators.required])],
            zip_code: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            phone: ['', Validators.compose([Validators.required])],
            store_open_days: ['', Validators.compose([Validators.required])],
            storeTime: [null],
        });
        this.getVisitDetails();
        this.getFAQList();
    }

    getVisitDetails() {
        this.userService.getPageDetails(this.roasterId, 'visit-us').subscribe(async (res: any) => {
            if (res.success) {
                this.infoForm.patchValue(res.result);
                this.infoForm.get('storeTime').setValue([res.result.store_open_time, res.result.store_close_time]);
                this.changeCountry();
                if (res.result.banner_file) {
                    this.infoForm.controls.banner_file.setValue({
                        id: res.result.banner_file,
                        url: res.result.banner_file_url,
                    });
                }
            }
        });
    }

    savePageData() {
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                store_open_time: this.infoForm.value.storeTime[0],
                store_close_time: this.infoForm.value.storeTime[1],
            };
            delete postData.storeTime;
            this.userService.updateHomeDetails(this.roasterId, postData, 'visit-us').subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Visit page Details updated successfully');
                    this.router.navigate(['/brand-profile']);
                } else {
                    this.toastrService.error('Error while updating details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    changeCountry() {
        if (this.infoForm.value.country) {
            this.globals.getCountry(this.infoForm.value.country).cities.forEach((element) => {
                this.cities.push({ label: element, value: element });
            });
        }
    }

    getFAQList() {
        this.userService.getFAQList(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.savedFaqArray = res.result;
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.savedFaqArray, event.previousIndex, event.currentIndex);
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
            this.formSrv.markGroupDirty(this.questionForm);
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
}
