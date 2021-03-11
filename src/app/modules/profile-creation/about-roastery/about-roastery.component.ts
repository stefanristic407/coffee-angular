import { Component, OnInit, ViewChild } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    // emp_title : string;
    empName = '';
    appLanguage?: any;
    ownerNameError: string;
    foundedInError: string;
    employeeNoError: string;
    employeeAvgError: string;
    femaleNumError: string;
    maleNumError: string;
    capacityError: string;
    kilogramsError: string;
    capabilitiesError: string;
    brandNameError: string;
    brandLogoError: string;
    shortDescError: string;
    vatNoError: string;
    cmpyRidError: string;
    // empTitleError : string;
    empNameError: string;
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
    brandProfile = [
        {
            name: '',
            logo: '',
            short_descr: '',
        },
    ];
    brand = {
        name: '',
        description: '',
    };
    addBtn = true;
    assignRow = false;
    assignButtonValue = 'Add Contact';
    brands: any;
    @ViewChild('roasterImage', { static: true }) roasterImage;

    kgsOptions = [
        { name: 'kg', value: 'kg' },
        { name: 'lb', value: 'lb' },
    ];

    roasterUsersOptions?: any[];
    aboutForm: FormGroup;
    isSaveMode: boolean;
    isEditMode: boolean;

    constructor(
        public roasteryProfileService: RoasteryProfileService,
        public userService: UserserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private fb: FormBuilder,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.userId = this.cookieService.get('user_id');
    }

    ngOnInit(): void {
        this.getCertificates();
        this.roasteryProfileService.getcontactList();
        this.getBrands();
        this.language();
        this.getRoasterUsers();
        this.initialForm();
        this.detectMode();
    }

    detectMode() {
        this.roasteryProfileService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
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
            description: ['', Validators.compose([Validators.maxLength(200)])],
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
    }

    language() {
        this.appLanguage = this.globals.languageJson;
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

    addNewBrand(file, brand) {
        const data: FormData = new FormData();
        data.append('name', brand.name);
        data.append('description', brand.short_descr);
        data.append('file', file);
        data.append('api_call', `/ro/${this.roasterId}/brands`);
        data.append('token', this.cookieService.get('Auth'));
        this.roasterService.addRoasterBrand(data).subscribe((res) => {
            this.getBrands();
        });
    }

    getBrands() {
        this.roasterService.getRoasterBrands(this.roasterId).subscribe((res) => {
            this.brands = res.success ? res.result : [];
        });
    }

    handleRoasterFile(e, brand) {
        if (!brand.name || !brand.short_descr) {
            this.toastrService.error('Please add brand details');
            e.target.file = '';
            return;
        }
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toastrService.error('File too big, please select a file smaller than 2mb');
                } else {
                    console.log('Coming here');
                    this.addNewBrand(e.target.files[0], brand);
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

    onKeyPress(event: any) {
        if (event.target.value === '') {
            document.getElementById(event.target.id).style.border = '1px solid #D50000';
        } else {
            document.getElementById(event.target.id).style.border = '1px solid #d6d6d6';
        }
    }

    editCertificate(event, certificates: any) {
        console.log('button clicked', certificates.name);
    }

    deleteCertificate(certificateId: any) {
        if (confirm('Please confirm! you want to delete?') === true) {
            this.userService.deleteCompanyCertificate(this.roasterId, certificateId).subscribe((response: any) => {
                if (response.success) {
                    this.toastrService.success('The selected Certificate has been successfully deleted');
                    this.getCertificates();
                } else {
                    this.toastrService.error('Something went wrong while deleting the certificate');
                }
            });
        }
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
            user_id: parseInt(this.roasteryProfileService.empName, 10),
        };
        this.assignButtonValue = 'Adding';
        this.roasterService.addRoasterContacts(this.roasterId, contactData).subscribe((result: any) => {
            if (result.success === true) {
                this.assignButtonValue = 'Add Contact';
                this.toastrService.success('Contact has been added.');
                this.roasteryProfileService.getcontactList();
                this.roasteryProfileService.empName = '';
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

    public addBrandProfile() {
        this.brandProfile.push({
            name: '',
            logo: '',
            short_descr: '',
        });
    }

    public deleteRow(index) {
        this.brandProfile.splice(index, 1);
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.aboutForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }
}
