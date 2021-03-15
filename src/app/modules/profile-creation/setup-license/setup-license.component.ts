import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-setup-license',
    templateUrl: './setup-license.component.html',
    styleUrls: ['./setup-license.component.scss'],
})
export class SetupLicenseComponent implements OnInit {
    breadItems = [
        { label: 'home', routerLink: '/' },
        { label: 'roastery_profile', routerLink: '/roastery-profile' },
        { label: 'add_certificate' },
    ];

    @ViewChild('myFileInput') myFileInput: ElementRef;
    onboardingType = 'roaster';
    roasterId: any;
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
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
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
        const certificateId = this.certificationArray[index].id;
        this.userService.deleteCompanyCertificate(this.roasterId, certificateId).subscribe((res: any) => {
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
        this.userService.getCompanyCertificates(this.roasterId).subscribe((res: any) => {
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
            formData.append('api_call', `/ro/${this.roasterId}/certificates`);
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
