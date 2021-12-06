import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { maxWordCountValidator, fileCountValidator } from '@utils';
import { AuthService, GlobalsService, RoasterService, UserService } from '@services';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
    roasterId: number;
    breadItems: any[];
    infoForm: FormGroup;
    roasterUsers: any[] = [];
    topContacts: any[] = [];
    autoMembers: any[] = [];
    certificates: any[];
    certIndex = null;
    certMenuItems = [
        {
            label: 'View',
            command: () => {
                window.open(this.certificates[this.certIndex].public_url);
            },
        },
        {
            label: 'Delete',
            command: () => {
                this.deleteCertificate(this.certificates[this.certIndex]);
            },
        },
    ];

    get members() {
        return this.infoForm.get('members') as FormArray;
    }

    constructor(
        public dialogSrv: DialogService,
        private fb: FormBuilder,
        public globals: GlobalsService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public userService: UserService,
        public route: Router,
        public roasterService: RoasterService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
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
            members: this.fb.array([]),
        });
        this.getAboutDetails();
        this.getTopContacts();
        this.getCertificates();
    }

    getAboutDetails() {
        this.userService.getPageDetails(this.roasterId, 'about-us').subscribe((res: any) => {
            if (res.success) {
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
            }
        });
    }

    savePageData() {
        console.log(this.infoForm);
        if (this.infoForm.valid) {
            const promises = [];
            // add top contacts
            this.infoForm.value.members.forEach((element) => {
                const idx = this.topContacts.findIndex((item) => item.user_id === element.id);
                if (element && element.id && idx === -1) {
                    const payload = {
                        user_id: element.id,
                    };
                    promises.push(
                        new Promise((resolve, reject) =>
                            this.roasterService.addRoasterContacts(this.roasterId, payload).subscribe(
                                (res: any) => {
                                    if (res.success) {
                                        resolve(res.result);
                                    } else {
                                        reject();
                                    }
                                },
                                (err) => {
                                    reject();
                                },
                            ),
                        ),
                    );
                }
            });
            // remove top contacts
            this.topContacts.forEach((element) => {
                const idx = this.infoForm.value.members.findIndex((item) => item.id === element.user_id);
                if (idx === -1) {
                    promises.push(
                        new Promise((resolve, reject) => {
                            this.roasterService.deleteRoasterContacts(this.roasterId, element.id).subscribe(
                                (res: any) => {
                                    if (res.success) {
                                        resolve(res.result);
                                    }
                                },
                                (err) => {
                                    reject();
                                },
                            );
                        }),
                    );
                }
            });
            // Update page data
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                intro_file_1: this.infoForm.value.intro_file_1.id,
                file: this.infoForm.value.file.id,
            };
            delete postData.members;
            promises.push(
                new Promise((resolve, reject) => {
                    this.userService.updateHomeDetails(this.roasterId, postData, 'about-us').subscribe((res: any) => {
                        if (res.success) {
                            resolve(res.result);
                        } else {
                            reject();
                        }
                    });
                }),
            );
            Promise.all(promises)
                .then(() => {
                    this.toastrService.success('About page Details updated successfully');
                    this.route.navigate(['/brand-profile']);
                })
                .catch(() => {
                    this.toastrService.error('Error while updating details');
                });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    addMember() {
        this.members.push(this.fb.control('', Validators.compose([Validators.required])));
    }

    deleteMember(idx) {
        this.members.removeAt(idx);
    }

    search(event: any) {
        const localArray = [];
        const postData = {
            name: event.query.toLowerCase(),
        };
        this.roasterService.getOrgUsers(postData).subscribe((res: any) => {
            if (res.success) {
                if (res.result?.length) {
                    res.result.forEach((element) => {
                        const idx = this.members.value.findIndex((item) => item && item.id === element.id);
                        if (idx < 0) {
                            localArray.push({
                                id: element.id,
                                name: `${element.firstname || ''} ${element.lastname || ''}`,
                            });
                        }
                    });
                    this.autoMembers = localArray;
                }
            }
        });
    }

    getTopContacts() {
        this.userService.getTeamMembers(this.roasterId, 'top-contacts').subscribe((res: any) => {
            if (res.success) {
                this.topContacts = res.result || [];
                this.topContacts.forEach((element) => {
                    this.members.push(
                        this.fb.control(
                            { id: element.user_id, name: element.name },
                            Validators.compose([Validators.required]),
                        ),
                    );
                });
            }
        });
    }

    getCertificates() {
        this.userService.getCompanyCertificates().subscribe((res: any) => {
            if (res.success) {
                this.certificates = res.result;
            }
        });
    }

    deleteCertificate(certificate) {
        console.log(certificate);
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Confirm delete',
                    desp: 'Are you sure want to delete certificate',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.deleteCertificate(this.roasterId, certificate.id).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success('Certificate deleted successfully');
                            this.getCertificates();
                        } else {
                            this.toastrService.error('Error while deleting certificate');
                        }
                    });
                }
            });
    }
}
