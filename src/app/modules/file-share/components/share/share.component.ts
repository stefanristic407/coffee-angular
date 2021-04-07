import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { FileService } from '@services';
import { RoasterserviceService } from '@services';

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
        private roasterSrv: RoasterserviceService,
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
            this.submitted = false;
            this.fileSrv.shareFileFolder(this.record.id, postData).subscribe((res: any) => {
                this.submitted = false;
                if (res.success) {
                    this.toastrService.success('Shared successfully.');
                    this.close(res.result);
                } else {
                    this.toastrService.error('Error! while sharing');
                }
            });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    updatePermission(value) {
        const postData = {
            user_id: value.user_id,
            permission: value.permission,
            company_type: value.company_type,
            company_id: value.company_id,
        };
        this.fileSrv.updatePermission(this.record.id, postData).subscribe((res: any) => {
            this.submitted = false;
            if (res.success) {
                this.toastrService.success('Permission has been updated succssfully.');
            } else {
                this.toastrService.error('Error while changing the Share permissions');
            }
        });
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
        this.roasterSrv.getUsersList(event.query).subscribe((res: any) => {
            if (res.success) {
                this.usersList = res.result;
                this.usersList.map((element) => (element.name = `${element.firstname} ${element.lastname}`));
            } else {
                this.toastrService.error('Error while fetching users list');
            }
        });
    }

    close(value = null) {
        this.ref.close(value);
    }
}
