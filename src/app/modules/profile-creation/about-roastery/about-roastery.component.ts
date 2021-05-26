import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { AclService, ChatHandlerService, UserService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { maxWordCountValidator } from '@utils';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { OrganizationType } from '@enums';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sewn-about-roastery',
    templateUrl: './about-roastery.component.html',
    styleUrls: ['./about-roastery.component.scss'],
})
export class AboutRoasteryComponent implements OnInit, AfterViewInit {
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
    brands = [];
    filteredBrands = [];
    chartData: any;
    @ViewChild('brandImageInput', { static: true }) brandImageInput: ElementRef;

    kgsOptions = [
        { name: 'kg', value: 'kg' },
        { name: 'lb', value: 'lb' },
    ];

    roasterUsersOptions?: any[];
    aboutForm: FormGroup;
    brandForm: FormGroup;
    membersForm: FormGroup;

    isSaveMode: boolean;
    isEditMode: boolean;
    employeeId: any;

    isAddBrandMode = false;
    isEditBrandMode = false;

    brandFile: any;
    toEditBrand: any;
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

    get members() {
        return this.membersForm.get('members') as FormArray;
    }

    constructor(
        public roasteryProfileService: RoasteryProfileService,
        public userService: UserserviceService,
        private usrService: UserService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private fb: FormBuilder,
        private router: Router,
        private chatHandler: ChatHandlerService,
        private aclService: AclService,
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
                        value: this.roasteryProfileService.organizationProfile
                            ? this.roasteryProfileService.organizationProfile.female_employee_count
                            : 0,
                    },
                    {
                        name: 'Male',
                        value: this.roasteryProfileService.organizationProfile
                            ? this.roasteryProfileService.organizationProfile.male_employee_count
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
            this.roasteryProfileService.aboutFormInvalid = this.aboutForm.invalid;
            if (changedData.total_employees !== changedData.female_employee_count + changedData.male_employee_count) {
                this.roasteryProfileService.invalidSumEmployee = true;
            } else {
                this.roasteryProfileService.invalidSumEmployee = false;
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
                    this.roasteryProfileService.single = this.chartData;
                }
            }

            this.roasteryProfileService.editProfileData(changedData);
        });

        this.brandForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
        });

        this.membersForm = this.fb.group({
            members: this.fb.array([]),
        });

        this.members.valueChanges.subscribe((changedData: any) => {
            this.roasteryProfileService.editTopContacts(changedData);
        });
    }

    setFormValue() {
        this.aboutForm.patchValue(this.roasteryProfileService.toUpdateProfileData);

        this.chartData = this.roasteryProfileService.single;

        while (this.members.length !== 0) {
            this.members.removeAt(0);
        }
        this.roasteryProfileService.topContacts.forEach((element) => {
            this.members.push(this.fb.control(element.user_id, Validators.compose([Validators.required])));
        });
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

    usersOptions(curIdx = null): number[] {
        const localArray = [];
        this.roasterUsersOptions.forEach((element) => {
            const idx = this.members.value.findIndex((item, index) => item === element.value && curIdx !== index);
            if (idx < 0) {
                localArray.push(element);
            }
        });
        return localArray;
    }

    getCertificates() {
        if (this.aclService.checkPermission('brand-profile-management')) {
            this.userService.getCompanyCertificates(this.roasterId).subscribe((result: any) => {
                console.log('certification: ', result);
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

    deleteMember(idx) {
        this.members.removeAt(idx);
    }

    addContact() {
        this.members.push(this.fb.control(this.employeeId, Validators.compose([Validators.required])));
        this.employeeId = null;
        this.assignRow = false;
        this.addBtn = true;
    }

    showContact() {
        this.addBtn = false;
        this.assignRow = true;
    }

    cancelAssign() {
        this.addBtn = true;
        this.assignRow = false;
        this.employeeId = null;
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
        this.isAddBrandMode = false;
        // this.filteredBrands = this.brands.filter((item) => {
        //     return item.id !== brand.id;
        // });
    }

    addBrandProfileMode() {
        this.brandForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
        });
        this.isAddBrandMode = true;
        this.isEditBrandMode = false;
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

    openChat(contactData): void {
        this.usrService.getUserDetail(contactData.user_id, OrganizationType.ROASTER).subscribe((res: any) => {
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
