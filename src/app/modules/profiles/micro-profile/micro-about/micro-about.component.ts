import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { maxWordCountValidator } from '@utils';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { COUNTRY_LIST } from '@constants';
import { Country } from '@models';
import { MicroProfileService } from '../micro-profile.service';

@Component({
    selector: 'app-micro-about',
    templateUrl: './micro-about.component.html',
    styleUrls: ['./micro-about.component.scss'],
})
export class MicroAboutComponent implements OnInit, AfterViewInit {
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
    microRoasterId: any;
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
    filteredBrands = [];
    chartData: any;
    @ViewChild('brandImageInput', { static: true }) brandImageInput: ElementRef;

    kgsOptions = [
        { name: 'kg', value: 'kg' },
        { name: 'lb', value: 'lb' },
    ];

    roasterUsersOptions?: any[];
    aboutForm: FormGroup;
    branchForm: FormGroup;

    isSaveMode: boolean;
    isEditMode: boolean;
    employeeId: any;

    isAddBranchMode = false;
    isEditBranchMode = false;

    brandFile: any;
    toEditBranch: any;
    brandImageUrl = 'assets/images/default-brand.png';

    // brand cropped image relative values
    isShowBrandImageModal = false;
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    imageChangedEvent: any = '';
    @ViewChild(ImageCropperComponent, { static: false })
    imageCropper: ImageCropperComponent;
    branches: any[] = [];
    countryList = COUNTRY_LIST;
    cityList: any[];

    constructor(
        public profileCreationService: MicroProfileService,
        public userService: UserserviceService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.microRoasterId = this.cookieService.get('micro_roaster_id');
        this.userId = this.cookieService.get('user_id');
    }

