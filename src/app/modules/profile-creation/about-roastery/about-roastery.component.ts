import { Component, OnInit, ViewChild } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sewn-about-roastery',
    templateUrl: './about-roastery.component.html',
    styleUrls: ['./about-roastery.component.scss'],
})
export class AboutRoasteryComponent implements OnInit {
    ownerName?: string;
    foundedIn?: any;
    summary: string;
    kgs: any = '';
    capacity: string;
    capabilities: string;
    maleNum: string;
    femaleNum: string;
    employeeAvg: any;
    employeeNos: any;
    brandName: string;
    shortFescr: string;
    empName = '';
    roasterId: any;
    certificatesArray: any = [];
    userId: any;
    single: any[];
    view: any[] = [300, 200];
    // options
    gradient = true;
    showLegend = false;
    showLabels = false;
    isDoughnut = false;
    legendPosition = 'below';

    colorScheme = {
        domain: ['#747588', '#f8f8f8'],
    };
    contacts = [
        {
            contactid: '',
        },
    ];
    addBtn = true;
    assignRow = false;
    assignButtonValue = 'Add Contact';
    brands = [];
    filteredBrands = [];
    chartData: any;
    @ViewChild('roasterImage', { static: true }) roasterImage;

    kgsOptions = [
        { name: 'kg', value: 'kg' },
        { name: 'lb', value: 'lb' },
    ];

    roasterUsersOptions?: any[];
    aboutForm: FormGroup;
    brandForm: FormGroup;

    isSaveMode: boolean;
    isEditMode: boolean;
    employeeId: any;

    isAddBrandMode = false;
    isEditBrandMode = false;

    brandFile: any;
    toEditBrand: any;
    brandImageUrl = 'assets/images/default-brand.png';

    constructor(
        public roasteryProfileService: RoasteryProfileService,
        public userService: UserserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.userId = this.cookieService.get('user_id');
    }

    ngOnInit(): void {
        this.getCertificates();
        this.roasteryProfileService.getcontactList();
        this.getBrands();
        this.getRoasterUsers();
        this.initialForm();

        this.detectMode();
    }

