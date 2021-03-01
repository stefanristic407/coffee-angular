// AUTHOR : Gaurav Kunal
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-roaster-agreements',
    templateUrl: './roaster-agreements.component.html',
    styleUrls: ['./roaster-agreements.component.scss'],
})
export class RoasterAgreementsComponent implements OnInit, OnChanges {
    appLanguage?: any;
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
    uploadButtonValue = 'Upload Agreement';
    updateButtonValue = 'Update Agreement';
    files: any;
    fileEvent: any;
    fileNameValue: any;
    fileName: string | Blob;
    reFiles: any;
    reFileEvent: any;
    reFileNameValue: any;
    reFileName: string | Blob;
    horecaList: any;
    newList: any = [];
    mainData: any = [];
    sortedMainData: any = [];
    modalDropdownList: any = [];
    selectedCustomers: any;

    @ViewChild('dismissAddModal') dismissAddModal: ElementRef;
    @ViewChild('dismissDeleteModal') dismissDeleteModal: ElementRef;
    @Input() searchTerm = '';
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
            this.horecaFormGroup.get('customerType').disable();
        } else if (this.customerType === 'hrc') {
            this.getHorecaList();
            this.horecaFormGroup.get('customerType').setValue('hrc');
            this.horecaFormGroup.get('customerType').disable();
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
    }

    createForm(): void {
        this.horecaFormGroup = this.formBuilder.group({
            customerType: ['', [Validators.required]],
            customerId: ['', [Validators.required]],
            customerIdValue: ['', Validators.required],
        });
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
        this.roasterService.getMicroRoastersList(this.roasterId).subscribe((res: any) => {
            this.newList = [];
            this.modalDropdownList = [];
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
        this.roasterService.getMicroRoastersHoreca(this.roasterId).subscribe((res: any) => {
            this.newList = [];
            this.modalDropdownList = [];
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
        this.uploadButtonValue = 'Update Agreement';
        this.horecaFormGroup.get('customerType').setValue('');
        this.horecaFormGroup.get('customerId').setValue('');
        this.isUpdate = true;
        this.roasterService.getAgreementValue(this.roasterId, this.customerType, itemId).subscribe((resp: any) => {
            if (resp.success) {
                this.horecaFormGroup.get('customerType').setValue(resp.result.customer_type);
                this.horecaFormGroup.get('customerId').setValue(resp.result.customer_id);
                this.horecaFormGroup.get('customerId').disable();
                this.horecaFormGroup.get('customerType').disable();
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
        this.uploadButtonValue = 'Uploading';
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
                        const requestBody = {
                            customer_id: parseInt(this.horecaFormGroup.get('customerId').value, 10),
                            notify_customer: true,
                            file_id: result.result.id,
                        };
                        this.roasterService
                            .uploadAgreements(this.roasterId, this.customerType, requestBody)
                            .subscribe((res: any) => {
                                if (res.success) {
                                    this.uploadButtonValue = 'Upload Agreement';
                                    this.toastrService.success('The Agreement has been uploaded successfully');
                                    this.getAgreements();
                                    this.onUpdateModalClose();
                                    this.fileNameValue = '';
                                    document.getElementById('dismissAddModal').click();
                                } else {
                                    this.uploadButtonValue = 'Upload Agreement';
                                    this.toastrService.error('Error while uploading Agreegement');
                                }
                            });
                    } else {
                        this.uploadButtonValue = 'Upload Agreement';
                        this.toastrService.error('Error while uploading the file');
                    }
                });
            }
        }
    }

    // Function Name: Re-Upload File
    // Description: This function helps to capture re-uploaded file details

    reUploadFile(event: any) {
        this.fileNameValue = '';
        this.reFileNameValue = '';
        this.reFiles = event.target.files;
        this.reFileEvent = this.reFiles;
        this.reFileNameValue = this.reFiles[0].name;
    }

    // Function Name: Update Agreement
    // Description: This function helps in updating the file for the selected agreement

    updateAgreements() {
        this.updateButtonValue = 'Updating';
        const fileList: FileList = this.reFileEvent;
        if (fileList && fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
            formData.append('name', this.reFileNameValue);
            formData.append('file_module', 'Agreements');
            this.roasterId = this.cookieService.get('roaster_id');
            formData.append('api_call', '/ro/' + this.roasterId + '/file-manager/files');
            formData.append('token', this.cookieService.get('Auth'));
            this.roasterService.uploadFiles(formData).subscribe((result: any) => {
                if (result.success) {
                    this.toastrService.success('The file ' + this.fileNameValue + ' uploaded successfully');
                    const dataBody = {
                        file_id: result.result.id,
                    };
                    this.roasterService
                        .updateAgreements(this.roasterId, this.customerType, this.itemId, dataBody)
                        .subscribe((res: any) => {
                            if (res.success) {
                                this.uploadButtonValue = 'Update Agreement';
                                this.toastrService.success('The Agreement updated successfully');
                                this.getAgreements();
                                this.onUpdateModalClose();
                                this.fileNameValue = '';
                                document.getElementById('dismissAddModal').click();
                            } else {
                                this.uploadButtonValue = 'Upload Agreement';
                                this.toastrService.error('Error while updating the agreement details');
                            }
                        });
                    this.toastrService.success('The file ' + this.fileNameValue + ' uploaded successfully');
                }
            });
        } else {
            this.updateButtonValue = 'Update Agreement';
            this.toastrService.error('Error while uploading the file');
        }
    }

    // Function Name: Modal Close
    // Description: This function helps to reset the form data on modal close

    onUpdateModalClose() {
        this.fileNameValue = '';
        this.reFileNameValue = '';
        this.horecaFormGroup.get('customerId').enable();
        this.horecaFormGroup.get('customerId').setValue('');
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
