import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FileService, IdmService, RoasterService } from '@services';

@Component({
    selector: 'app-folder-dialog',
    templateUrl: './folder-dialog.component.html',
    styleUrls: ['./folder-dialog.component.scss'],
})
export class FolderDialogComponent implements OnInit {
    isCreate = true;
    infoForm: FormGroup;
    shareForm: FormGroup;
    record: any;
    invite = false;
    roasterId: string;
    permissionItems = [
        {
            label: 'Can view',
            value: 'VIEW',
        },
        {
            label: 'Can edit',
            value: 'EDIT',
        },
    ];
    usersList: any[];
    submitted = false;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
        private cookieSrv: CookieService,
        private toastrService: ToastrService,
        private fileService: FileService,
        private idmService: IdmService,
    ) {
        this.roasterId = this.cookieSrv.get('roaster_id');
        this.record = config.data.record;
        if (this.record) {
            this.isCreate = false;
        }
    }

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            description: [null],
        });
        this.shareForm = this.fb.group({
            user: [null, Validators.compose([Validators.required])],
            permission: [null, Validators.compose([Validators.required])],
        });
        this.infoForm.patchValue(this.record);
    }

    save() {
        console.log(this.infoForm.value, this.shareForm.value);
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                file_module: 'File-Share',
            };
            this.submitted = true;
            if (this.isCreate) {
                this.fileService.createFolder(postData).subscribe((res: any) => {
                    if (res.success) {
                        if (this.invite) {
                            this.record = res.result;
                            this.shareFolder(res.result.id);
                        } else {
                            this.submitted = false;
                            this.toastrService.success('Folder created sucessfully');
                            this.close(res.result);
                        }
                    } else {
                        this.submitted = false;
                        this.toastrService.error('Error while creating folder');
                    }
                });
            } else {
                this.fileService.updateFolder(this.config.data.record.id, postData).subscribe((res: any) => {
                    if (res.success) {
                        if (this.invite) {
                            this.record = res.result;
                            this.shareFolder(res.result.id);
                        } else {
                            this.submitted = false;
                            this.toastrService.success('Folder details updated sucessfully');
                            this.close(res.result);
                        }
                    } else {
                        this.submitted = false;
                        this.toastrService.error('Error while updating details');
                    }
                });
            }
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    shareFolder(fileId) {
        const postData = {
            user_id: this.shareForm.value.user.id,
            permission: this.shareForm.value.permission,
            company_type: this.shareForm.value.user.organization_type,
            company_id: this.shareForm.value.user.organization_id,
        };
        this.fileService.shareFileFolder(fileId, postData).subscribe((res: any) => {
            this.submitted = false;
            if (res.success) {
                this.toastrService.success('New folder ' + this.record.name + ' has been created.');
                this.close(this.record);
            } else {
                this.toastrService.error('Error! while sharing the created folder');
            }
        });
    }

    selectOrder() {}

    getUsersList(event: any) {
        console.log(event);
        const typedValue = event.query;
        if (typedValue.length > 4) {
            this.idmService.getUsersList(typedValue).subscribe((res: any) => {
                if (res.success) {
                    this.usersList = res.result;
                    this.usersList.map((element) => (element.name = `${element.firstname} ${element.lastname}`));
                } else {
                    this.toastrService.error('Error while fetching users list');
                }
            });
        }
    }

    close(value = null) {
        this.ref.close(value);
    }
}