    ngOnInit(): void {
        this.getCertificates();
        this.profileCreationService.getcontactList();
        this.getBranches();
        this.getRoasterUsers();
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
                        value: this.profileCreationService.roasteryProfileData
                            ? this.profileCreationService.roasteryProfileData.female_employee_count
                            : 0,
                    },
                    {
                        name: 'Male',
                        value: this.profileCreationService.roasteryProfileData
                            ? this.profileCreationService.roasteryProfileData.male_employee_count
                            : 0,
                    },
                ];

                this.profileCreationService.single = this.chartData;
            }
        });
        this.profileCreationService.editMode$.subscribe((res: boolean) => {
            this.isEditMode = res;
        });
    }

    initialForm() {
        this.aboutForm = this.fb.group({
            owner_name: ['', Validators.compose([Validators.required])],
            founded_on: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([maxWordCountValidator(150)])],
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
            this.profileCreationService.aboutFormInvalid = this.aboutForm.invalid;
            if (changedData.total_employees !== changedData.female_employee_count + changedData.male_employee_count) {
                this.profileCreationService.invalidSumEmployee = true;
            } else {
                this.profileCreationService.invalidSumEmployee = false;
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

        this.branchForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: [''],
            city: ['', Validators.compose([Validators.required])],
            zipcode: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
        });

        this.branchForm.controls.country.valueChanges.subscribe((updatedCountry: any) => {
            this.countryList.forEach((countryItem: Country) => {
                if (countryItem.isoCode === updatedCountry.toUpperCase()) {
                    this.cityList = [];
                    countryItem.cities.map((stateItem: string) => {
                        this.cityList.push({
                            name: stateItem,
                            value: stateItem,
                        });
                    });
                }
            });
        });
    }

    setFormValue() {
        const formValue = {
            owner_name: this.profileCreationService.roasteryProfileData.owner_name,
            founded_on: this.profileCreationService.roasteryProfileData.founded_on,
            description: this.profileCreationService.roasteryProfileData.description,
            total_employees: this.profileCreationService.roasteryProfileData.total_employees,
            avg_employee_age: this.profileCreationService.roasteryProfileData.avg_employee_age,
            female_employee_count: this.profileCreationService.roasteryProfileData.female_employee_count,
            male_employee_count: this.profileCreationService.roasteryProfileData.male_employee_count,
            company_details_public: this.profileCreationService.roasteryProfileData.company_details_public,
            vat_number: this.profileCreationService.roasteryProfileData.vat_number,
            registration_id: this.profileCreationService.roasteryProfileData.registration_id,
            capacity: this.profileCreationService.roasteryProfileData.capacity,
            capacity_unit: this.profileCreationService.roasteryProfileData.capacity_unit,
            capabilities: this.profileCreationService.roasteryProfileData.capabilities,
        };
        this.aboutForm.setValue(formValue);

        this.chartData = this.profileCreationService.single;
    }

    getRoasterUsers() {
        this.roasterService.getRoasterUsers(this.microRoasterId).subscribe((data: any) => {
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

    getCertificates() {
        if (this.globals.checkItem('certificate-list') || this.globals.checkItem('certificate-management')) {
            this.userService.getCompanyCertificates(this.microRoasterId).subscribe((result: any) => {
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
        this.userService.deleteCompanyCertificate(this.microRoasterId, certificateId).subscribe((response: any) => {
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
        this.roasterService.addRoasterContacts(this.microRoasterId, contactData).subscribe((result: any) => {
            if (result.success === true) {
                this.assignButtonValue = 'Add Contact';
                this.toastrService.success('Contact has been added.');
                this.profileCreationService.getcontactList();
                this.assignRow = false;
                this.addBtn = true;
                this.profileCreationService.showDelete = true;
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
        this.roasterService.deleteRoasterContacts(this.microRoasterId, contactId).subscribe((data: any) => {
            if (data.success === true) {
                this.toastrService.success('The selected contact has been removed successfully');
                this.profileCreationService.getcontactList();
            } else {
                this.toastrService.error('Error while deleting the contact');
            }
        });
    }

    editBrand(branch) {
        console.log('brand data to delete: ', branch);
        this.toEditBranch = branch;
        this.brandImageUrl = branch.url;
        const formValue = {
            name: branch.name,
            country: branch.country,
            state: branch.state,
            address_line1: branch.address_line1,
            address_line2: branch.address_line2,
            city: branch.city,
            zipcode: branch.zipcode,
            description: branch.description,
        };
        console.log('brand data to edit: ', formValue);
        this.branchForm.setValue(formValue);
        this.isEditBranchMode = true;
        this.isAddBranchMode = false;
    }

    addBrandProfileMode() {
        this.branchForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: [''],
            city: ['', Validators.compose([Validators.required])],
            zipcode: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
        });

        this.branchForm.controls.country.valueChanges.subscribe((updatedCountry: any) => {
            this.countryList.forEach((countryItem: Country) => {
                if (countryItem.isoCode === updatedCountry.toUpperCase()) {
                    this.cityList = [];
                    countryItem.cities.map((stateItem: string) => {
                        this.cityList.push({
                            name: stateItem,
                            value: stateItem,
                        });
                    });
                }
            });
        });

        this.isAddBranchMode = true;
        this.isEditBranchMode = false;
    }

    getBranches() {
        // this.userService.getBranches(this.microRoasterId).subscribe((res: any) => {
        //     console.log('branches: ', res);
        //     if (res.success) {
        //         this.branches = res.result;
        //     }
        // });
    }

    addNewBranch() {
        const controls = this.branchForm.controls;
        console.log('add new branch res: ', this.branchForm.value);

        if (this.branchForm.invalid) {
            Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
            return;
        }
        // this.userService.addBranches(this.microRoasterId, this.branchForm.value).subscribe((res: any) => {
        //     console.log('add new branch res: ', res);
        //     if (res.success) {
        //         this.toastrService.success('Added new branch successfully');
        //         this.getBranches();
        //         this.isAddBranchMode = false;
        //         this.isEditBranchMode = false;
        //         this.toEditBranch = null;
        //     }
        // });
    }

    updateBranch() {
        const controls = this.branchForm.controls;
        if (this.branchForm.invalid) {
            Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
            return;
        }
        // this.userService
        //     .udpateBranches(this.microRoasterId, this.toEditBranch.id, this.branchForm.value)
        //     .subscribe((res: any) => {
        //         console.log('Udpate branch res: ', res);
        //         if (res.success) {
        //             this.toastrService.success('Udpate branch successfully');
        //             this.getBranches();
        //             this.isAddBranchMode = false;
        //             this.isEditBranchMode = false;
        //             this.toEditBranch = null;
        //         }
        //     });
    }

    deleteBranch() {
        // this.userService.deleteBranches(this.microRoasterId, this.toEditBranch.id).subscribe((res: any) => {
        //     console.log('deleted branch res: ', res);
        //     if (res.success) {
        //         this.toastrService.success('Branch is deleted');
        //         this.getBranches();
        //         this.isAddBranchMode = false;
        //         this.isEditBranchMode = false;
        //         this.toEditBranch = null;
        //     }
        // });
    }

    cancelAddBrand() {
        this.branchForm.setValue({
            name: '',
            country: '',
            state: '',
            address_line1: '',
            address_line2: '',
            city: '',
            zipcode: '',
            description: '',
        });
        this.brandFile = null;
        this.isAddBranchMode = false;
        this.isEditBranchMode = false;
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.aboutForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    isBranchControlHasError(controlName: string, validationType: string): boolean {
        const control = this.branchForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    setFormat($event) {
        $event.target.value = null;
    }

    handleRoasterFile(e) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                if (file >= 2048) {
                    this.toastrService.error('File too big, please select a file smaller than 2mb');
                } else {
                    if (e.target.files[0].type.split('/')[0] !== 'image') {
                        this.toastrService.error('Please select image file');
                        return;
                    }
                    this.isShowBrandImageModal = true;
                    this.imageChangedEvent = e;
                }
            }
        }
    }

    ngAfterViewInit(): void {
        console.log('this.brandImageInput: ', this.brandImageInput);
    }

    cropImage() {
        this.imageCropper.crop();
        this.isShowBrandImageModal = false;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.brandImageUrl = event.base64;
        const block = this.brandImageUrl.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        this.brandFile = this.b64toBlob(realData, contentType, 0);
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    zoom() {
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }

    selectBrandImage() {
        this.brandImageInput.nativeElement.click();
    }
}
