import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService, GlobalsService, UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-profile-certificates-edit',
    templateUrl: './profile-certificates-edit.component.html',
    styleUrls: ['./profile-certificates-edit.component.scss'],
})
export class ProfileCertificatesEditComponent implements OnInit {
    @ViewChild('myFileInput') myFileInput: ElementRef;
    roasterId: any;
    userId: any;
    @Input() certificationArray;
    file: File;
    editingRowIndex = -1;
    selectedCertificationName: any;
    selectedCertificationYear: number;
    yearList: any[] = [];
    isSavingCertificate = false;

    constructor(
        private userService: UserserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private cookieService: CookieService,
        private route: ActivatedRoute,
        private dialogSrv: DialogService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.userId = this.cookieService.get('user_id');
    }

    ngOnInit(): void {
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

    onFileChange(event): void {
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

    onEdit(index): void {
        this.editingRowIndex = index;
        this.selectedCertificationName = this.certificationArray[index].name;
        this.selectedCertificationYear = this.certificationArray[index].year;
    }

    onDelete(index): void {
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

    onAdd(): void {
        this.editingRowIndex = -1;
    }

    onCancel(): void {
        this.editingRowIndex = -2;
        this.selectedCertificationName = null;
        this.selectedCertificationYear = null;
    }

    onSave(): void {
        if (!this.selectedCertificationName || !this.selectedCertificationYear) {
            this.toastrService.error('Please fill all required fields.');
            return;
        }
        if (this.editingRowIndex === -1) {
            if (!this.file) {
                this.toastrService.error('Please fill all required fields.');
                return;
            }
            const formData: FormData = new FormData();
            formData.append('file', this.file);
            formData.append('name', this.selectedCertificationName);
            formData.append('year', this.selectedCertificationYear.toString());
            formData.append('api_call', `/ro/${this.roasterId}/users/${this.userId}/certificates`);
            formData.append('token', this.authService.token);
            formData.append('method', 'POST');
            this.isSavingCertificate = true;
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                this.isSavingCertificate = false;
                if (res.success) {
                    this.toastrService.success('Certificates has been added Successfully');
                    const newRow = {
                        id: res.result.id,
                        certificate_type_id: null,
                        name: this.selectedCertificationName,
                        certificate_type: '',
                        year: this.selectedCertificationYear,
                        public_url: res.result.url,
                    };
                    this.certificationArray.push(newRow);
                }
                this.selectedCertificationName = null;
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
            formData.append('certificate_id', this.certificationArray[this.editingRowIndex].id);
            formData.append('name', this.selectedCertificationName);
            formData.append('year', this.selectedCertificationYear.toString());
            formData.append(
                'api_call',
                `/ro/${this.roasterId}/users/${this.userId}/certificates/${
                    this.certificationArray[this.editingRowIndex].id
                }`,
            );
            formData.append('token', this.authService.token);
            formData.append('method', 'PUT');
            this.isSavingCertificate = true;
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                this.isSavingCertificate = false;
                if (res.success) {
                    this.toastrService.success('Certificates has been updated Successfully');
                    this.certificationArray[this.editingRowIndex] = {
                        ...this.certificationArray[this.editingRowIndex],
                        name: this.selectedCertificationName,
                        certificate_type: '',
                        year: this.selectedCertificationYear,
                    };
                }
                this.selectedCertificationName = null;
                this.selectedCertificationYear = null;
                this.editingRowIndex = -2;
                this.file = null;
                this.myFileInput.nativeElement.value = '';
            });
        }
    }

    onChangeYear(event): void {
        this.selectedCertificationYear = event.value;
    }

    onUpload(): void {
        this.myFileInput.nativeElement.click();
    }

    onRemoveFile(): void {
        this.file = null;
        this.myFileInput.nativeElement.value = '';
        if (this.editingRowIndex > -1) {
            this.certificationArray[this.editingRowIndex].public_url = null;
        }
    }
}
