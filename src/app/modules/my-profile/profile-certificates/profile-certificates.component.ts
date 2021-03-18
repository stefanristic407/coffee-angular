import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalsService, UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmComponent } from '@shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile-certificates',
    templateUrl: './profile-certificates.component.html',
    styleUrls: ['./profile-certificates.component.scss'],
})
export class ProfileCertificatesComponent implements OnInit {
    @ViewChild('myFileInput') myFileInput: ElementRef;
    roasterId: any;
    userId: any;
    public certificationArray: any = [];
    file: File;
    certificateList: any[];
    editingRowIndex = -1;
    selectedCertification: any;
    selectedCertificationYear: number;
    yearList: any[] = [];

    constructor(
        private userService: UserserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private route: ActivatedRoute,
        private dialogSrv: DialogService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.userId = this.cookieService.get('user_id');
    }

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
            }
        });
    }

    onFileChange(event) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const fsize = file.size;
            const fileSize = Math.round(fsize / 1024);
            // The size of the file.
            if (fileSize >= 2048) {
                this.toastrService.error('File too big, please select a file smaller than 2mb');
            } else {
                this.file = file;
            }
        }
    }

    onEdit(index) {
        this.editingRowIndex = index;
        this.selectedCertification = this.certificationArray[index].certificate_type_id;
        this.selectedCertificationYear = this.certificationArray[index].year;
    }

    onDelete(index) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    const certificateId = this.certificationArray[index].id;
                    this.userService
                        .deleteCertificate(this.roasterId, this.userId, certificateId)
                        .subscribe((res: any) => {
                            if (res.success) {
                                this.certificationArray.splice(index, 1);
                                this.editingRowIndex = -2;
                                this.toastrService.success('The selected certificate has been deleted successfully');
                            } else {
                                this.toastrService.error('Something went wrong while deleting the certificate');
                            }
                        });
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
        this.userService.getCertificates(this.roasterId, this.userId).subscribe((res: any) => {
            if (res.success) {
                const editId = this.route.snapshot.params?.id || '';
                this.certificationArray = res.result;
                console.log('certificationArray: ', this.certificationArray);
                if (editId) {
                    this.certificationArray.map((item, index) => {
                        if (item.id.toString() === editId) {
                            this.onEdit(index);
                        }
                    });
                }
            }
        });
    }

    onSave() {
        if (!this.selectedCertification || !this.selectedCertificationYear) {
            this.toastrService.error('Please fill all required fields.');
            return;
        }
        const certification = this.certificateList.find((item) => item.id === this.selectedCertification);
        if (this.editingRowIndex === -1) {
            if (!this.file) {
                this.toastrService.error('Please fill all required fields.');
                return;
            }
            const formData: FormData = new FormData();
            formData.append('file', this.file);
            formData.append('certificate_type_id', certification.id);
            formData.append('name', certification.type);
            formData.append('year', this.selectedCertificationYear.toString());
            formData.append('api_call', `/ro/${this.roasterId}/users/${this.userId}/certificates`);
            formData.append('token', this.cookieService.get('Auth'));
            formData.append('method', 'POST');
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Certificates has been added Successfully');
                    const newRow = {
                        id: res.result.id,
                        certificate_type_id: certification.id,
                        certificate_type: certification.type,
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
            formData.append('certificate_type_id', this.certificationArray[this.editingRowIndex].certificate_type_id);
            formData.append('certificate_id', this.certificationArray[this.editingRowIndex].id);
            formData.append('name', certification.type);
            formData.append('year', this.selectedCertificationYear.toString());
            formData.append(
                'api_call',
                `/ro/${this.roasterId}/certificates/${this.certificationArray[this.editingRowIndex].id}`,
            );
            formData.append('token', this.cookieService.get('Auth'));
            formData.append('method', 'PUT');
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Certificates has been updated Successfully');
                    this.certificationArray[this.editingRowIndex] = {
                        ...this.certificationArray[this.editingRowIndex],
                        certificate_type_id: certification.id,
                        certificate_type: certification.type,
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
}
