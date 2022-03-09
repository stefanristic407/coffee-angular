import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CertificateType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@services';
import { checkFile } from '@utils';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-setup-license',
    templateUrl: './setup-license.component.html',
    styleUrls: ['./setup-license.component.scss'],
})
export class SetupLicenseComponent implements OnInit {
    @Input() editId: number;
    @Output() closeEvent = new EventEmitter<any>();
    @ViewChild('myFileInput') myFileInput: ElementRef;

    public certificationArray: any = [];
    file: File;
    certificateList: any[];
    editingRowIndex = -1;
    selectedCertification: any;
    selectedCertificationYear: number;
    yearList: any[] = [];

    constructor(
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.getCertificateTypes();
        this.getCertificates();

        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 70; i--) {
            this.yearList = [
                ...this.yearList,
                {
                    label: i,
                    value: i,
                },
            ];
        }
    }

    getCertificateTypes() {
        this.userService.getCertificateTypes().subscribe((res: any) => {
            if (res.success) {
                this.certificateList = Object.values(res.result);
                this.certificateList = this.certificateList.filter((item) => {
                    return (
                        item.tags &&
                        item.tags.includes(this.userService.orgSlug) &&
                        item.type !== CertificateType.EraOfWe
                    );
                });
            }
        });
    }

    onFileChange(event) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            checkFile(file, 2).subscribe((res) => {
                if (res) {
                    this.toastrService.error(res.message);
                    event.target.value = '';
                } else {
                    this.file = file;
                }
            });
        }
    }

    onEdit(index) {
        this.editingRowIndex = index;
        this.selectedCertification = this.certificationArray[index].certificate_type_id;
        this.selectedCertificationYear = this.certificationArray[index].year;
    }

    onDelete(index) {
        const certificateId = this.certificationArray[index].id;
        this.userService.deleteCompanyCertificate(certificateId).subscribe((res: any) => {
            if (res.success) {
                this.certificationArray.splice(index, 1);
                this.editingRowIndex = -2;
            }
        });
    }

    onAdd() {
        this.editingRowIndex = -1;
    }

    onCancel() {
        this.editingRowIndex = -2;
        this.selectedCertification = null;
        this.selectedCertificationYear = null;
    }

    getCertificates() {
        this.userService.getCompanyCertificates().subscribe((res: any) => {
            if (res.success) {
                this.certificationArray = res.result || [];
                if (this.editId) {
                    this.certificationArray.map((item, index) => {
                        if (item.id === this.editId) {
                            this.onEdit(index);
                        }
                    });
                }
            }
        });
    }

    onSave() {
        if (!this.selectedCertification || !this.selectedCertificationYear) {
            this.toastrService.error(this.translator.instant('please_check_form_data'));
            return;
        }
        const certification = this.certificateList.find((item) => item.id === this.selectedCertification);
        if (this.editingRowIndex < 0) {
            if (!this.file) {
                this.toastrService.error(this.translator.instant('please_check_form_data'));
                return;
            }
            const formData: FormData = new FormData();
            formData.append('file', this.file);
            formData.append('certificate_type_id', certification.id);
            formData.append('name', certification.type);
            formData.append('year', this.selectedCertificationYear.toString());
            formData.append('api_call', `${this.userService.apiCallPrefix}/certificates`);
            formData.append('token', this.userService.token);
            formData.append('method', 'POST');
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Certificates has been added successfully');
                    const newRow = {
                        id: res.result.id,
                        certificate_type_id: certification.id,
                        certificate_type: certification.type,
                        certificate_type_name: certification.name,
                        year: this.selectedCertificationYear,
                        public_url: res.result.url,
                    };
                    this.certificationArray.push(newRow);
                }
                this.selectedCertification = null;
                this.selectedCertificationYear = null;
                this.editingRowIndex = -2;
                this.file = null;
                this.myFileInput.nativeElement.value = '';
            });
        } else {
            const formData: FormData = new FormData();
            if (this.file) {
                formData.append('file', this.file);
            }
            const certId = this.certificationArray[this.editingRowIndex].id;
            formData.append('certificate_type_id', this.certificationArray[this.editingRowIndex].certificate_type_id);
            formData.append('certificate_id', certId);
            formData.append('name', certification.type);
            formData.append('year', this.selectedCertificationYear.toString());
            formData.append('api_call', `${this.userService.apiCallPrefix}/certificates/${certId}`);
            formData.append('token', this.userService.token);
            formData.append('method', 'PUT');
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Certificates has been updated successfully');
                    this.certificationArray[this.editingRowIndex] = {
                        ...this.certificationArray[this.editingRowIndex],
                        certificate_type_id: certification.id,
                        certificate_type: certification.type,
                        certificate_type_name: certification.name,
                        year: this.selectedCertificationYear,
                    };
                }
                this.selectedCertification = null;
                this.selectedCertificationYear = null;
                this.editingRowIndex = -2;
                this.file = null;
                this.myFileInput.nativeElement.value = '';
            });
        }
    }

    onChangeType(event) {
        this.selectedCertification = event.value;
    }

    onChangeYear(event) {
        this.selectedCertificationYear = event.value;
    }

    onUpload() {
        this.myFileInput.nativeElement.click();
    }

    onRemoveFile() {
        this.file = null;
        this.myFileInput.nativeElement.value = '';
        if (this.editingRowIndex > -1) {
            this.certificationArray[this.editingRowIndex].public_url = null;
        }
    }

    close() {
        this.closeEvent.emit();
    }
}