    detectMode() {
        this.roasteryProfileService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
            } else {
                this.chartData = [
                    {
                        name: 'Female',
                        value: this.roasteryProfileService.roasteryProfileData
                            ? this.roasteryProfileService.roasteryProfileData.female_employee_count
                            : 0,
                    },
                    {
                        name: 'Male',
                        value: this.roasteryProfileService.roasteryProfileData
                            ? this.roasteryProfileService.roasteryProfileData.male_employee_count
                            : 0,
                    },
                ];

                this.roasteryProfileService.single = this.chartData;
            }
        });
        this.roasteryProfileService.editMode$.subscribe((res: boolean) => {
            this.isEditMode = res;
        });
    }

    initialForm() {
        this.aboutForm = this.fb.group({
            owner_name: ['', Validators.compose([Validators.required])],
            founded_on: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.maxLength(150)])],
            total_employees: [null, Validators.compose([Validators.required])],
            avg_employee_age: [null, Validators.compose([Validators.required])],
            female_employee_count: ['', Validators.compose([Validators.required])],
            male_employee_count: ['', Validators.compose([Validators.required])],
            company_details_public: [false, Validators.compose([Validators.required])],
            vat_number: ['', Validators.compose([Validators.required])],
            registration_id: ['', Validators.compose([Validators.required])],
            capacity: ['', Validators.compose([Validators.required])],
            capacity_unit: ['', Validators.compose([Validators.required])],
            capabilities: ['', Validators.compose([Validators.required])],
        });

        this.aboutForm.valueChanges.subscribe((changedData: any) => {
            this.roasteryProfileService.aboutFormInvalid = this.aboutForm.invalid;
            this.roasteryProfileService.editProfileData(changedData);
            if (this.chartData) {
                this.chartData = [
                    {
                        name: 'Female',
                        value: changedData.female_employee_count,
                    },
                    {
                        name: 'Male',
                        value: changedData.male_employee_count,
                    },
                ];
                this.roasteryProfileService.single = this.chartData;
            }
        });

        this.brandForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    setFormValue() {
        const formValue = {
            owner_name: this.roasteryProfileService.roasteryProfileData.owner_name,
            founded_on: this.roasteryProfileService.roasteryProfileData.founded_on,
            description: this.roasteryProfileService.roasteryProfileData.description,
            total_employees: this.roasteryProfileService.roasteryProfileData.total_employees,
            avg_employee_age: this.roasteryProfileService.roasteryProfileData.avg_employee_age,
            female_employee_count: this.roasteryProfileService.roasteryProfileData.female_employee_count,
            male_employee_count: this.roasteryProfileService.roasteryProfileData.male_employee_count,
            company_details_public: this.roasteryProfileService.roasteryProfileData.company_details_public,
            vat_number: this.roasteryProfileService.roasteryProfileData.vat_number,
            registration_id: this.roasteryProfileService.roasteryProfileData.registration_id,
            capacity: this.roasteryProfileService.roasteryProfileData.capacity,
            capacity_unit: this.roasteryProfileService.roasteryProfileData.capacity_unit,
            capabilities: this.roasteryProfileService.roasteryProfileData.capabilities,
        };
        this.aboutForm.setValue(formValue);

        this.chartData = this.roasteryProfileService.single;
    }

    getRoasterUsers() {
        this.roasterService.getRoasterUsers(this.roasterId).subscribe((data: any) => {
            if (data.success === true) {
                this.roasterUsersOptions = (data.result || []).map((item) => {
                    return {
                        name: item.firstname + ' ' + item.lastname,
                        value: item.id,
                    };
                });
            }
        });
    }

    handleRoasterFile(e) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toastrService.error('File too big, please select a file smaller than 2mb');
                } else {
                    console.log('Coming here');
                    this.brandFile = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(this.brandFile);
                    reader.onload = (event: any) => {
                        this.brandImageUrl = event.target.result;
                    };
                    // this.addNewBrand(e.target.files[0], brand);
                }
            }
        }
    }

    getCertificates() {
        if (this.globals.checkItem('certificate-list') || this.globals.checkItem('certificate-management')) {
            this.userService.getCompanyCertificates(this.roasterId).subscribe((result: any) => {
                if (result.success === true) {
                    this.certificatesArray = result.result;
                } else {
                    this.toastrService.error('Error in loading Roaster Certificates');
                }
            });
        }
    }

    editCertificate(event, certificates: any) {
        console.log('button clicked', certificates.name);
        this.router.navigateByUrl(`/roastery-profile/certificate/${certificates.id}`);
    }

    deleteCertificate(certificateId: any) {
        this.userService.deleteCompanyCertificate(this.roasterId, certificateId).subscribe((response: any) => {
            if (response.success) {
                this.toastrService.success('The selected Certificate has been successfully deleted');
                this.getCertificates();
            } else {
                this.toastrService.error('Something went wrong while deleting the certificate');
            }
        });
    }

    onSelect(data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

    addContact() {
        const contactData = {
            user_id: this.employeeId,
        };
        this.assignButtonValue = 'Adding';
        this.roasterService.addRoasterContacts(this.roasterId, contactData).subscribe((result: any) => {
            if (result.success === true) {
                this.assignButtonValue = 'Add Contact';
                this.toastrService.success('Contact has been added.');
                this.roasteryProfileService.getcontactList();
                this.assignRow = false;
                this.addBtn = true;
                this.roasteryProfileService.showDelete = true;
            } else {
                this.assignButtonValue = 'Add Contact';
                this.toastrService.error('Error while assigning the role');
            }
        });
    }

    showContact() {
        this.addBtn = false;
        this.assignRow = true;
        // this.showDelete = true;
    }

    cancelAssign() {
        this.addBtn = true;
        this.assignRow = false;
    }

    removeContact(contactId: any) {
        this.roasterService.deleteRoasterContacts(this.roasterId, contactId).subscribe((data: any) => {
            if (data.success === true) {
                this.toastrService.success('The selected contact has been removed successfully');
                this.roasteryProfileService.getcontactList();
            } else {
                this.toastrService.error('Error while deleting the contact');
            }
        });
    }

    editBrand(brand) {
        console.log('brand data to delete: ', brand);
        this.toEditBrand = brand;
        this.brandImageUrl = brand.url;
        const formValue = {
            name: brand.name,
            description: brand.description,
        };
        console.log('brand data to edit: ', formValue);
        this.brandForm.setValue(formValue);
        this.isEditBrandMode = true;
        this.filteredBrands = this.brands.filter((item) => {
            return item.id !== brand.id;
        });
    }

    addBrandProfileMode() {
        this.brandForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
        this.isAddBrandMode = true;
    }

    addNewBrand() {
        console.log('added brand: ');
        if (this.brandForm.invalid || !this.brandFile) {
            const controls = this.brandForm.controls;
            if (this.brandForm.invalid) {
                Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
                return;
            }
            this.toastrService.error('Please add brand details');
            return;
        }
        const data: FormData = new FormData();
        data.append('name', this.brandForm.controls.name.value);
        data.append('description', this.brandForm.controls.description.value);
        data.append('file', this.brandFile);
        data.append('api_call', `/ro/${this.roasterId}/brands`);
        data.append('token', this.cookieService.get('Auth'));
        this.roasterService.addRoasterBrand(data).subscribe((res) => {
            this.cancelAddBrand();
            this.getBrands();
        });
    }

    updateBrandProfile() {
        const controls = this.brandForm.controls;
        if (this.brandForm.invalid) {
            Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
            return;
        }
        const data: FormData = new FormData();
        data.append('name', this.brandForm.controls.name.value);
        data.append('description', this.brandForm.controls.description.value);
        if (this.brandFile) {
            data.append('file', this.brandFile);
        }
        data.append('api_call', `/ro/${this.roasterId}/brands/${this.toEditBrand.id}`);
        data.append('token', this.cookieService.get('Auth'));
        data.append('method', 'PUT');
        this.roasterService.updateRoasterBrand(data).subscribe((res) => {
            this.cancelAddBrand();
            this.getBrands();
        });
    }

    deleteBrand() {
        this.roasterService.deleteRoasterBrand(this.toEditBrand.id).subscribe((res: any) => {
            this.brands = this.brands.filter((item: any) => {
                return item.id !== this.toEditBrand.id;
            });
            this.toastrService.success('Brand is deleted successfully');
            this.isEditBrandMode = false;
            this.cancelAddBrand();
        });
    }

    cancelAddBrand() {
        this.brandForm.setValue({
            name: '',
            description: '',
        });
        this.brandFile = null;
        this.isAddBrandMode = false;
        this.isEditBrandMode = false;
        this.filteredBrands = this.brands;
        this.brandImageUrl = 'assets/images/default-brand.png';
    }

    deleteBrandImage() {
        this.brandImageUrl = 'assets/images/default-brand.png';
        if (this.brandFile) {
            this.brandFile = null;
        }
    }

    getBrands() {
        this.roasterService.getRoasterBrands(this.roasterId).subscribe((res) => {
            this.brands = res.success ? res.result : [];
            this.filteredBrands = this.brands;
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
}
