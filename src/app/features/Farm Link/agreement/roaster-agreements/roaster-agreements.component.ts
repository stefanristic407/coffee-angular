// AUTHOR : Gaurav Kunal
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from '../../../roastery-profile/roastery-profile.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-roaster-agreements',
    templateUrl: './roaster-agreements.component.html',
    styleUrls: ['./roaster-agreements.component.css'],
})
export class RoasterAgreementsComponent implements OnInit, OnChanges {
    appLanguage?: any;
    agreementsActive = 0;
    estatetermOrigin: any;
    customerMob: any;
    showOrigin = true;
    showCustomerMob = true;
    isUpdate = false;
    roasterId: string;
    agreementfileId: any;
    deleteAgreementId: any;
    itemId: any;
    horecaFormGroup: FormGroup;
    resetButtonValue = 'Upload Agreement';
    files: any;
    fileEvent: any;
    fileNameValue: any;
    fileName: string | Blob;
    horecaList: any;
    newList: any = [];
    mainData: any = [];
    sortedMainData: any = [];
    modalDropdownList: any = [];
    selectedCustomers: any;

    @ViewChild('dismissAddModal') dismissAddModal: ElementRef;
    @ViewChild('dismissDeleteModal') dismissDeleteModal: ElementRef;
    @Input() searchTerm: any = '';
    @Input() customerType: string;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public roasteryProfileService: RoasteryProfileService,
        private formBuilder: FormBuilder,
        public globals: GlobalsService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnChanges(): void {
        this.createForm();
        this.getAgreements();
        if (this.customerType === 'micro-roasters') {
            this.getMicroRoastersList();
            this.horecaFormGroup.get('customerType').setValue('mr');
        } else if (this.customerType === 'hrc') {
            this.getHorecaList();
            this.horecaFormGroup.get('customerType').setValue('hrc');
        }
    }

    ngOnInit(): void {
        // Auth checking
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        this.estatetermOrigin = '';
        this.customerMob = '';
        this.getAgreements();
        this.language();
    }

    createForm(): void {
        this.horecaFormGroup = this.formBuilder.group({
            customerType: ['', [Validators.required]],
            customerId: ['', [Validators.required]],
            customerIdValue: ['', Validators.required],
        });
    }

    language() {
        this.appLanguage = this.globals.languageJson;
        this.agreementsActive++;
    }

    // Function Name: Get Country Name
    // Description: This function helps to transfer country code to full country name.

    getCountryName(code: any) {
        const country = this.roasteryProfileService.countryList.find((con) => con.isoCode === code);
        return country ? country.name : '';
    }

    // Function Name: Get Agreements
    // Description: This function helps to fetch the all agreemnts

    getAgreements() {
        this.mainData = [];
        this.roasterService.getAgreements(this.roasterId, this.customerType).subscribe((resp: any) => {
            if (resp.success) {
                this.mainData = resp.result;
                this.sortedMainData = this.mainData.sort((a, b) => b.created_at.localeCompare(a.created_at));
            } else {
                this.toastrService.error('Error while getting the agreement list!');
            }
        });
    }

    // Function Name: Get Micro Roaster
    // Description: This function helps to fetch the all micro roaster list

