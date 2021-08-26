import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { FileService, GlobalsService, IdmService } from '@services';

@Component({
    selector: 'app-share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
    infoForm: FormGroup;
    record: any;
    permissionItems = [];
    usersList: any[] = [];
    sharedUsers: any[] = [];
    submitted = false;
    isOpened = false;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private globals: GlobalsService,
        private fileSrv: FileService,
        private idmService: IdmService,
    ) {
        this.record = config.data.record;
    }

    ngOnInit(): void {
        this.permissionItems = [
            {
                label: this.globals.languageJson.can_view,
                value: 'VIEW',
            },
            {
                label: this.globals.languageJson.can_edit,
                value: 'EDIT',
            },
            {
                label: this.globals.languageJson.remove,
                value: 'REMOVE',
            },
        ];
        this.infoForm = this.fb.group({
            user: [null, Validators.compose([Validators.required])],
            permission: ['VIEW'],
        });
        this.getSharedUsers();
    }

    share() {
        if (this.infoForm.valid) {
            const postData = {
                user_id: this.infoForm.value.user.id,
                permission: this.infoForm.value.permission,
                company_type: this.infoForm.value.user.organization_type,
                company_id: this.infoForm.value.user.organization_id,
            };
            this.submitted = true;
            this.fileSrv.shareFileFolder(this.record.id, postData).subscribe((res: any) => {
                this.submitted = false;
                if (res.success) {
                    this.toastrService.success('Shared successfully.');
                    this.close(res.success);
                } else {
                    this.toastrService.error('Error! while sharing');
                }
            });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    updatePermission(value) {
        if (value.permission === 'REMOVE') {
            const postData = {
                user_id: value.user_id,
                company_type: value.company_type,
                company_id: value.company_id,
            };
            this.submitted = true;
            this.fileSrv.unshareFileFolder(this.record.id, postData).subscribe((res: any) => {
                this.submitted = false;
                if (res.success) {
                    this.toastrService.success('Unshared successfully.');
                    this.close(res.success);
                } else {
                    this.toastrService.error('Error! while unsharing');
                }
            });
        } else {
            const postData = {
                user_id: value.user_id,
                permission: value.permission,
                company_type: value.company_type,
                company_id: value.company_id,
            };
            this.submitted = true;
            this.fileSrv.updatePermission(this.record.id, postData).subscribe((res: any) => {
                this.submitted = false;
                if (res.success) {
                    this.toastrService.success('Permission has been updated succssfully.');
                } else {
                    this.toastrService.error('Error while changing the Share permissions');
                }
            });
        }
    }

    getSharedUsers() {
        this.fileSrv.getSharedUsers(this.record.id).subscribe((res: any) => {
            if (res.success) {
                this.sharedUsers = res.result;
            } else {
                this.toastrService.error('Error while getting the shared users');
            }
        });
    }

    getUsersList(event: any) {
        const searchStr: string = (event?.query || '').trim();
        if (searchStr.length < 4) {
            this.usersList = [];
            return;
        }
        this.idmService.getUsersList(searchStr).subscribe((res: any) => {
            if (res.success) {
                this.usersList = res.result;
                this.usersList.map((ix) => (ix.name = `${ix.firstname} ${ix.lastname}`.trim()));
            } else {
                this.toastrService.error('Error while fetching users list');
            }
        });
    }

    close(value = null) {
        this.ref.close(value);
    }
}
