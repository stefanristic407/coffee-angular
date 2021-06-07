import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, GlobalsService } from '@services';
import { RoasteryProfileService } from '@services';
import { RoasterserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-roaster-agreement-form',
    templateUrl: './roaster-agreement-form.component.html',
    styleUrls: ['./roaster-agreement-form.component.scss'],
})
export class RoasterAgreementFormComponent implements OnInit, OnChanges {
    roasterId: number;
    agreementfileId: any;
    itemId: any;
    horecaFormGroup: FormGroup;
    uploadButtonValue = this.globals.languageJson?.upload_agreement;
    updateButtonValue = this.globals.languageJson?.update_agreement;
    fileEvent: any;
    fileNameValue: any;
    horecaList: any;
    selectedCustomers: number;
    modalDropdownList: any = [];
    fileDetails: any;

    @Input() isUpdate: boolean;
    @Input() selectedItemId: any;
    @Input() customerType = 'hrc';
    @Output() getAgreements = new EventEmitter();
    @Output() closeModal = new EventEmitter();

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public roasteryProfileService: RoasteryProfileService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        public globals: GlobalsService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.customerType = this.activatedRoute.snapshot.params.customerType;
        this.selectedItemId = this.activatedRoute.snapshot.params.itemId;
    }

    ngOnChanges(): void {
        this.createForm();
        this.initiate();
    }

    ngOnInit(): void {
        this.createForm();
        this.initiate();
    }

    createForm(): void {
        this.horecaFormGroup = this.formBuilder.group({
            customerType: ['', [Validators.required]],
            customerId: ['', [Validators.required]],
            file_id: [''],
        });
    }

    getSingleAgreement(): void {
        this.updateButtonValue = this.globals.languageJson?.update_agreement;
        this.roasterService
            .getAgreementValue(this.roasterId, this.customerType, this.selectedItemId)
            .subscribe((resp: any) => {
                if (resp.success) {
                    this.horecaFormGroup.get('customerType').setValue(resp.result.customer_type);
                    this.horecaFormGroup.get('customerId').setValue(resp.result.customer_id);
                    this.horecaFormGroup.get('customerId').disable();
                    this.horecaFormGroup.get('customerType').disable();
                    this.agreementfileId = resp.result.file_id;
                    this.fileNameValue = resp.result.file_name;
                    this.fileDetails = resp.result;
                    this.itemId = resp.result.id;
                }
            });
    }

    initiate() {
        if (this.selectedItemId) {
            this.isUpdate = true;
            this.getSingleAgreement();
        } else {
            this.isUpdate = false;
            this.horecaFormGroup.get('customerId').enable();
            this.horecaFormGroup.get('customerType').enable();
        }
        if (this.customerType === 'micro-roasters') {
            this.getMicroRoastersList();
            this.horecaFormGroup.get('customerType').setValue('mr');
        } else if (this.customerType === 'hrc') {
            this.horecaFormGroup.get('customerType').setValue('hrc');
            this.getHorecaList();
        }
    }

    getMicroRoastersList(): void {
        this.roasterService.getMicroRoastersList(this.roasterId).subscribe((res: any) => {
            this.modalDropdownList = [];
            if (res.success) {
                this.horecaList = res.result;
                this.horecaList.forEach((element) => {
                    if (element.id > 0) {
                        this.modalDropdownList.push(element);
                    }
                });

                this.modalDropdownList = this.modalDropdownList.map((item) => {
                    const transformItem = { label: '', value: '' };
                    transformItem.label = item.name;
                    transformItem.value = item.id;
                    return transformItem;
                });
                this.modalDropdownList = this.modalDropdownList.sort((a, b) =>
                    a.value.toString().localeCompare(b.value.toString()),
                );
            } else {
                this.toastrService.error(this.globals.languageJson?.error_getting_mr_list);
            }
        });
    }

    getHorecaList(): void {
        this.roasterService.getPartnerDetails(this.roasterId).subscribe((res: any) => {
            this.modalDropdownList = [];
            if (res.success) {
                this.horecaList = res.result;
                this.horecaList.forEach((element) => {
                    if (element.id > 0) {
                        this.modalDropdownList.push(element);
                    }
                });
                this.modalDropdownList = this.modalDropdownList.map((item) => {
                    const transformItem = { label: '', value: '' };
                    transformItem.label = item.name;
                    transformItem.value = item.id;
                    return transformItem;
                });
                this.modalDropdownList = this.modalDropdownList.sort((a, b) =>
                    a.value.toString().localeCompare(b.value.toString()),
                );
            } else {
                this.toastrService.error(this.globals.languageJson?.error_getting_horeca_list);
            }
        });
    }

    uploadAgreement(): void {
        if (this.horecaFormGroup.valid) {
            const requestBody = {
                customer_id: parseInt(this.horecaFormGroup.get('customerId').value, 10),
                notify_customer: true,
                file_id: this.horecaFormGroup.get('file_id').value.id,
            };
            this.roasterService
                .uploadAgreements(this.roasterId, this.customerType, requestBody)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.uploadButtonValue = this.globals.languageJson?.upload_agreement;
                        this.toastrService.success(this.globals.languageJson?.agreement_upload_success);
                        this.getAgreements.emit();
                        this.onUpdateModalClose();
                        this.fileNameValue = '';
                    } else {
                        this.uploadButtonValue = this.globals.languageJson?.upload_agreement;
                        this.toastrService.error(this.globals.languageJson?.error_uploading_agreement);
                    }
                });
        } else {
            this.horecaFormGroup.markAllAsTouched();
        }
    }

    updateAgreements(): void {
        if (this.fileDetails) {
            const dataBody = {
                file_id: this.fileDetails.file_id,
            };
            this.roasterService
                .updateAgreements(this.roasterId, this.customerType, this.itemId, dataBody)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.updateButtonValue = this.globals.languageJson?.update_agreement;
                        this.toastrService.success(this.globals.languageJson?.agreement_update_success);
                        this.getAgreements.emit();
                        this.onUpdateModalClose();
                        this.fileNameValue = '';
                    } else {
                        this.updateButtonValue = this.globals.languageJson?.upload_agreement;
                        this.toastrService.error(this.globals.languageJson?.error_updating_agreement_details);
                    }
                });
            this.toastrService.success('The file ' + this.fileNameValue + ' uploaded successfully');
        } else {
            this.toastrService.error(this.globals.languageJson?.browseFile);
        }
    }

    onRadioChange(): void {
        if (this.horecaFormGroup.value.customerType === 'mr') {
            this.getMicroRoastersList();
        } else if (this.horecaFormGroup.value.customerType === 'hrc') {
            this.getHorecaList();
        }
    }

    onUpdateModalClose() {
        this.fileNameValue = '';
        this.fileNameValue = '';
        this.horecaFormGroup.get('customerType').enable();
        this.horecaFormGroup.get('customerId').enable();
        this.horecaFormGroup.reset();
        this.horecaFormGroup.get('customerId').setValue('');
        if (this.customerType === 'micro-roasters') {
            this.getMicroRoastersList();
            this.horecaFormGroup.get('customerType').setValue('mr');
        } else if (this.customerType === 'hrc') {
            this.horecaFormGroup.get('customerType').setValue('hrc');
            this.getHorecaList();
        }
        this.closeModal.emit();
    }
}