    getMicroRoastersList() {
        this.newList = [];
        this.roasterService.getMicroRoastersList(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.horecaList = res.result;
                this.horecaList.forEach((element) => {
                    if (element.id > 0) {
                        this.newList.push(element);
                    }
                });
                this.modalDropdownList = this.newList;
                this.newList = this.newList.map((item) => {
                    const transformItem = { label: '', value: '' };
                    transformItem.label = item.name;
                    transformItem.value = item.name;
                    return transformItem;
                });
                const allOption = { label: 'All', value: 'All' };
                this.newList.push(allOption);
                this.newList = this.newList.sort((a, b) => a.label.localeCompare(b.label));
            } else {
                this.toastrService.error('Error while getting HoReCa list');
            }
        });
    }

    // Function Name: Get Horeca List
    // Description: This function helps to fetch the all horeca list

    getHorecaList() {
        this.newList = [];
        this.roasterService.getMicroRoastersHoreca(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.horecaList = res.result;
                this.horecaList.forEach((element) => {
                    if (element.id > 0) {
                        this.newList.push(element);
                    }
                });
                this.modalDropdownList = this.newList;
                this.newList = this.newList.map((item) => {
                    const transformItem = { label: '', value: '' };
                    transformItem.label = item.name;
                    transformItem.value = item.name;
                    return transformItem;
                });
                const allOption = { label: 'All', value: 'All' };
                this.newList.push(allOption);
                this.newList = this.newList.sort((a, b) => a.label.localeCompare(b.label));
            } else {
                this.toastrService.error('Error while getting HoReCa list');
            }
        });
    }

    // Function Name: Update Modal
    // Description: This function helps to fetch the indiviual details of the column

    onUpdateModal(itemId: any) {
        this.fileNameValue = '';
        this.resetButtonValue = 'Update Agreement';
        this.horecaFormGroup.get('customerType').setValue('');
        this.horecaFormGroup.get('customerId').setValue('');
        this.isUpdate = true;
        this.roasterService.getAgreementValue(this.roasterId, this.customerType, itemId).subscribe((resp: any) => {
            if (resp.success) {
                this.horecaFormGroup.get('customerType').setValue(resp.result.customer_type);
                this.horecaFormGroup.get('customerId').setValue(resp.result.customer_id);
                // this.fileUrl = resp.result.fileUrl;
                this.agreementfileId = resp.result.file_id;
                this.fileNameValue = resp.result.file_name;
                this.itemId = resp.result.id;
            }
        });
    }

    // Function Name: Filter Agreements
    // Description: This function helps to filter agrements based on dropdown

    filterAgrements() {
        if (!this.selectedCustomers || this.selectedCustomers === 'All') {
            this.sortedMainData = this.mainData;
        } else {
            this.sortedMainData = this.mainData.filter(item => item.customer_name === this.selectedCustomers);
        }
    }

    // Function Name: Upload File
    // Description: This function helps to capture uploaded file details

    uploadFile(event: any) {
        this.fileNameValue = '';
        this.files = event.target.files;
        this.fileEvent = this.files;
        this.fileNameValue = this.files[0].name;
    }

    // Function Name: Upload Agreement
    // Description: This function helps in uploading the file and also creates the agreement

    uploadAgreement() {
        this.resetButtonValue = 'Uploading';
        if (this.horecaFormGroup.get('customerId').valid) {
            const fileList: FileList = this.fileEvent;
            if (fileList && fileList.length > 0) {
                const file: File = fileList[0];
                const formData: FormData = new FormData();
                formData.append('file', file, file.name);
                formData.append('name', this.fileNameValue);
                formData.append('file_module', 'Agreements');
                this.roasterId = this.cookieService.get('roaster_id');
                formData.append('api_call', '/ro/' + this.roasterId + '/file-manager/files');
                formData.append('token', this.cookieService.get('Auth'));
                this.roasterService.uploadFiles(formData).subscribe((result: any) => {
                    if (result.success) {
                        this.toastrService.success('The file ' + this.fileNameValue + ' uploaded successfully');
                        if (!this.isUpdate) {
                            const requestBody = {
                                customer_id: parseInt(this.horecaFormGroup.get('customerId').value, 10),
                                notify_customer: true,
                                file_id: result.result.id,
                            };
                            this.roasterService
                                .uploadAgreements(this.roasterId, this.customerType, requestBody)
                                .subscribe((res: any) => {
                                    if (res.success) {
                                        this.resetButtonValue = 'Upload Agreement';
                                        this.toastrService.success('The Agreement has been uploaded successfully');
                                        this.getAgreements();
                                        this.horecaFormGroup.get('customerId').setValue('');
                                        this.fileNameValue = '';
                                        document.getElementById('dismissAddModal').click();
                                    } else {
                                        this.resetButtonValue = 'Upload Agreement';
                                        this.toastrService.error('Error while uploading Agreegement');
                                    }
                                });
                        } else {
                            const dataBody = {
                                file_id: this.agreementfileId,
                            };
                            this.roasterService
                                .updateAgreements(this.roasterId, this.customerType, this.itemId, dataBody)
                                .subscribe((res: any) => {
                                    if (res.success) {
                                        this.resetButtonValue = 'Update Agreement';
                                        this.toastrService.success('The Agreement updated successfully');
                                        this.getAgreements();
                                        this.horecaFormGroup.get('customerId').setValue('');
                                        this.fileNameValue = '';
                                        document.getElementById('dismissAddModal').click();
                                    } else {
                                        this.resetButtonValue = 'Upload Agreement';
                                        this.toastrService.error('Error while updating the agreement details');
                                    }
                                });
                            this.toastrService.success('The file ' + this.fileNameValue + ' uploaded successfully');
                        }
                    } else {
                        this.resetButtonValue = 'Upload Agreement';
                        this.toastrService.error('Error while uploading the file');
                    }
                });
            }
        }
    }

    // Function Name: Delete Modal
    // Description: This function helps to capture indiviual agreement id to delete a agrement

    onDeleteModal(deleteId: any) {
        this.deleteAgreementId = deleteId;
    }

    // Function Name: Delete Agreement
    // Description: This function helps to delete a agrement

    deleteAgreement(item: any) {
        this.roasterService.deleteAgreement(this.roasterId, this.customerType, item).subscribe((res: any) => {
            if (res.success) {
                document.getElementById('dismissDeleteModal').click();
                this.toastrService.success('The Selected agreement deleted successfully!');
                this.getAgreements();
            } else {
                this.toastrService.error('Error while deleting the agreement');
            }
        });
    }
}
