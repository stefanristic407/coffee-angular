import { Component, ElementRef, Input, OnChanges, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { RoasterserviceService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roaster-agreement-form',
  templateUrl: './roaster-agreement-form.component.html',
  styleUrls: ['./roaster-agreement-form.component.scss']
})
export class RoasterAgreementFormComponent implements OnInit, OnChanges {

  roasterId: string;
  agreementfileId: any;
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
  selectedCustomers: number;
  modalDropdownList: any = [];

  @ViewChild('dismissAddModal') dismissAddModal: ElementRef;
  @Input() isUpdate: boolean;
  @Input() selectedItemId: any;
  @Input() customerType = 'hrc';
  @Output() getAgreements = new EventEmitter();

  constructor(
    public router: Router,
    public cookieService: CookieService,
    public roasterService: RoasterserviceService,
    public toastrService: ToastrService,
    public roasteryProfileService: RoasteryProfileService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public globals: GlobalsService,
  ) {
    this.roasterId = this.cookieService.get('roaster_id');
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

  // Function Name: Create Form
  // Description: This function helps to create the form

  createForm(): void {
    this.horecaFormGroup = this.formBuilder.group({
      customerType: ['', [Validators.required]],
      customerId: ['', [Validators.required]]
    });
  }

  // Function Name: Get Single Agreement
  // Description: This function helps to fetch single agreement detail

  getSingleAgreement(): void {
    this.updateButtonValue = 'Update Agreement';
    // tslint:disable-next-line: deprecation
    this.roasterService.getAgreementValue(this.roasterId, this.customerType, this.selectedItemId).subscribe((resp: any) => {
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

  // Function Name: Get Micro Roaster
  // Description: This function helps to fetch the all micro roaster list

  getMicroRoastersList(): void {
    // tslint:disable-next-line: deprecation
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
        this.modalDropdownList = this.modalDropdownList.sort((a, b) => a.value.toString().localeCompare(b.value.toString()));
      } else {
        this.toastrService.error('Error while getting Micro-Roaster list');
      }
    });
  }

  // Function Name: Get Horeca List
  // Description: This function helps to fetch the all horeca list

  getHorecaList(): void {
    // tslint:disable-next-line: deprecation
    this.roasterService.getMicroRoastersHoreca(this.roasterId).subscribe((res: any) => {
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
        this.modalDropdownList = this.modalDropdownList.sort((a, b) => a.value.toString().localeCompare(b.value.toString()));
      } else {
        this.toastrService.error('Error while getting HoReCa list');
      }
    });
  }

  // Function Name: Upload File
  // Description: This function helps to capture uploaded file details

  uploadFile(event: any): void {
    this.fileNameValue = '';
    this.files = event.target.files;
    this.fileEvent = this.files;
    this.fileNameValue = this.files[0].name;
  }

  // Function Name: Upload Agreement
  // Description: This function helps in uploading the file and also creates the agreement

  uploadAgreement(): void {
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
        // tslint:disable-next-line: deprecation
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
              // tslint:disable-next-line: deprecation
              .subscribe((res: any) => {
                if (res.success) {
                  this.uploadButtonValue = 'Upload Agreement';
                  this.toastrService.success('The Agreement has been uploaded successfully');
                  this.getAgreements.emit();
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

  reUploadFile(event: any): void {
    this.fileNameValue = '';
    this.reFileNameValue = '';
    this.reFiles = event.target.files;
    this.reFileEvent = this.reFiles;
    this.reFileNameValue = this.reFiles[0].name;
  }

  // Function Name: Update Agreement
  // Description: This function helps in updating the file for the selected agreement

  updateAgreements(): void {
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
      // tslint:disable-next-line: deprecation
      this.roasterService.uploadFiles(formData).subscribe((result: any) => {
        if (result.success) {
          this.toastrService.success('The file ' + this.fileNameValue + ' uploaded successfully');
          const dataBody = {
            file_id: result.result.id,
          };
          this.roasterService
            .updateAgreements(this.roasterId, this.customerType, this.itemId, dataBody)
            // tslint:disable-next-line: deprecation
            .subscribe((res: any) => {
              if (res.success) {
                this.updateButtonValue = 'Update Agreement';
                this.toastrService.success('The Agreement updated successfully');
                this.getAgreements.emit();
                this.onUpdateModalClose();
                this.fileNameValue = '';
                document.getElementById('dismissAddModal').click();
              } else {
                this.updateButtonValue = 'Upload Agreement';
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

  // Function Name: Radio Button Change
  // Description: This function helps to change the dropdown value inside the modal

  onRadioChange(value): void {
    if (value === 'mr') {
      this.getMicroRoastersList();
    } else if (value === 'hrc') {
      this.getHorecaList();
    }
  }

  // Function Name: Modal Close
  // Description: This function helps to reset the form data on modal close

  onUpdateModalClose() {
    this.fileNameValue = '';
    this.reFileNameValue = '';
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
  }


}
