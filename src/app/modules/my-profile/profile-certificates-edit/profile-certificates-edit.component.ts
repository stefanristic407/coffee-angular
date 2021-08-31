import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, UserService } from '@services';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-profile-certificates-edit',
    templateUrl: './profile-certificates-edit.component.html',
    styleUrls: ['./profile-certificates-edit.component.scss'],
})
export class ProfileCertificatesEditComponent implements OnInit {
    roasterId: any;
    userId: any;
    @Input() certificationArray;
    editingRowIndex = -2;
    yearList: any[] = [];
    isSavingCertificate = false;
    certificateForm: FormGroup;

    constructor(
        private authService: AuthService,
        private dialogSrv: DialogService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private userService: UserService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.userId = this.authService.userId;
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

        this.certificateForm = this.fb.group({
            name: [null, Validators.required],
            year: [null, Validators.required],
            file: [null, Validators.required],
        });
    }

    onEdit(index?): void {
        this.editingRowIndex = index || -1;
        this.certificateForm.reset();
        if (this.editingRowIndex > -1) {
            this.certificateForm.patchValue({
                ...this.certificationArray[index],
                file: {
                    id: this.certificationArray[index].public_url,
                    url: this.certificationArray[index].public_url,
                },
            });
        }
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
                                this.editingRowIndex = -1;
                                this.toastrService.success('The selected certificate has been deleted successfully');
                            } else {
                                this.toastrService.error('Something went wrong while deleting the certificate');
                            }
                        });
                }
            });
    }

    onCancel(): void {
        this.editingRowIndex = -2;
        this.certificateForm.reset();
    }

    onSave(): void {
        if (this.certificateForm.invalid) {
            this.toastrService.error('Please fill all required fields.');
            this.certificateForm.markAllAsTouched();
            return;
        }
        const formData: FormData = new FormData();
        formData.append('name', this.certificateForm.value.name);
        formData.append('year', this.certificateForm.value.year.toString());
        formData.append('token', this.authService.token);
        if (this.certificateForm.value.file.file) {
            formData.append('file', this.certificateForm.value.file.file);
        }
        if (this.editingRowIndex === -1) {
            formData.append('api_call', `/ro/${this.roasterId}/users/${this.userId}/certificates`);
            formData.append('method', 'POST');
            this.isSavingCertificate = true;
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                this.isSavingCertificate = false;
                if (res.success) {
                    this.toastrService.success('Certificates has been added Successfully');
                    this.certificationArray.push({
                        id: res.result.id,
                        certificate_type_id: null,
                        name: this.certificateForm.value.name,
                        certificate_type: '',
                        year: this.certificateForm.value.year,
                        public_url: res.result.url,
                    });
                }
                this.onCancel();
            });
        } else {
            formData.append('certificate_id', this.certificationArray[this.editingRowIndex].id);
            formData.append(
                'api_call',
                `/ro/${this.roasterId}/users/${this.userId}/certificates/${
                    this.certificationArray[this.editingRowIndex].id
                }`,
            );
            formData.append('method', 'PUT');
            this.isSavingCertificate = true;
            this.userService.uploadCertificate(formData).subscribe((res: any) => {
                this.isSavingCertificate = false;
                if (res.success) {
                    this.toastrService.success('Certificates has been updated Successfully');
                    this.certificationArray[this.editingRowIndex] = {
                        ...this.certificationArray[this.editingRowIndex],
                        name: this.certificateForm.value.name,
                        certificate_type: '',
                        year: this.certificateForm.value.year,
                    };
                }
                this.onCancel();
            });
        }
    }
}
