import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QUANTIRY_UNIT_LIST } from '@constants';
import { CertificateType, OrganizationType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { AclService, AuthService, ChatHandlerService, RoasterService, UserService } from '@services';
import { fileRequired, maxWordCountValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { ProfileCreationService } from '../profile-creation.service';

@Component({
    selector: 'app-about-roastery',
    templateUrl: './about-roastery.component.html',
    styleUrls: ['./about-roastery.component.scss'],
})
export class AboutRoasteryComponent implements OnInit {
    readonly QUANTIRY_UNIT_LIST = QUANTIRY_UNIT_LIST;
    readonly OrgType = OrganizationType;

    certificateTypes: any[];
    certificatesArray: any = [];

    assignRow = false;
    brands = [];
    chartData: any;

    allUsers: any[] = [];
    aboutForm: FormGroup;
    brandForm: FormGroup;
    membersForm: FormGroup;

    isSaveMode: boolean;
    employeeId: any;

    isEditBrandMode = false;
    toEditBrand: any;

    get members() {
        return this.membersForm.get('members') as FormArray;
    }

    constructor(
        private aclService: AclService,
        private authService: AuthService,
        private chatHandler: ChatHandlerService,
        private fb: FormBuilder,
        private roasterService: RoasterService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
        public profileCreationService: ProfileCreationService,
    ) {}

    ngOnInit(): void {
        this.getCertificateTypes();
        this.getCertificates();
        this.profileCreationService.getContactList();
        this.getBrands();
        this.getOrgUsers();
        this.initialForm();
        this.detectMode();
    }

    detectMode() {
        this.profileCreationService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
            } else {
                this.chartData = [
                    {
                        name: 'Female',
                        value: this.profileCreationService.organizationProfile
                            ? this.profileCreationService.organizationProfile.female_employee_count
                            : 0,
                    },
                    {
                        name: 'Male',
                        value: this.profileCreationService.organizationProfile
                            ? this.profileCreationService.organizationProfile.male_employee_count
                            : 0,
                    },
                ];

                this.profileCreationService.single = this.chartData;
            }
        });
    }

    initialForm() {
        this.aboutForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            owner_name: ['', Validators.compose([Validators.required])],
            founded_on: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([maxWordCountValidator(150)])],
            total_employees: [
                null,
                Validators.compose([Validators.required, Validators.min(1), this.sumEmployeeValidator()]),
            ],
            avg_employee_age: [null, Validators.compose([Validators.required])],
            female_employee_count: [
                '',
                Validators.compose([Validators.required, Validators.min(1), this.sumEmployeeValidator()]),
            ],
            male_employee_count: [
                '',
                Validators.compose([Validators.required, Validators.min(1), this.sumEmployeeValidator()]),
            ],
            company_details_public: [false, Validators.compose([Validators.required])],
            vat_number: ['', Validators.compose([Validators.required])],
            registration_id: ['', Validators.compose([Validators.required])],
            capacity: ['', Validators.compose([Validators.required])],
            capacity_unit: ['', Validators.compose([Validators.required])],
            capabilities: ['', Validators.compose([Validators.required])],
        });
        this.profileCreationService.aboutForm = this.aboutForm;

        this.aboutForm.valueChanges.subscribe((changedData: any) => {
            if (changedData.total_employees === changedData.female_employee_count + changedData.male_employee_count) {
                if (this.chartData) {
                    this.chartData = [
                        {
                            name: 'Female',
                            value: changedData.female_employee_count ? changedData.female_employee_count : 0,
                        },
                        {
                            name: 'Male',
                            value: changedData.male_employee_count ? changedData.male_employee_count : 0,
                        },
                    ];
                    this.profileCreationService.single = this.chartData;
                }
            }

            this.profileCreationService.editProfileData(changedData);
        });

        this.brandForm = this.fb.group({
            file: [null, [fileRequired()]],
            name: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
        });

        this.membersForm = this.fb.group({
            members: this.fb.array([]),
        });

        this.members.valueChanges.subscribe((changedData: any) => {
            this.profileCreationService.editTopContacts(changedData);
        });
    }

    checkSumEmployee() {
        this.aboutForm.get('total_employees').updateValueAndValidity();
        this.aboutForm.get('female_employee_count').updateValueAndValidity();
        this.aboutForm.get('male_employee_count').updateValueAndValidity();
    }

    sumEmployeeValidator() {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const formGroup = control.parent;
            return formGroup &&
                formGroup.get('total_employees').value &&
                formGroup.get('female_employee_count').value &&
                formGroup.get('male_employee_count').value &&
                formGroup.get('female_employee_count').value + formGroup.get('male_employee_count').value !==
                    formGroup.get('total_employees').value
                ? {
                      sumemployee: true,
                  }
                : null;
        };
    }

    setFormValue() {
        this.aboutForm.patchValue(this.profileCreationService.toUpdateProfileData);

        this.chartData = this.profileCreationService.single;

        while (this.members.length !== 0) {
            this.members.removeAt(0);
        }
        this.profileCreationService.topContacts.forEach((element) => {
            this.members.push(this.fb.control(element.user_id, Validators.compose([Validators.required])));
        });
    }

    getOrgUsers() {
        this.roasterService.getOrgUsers().subscribe((data: any) => {
            if (data.success === true) {
                this.allUsers = (data.result || []).map((item) => {
                    return {
                        name: item.firstname + ' ' + item.lastname,
                        value: item.id,
                    };
                });
            }
        });
    }

    usersOptions(curIdx = null): number[] {
        const localArray = [];
        this.allUsers.forEach((element) => {
            const idx = this.members.value.findIndex((item, index) => item === element.value && curIdx !== index);
            if (idx < 0) {
                localArray.push(element);
            }
        });
        return localArray;
    }

    getCertificateTypes() {
        this.userService.getCertificateTypes().subscribe((res: any) => {
            if (res.success) {
                this.certificateTypes = Object.values(res.result);
                this.certificateTypes = this.certificateTypes.filter((item) => {
                    return (
                        item.tags &&
                        item.tags.includes(this.userService.orgSlug) &&
                        item.type !== CertificateType.EraOfWe
                    );
                });
            }
        });
    }

    getCertificates() {
        if (this.aclService.checkPermission('brand-profile-management')) {
            this.userService.getCompanyCertificates().subscribe((result: any) => {
                if (result.success === true) {
                    this.certificatesArray = result.result;
                } else {
                    this.toastrService.error('Error in loading Roaster Certificates');
                }
            });
        }
    }

    deleteCertificate(certificateId: number) {
        this.userService.deleteCompanyCertificate(certificateId).subscribe((response: any) => {
            if (response.success) {
                this.toastrService.success('The selected Certificate has been successfully deleted');
                this.getCertificates();
            } else {
                this.toastrService.error('Something went wrong while deleting the certificate');
            }
        });
    }

    getCertMenuItems(item) {
        return [
            { label: 'edit', routerLink: `/roastery-profile/certificate/${item.id}` },
            { label: 'delete', command: () => this.deleteCertificate(item.id) },
        ];
    }

    deleteMember(idx) {
        this.members.removeAt(idx);
    }

    addContact() {
        this.members.push(this.fb.control(this.employeeId, Validators.compose([Validators.required])));
        this.employeeId = null;
        this.assignRow = false;
    }

    showContact() {
        this.assignRow = true;
    }

    cancelAssign() {
        this.assignRow = false;
        this.employeeId = null;
    }

    getBrands() {
        this.roasterService.getRoasterBrands().subscribe((res) => {
            this.brands = res.success ? res.result : [];
        });
    }

    addBrandMode() {
        this.toEditBrand = null;
        this.brandForm.reset();
        this.isEditBrandMode = true;
    }

    editBrand(brand) {
        this.toEditBrand = brand;
        this.brandForm.setValue({
            file: {
                id: this.toEditBrand.url,
                url: this.toEditBrand.url,
            },
            name: brand.name,
            description: brand.description,
        });
        this.isEditBrandMode = true;
    }

    cancelEditBrand() {
        this.brandForm.reset();
        this.isEditBrandMode = false;
    }

    saveBrand() {
        if (this.brandForm.invalid) {
            this.brandForm.markAllAsTouched();
            this.toastrService.error(this.translator.instant('please_check_form_data'));
            return;
        }
        const data: FormData = new FormData();
        data.append('name', this.brandForm.controls.name.value);
        data.append('description', this.brandForm.controls.description.value);
        if (this.brandForm.value.file) {
            data.append('file', this.brandForm.value.file);
        }
        data.append('token', this.authService.token);
        if (this.toEditBrand?.id) {
            data.append('api_call', `${this.roasterService.apiCallPrefix}/brands/${this.toEditBrand.id}`);
            data.append('method', 'PUT');
            this.roasterService.updateRoasterBrand(data).subscribe((res) => {
                if (res.success) {
                    this.cancelEditBrand();
                    this.getBrands();
                    this.toastrService.success('Brand is updated successfully');
                }
            });
        } else {
            data.append('api_call', `${this.roasterService.apiCallPrefix}/brands`);
            this.roasterService.addRoasterBrand(data).subscribe((res) => {
                if (res.success) {
                    this.cancelEditBrand();
                    this.getBrands();
                    this.toastrService.success('Brand is added successfully');
                }
            });
        }
    }

    deleteBrand() {
        this.roasterService.deleteRoasterBrand(this.toEditBrand.id).subscribe((res: any) => {
            this.brands = this.brands.filter((item: any) => {
                return item.id !== this.toEditBrand.id;
            });
            this.toastrService.success('Brand is deleted successfully');
            this.cancelEditBrand();
        });
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.aboutForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    isBrandControlHasError(controlName: string, validationType: string): boolean {
        const control = this.brandForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    openChat(contactData): void {
        this.userService.getUserDetail(contactData.user_id, OrganizationType.ROASTER).subscribe((res: any) => {
            if (res.success) {
                this.chatHandler.openChatThread({
                    user_id: contactData.user_id,
                    org_type: OrganizationType.ROASTER,
                    org_id: res.result.organization_id,
                });
            }
        });
    }
}
