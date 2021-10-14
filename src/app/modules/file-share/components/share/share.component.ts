import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { FileService, IdmService } from '@services';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
    readonly OrgType = OrganizationType;
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
        private translator: TranslateService,
        private fileSrv: FileService,
        private idmService: IdmService,
    ) {
        this.record = config.data.record;
    }

    ngOnInit(): void {
        this.permissionItems = [
            {
                label: this.translator.instant('can_view'),
                value: 'VIEW',
            },
            {
                label: this.translator.instant('can_edit'),
                value: 'EDIT',
            },
            {
                label: this.translator.instant('remove'),
                value: 'REMOVE',
            },
        ];
        this.infoForm = this.fb.group({
            users: [null, Validators.compose([Validators.required])],
            permission: ['VIEW'],
        });
        this.getSharedUsers();
    }

    onShare() {
        if (this.infoForm.invalid) {
            this.infoForm.markAllAsTouched();
            return;
        }
        const promises = [];
        this.infoForm.value.users.forEach((ix) =>
            promises.push(new Promise((resolve, reject) => this.share(this.record.id, ix, resolve, reject))),
        );
        this.submitted = true;
        Promise.all(promises)
            .then(() => {
                this.submitted = false;
                this.toastrService.success('Shared successfully.');
                this.close(true);
            })
            .catch(() => {
                this.submitted = false;
                this.toastrService.error('Error! while sharing');
            });
    }

    private share(fileId, user, resolve, reject) {
        const postData = {
            user_id: user.id,
            permission: user.permission,
            company_type: user.organization_type,
            company_id: user.organization_id,
        };
        this.fileSrv.shareFileFolder(fileId, postData).subscribe((res: any) => {
            if (res.success) {
                resolve();
            } else {
                reject();
            }
        });
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

    private getSharedUsers() {
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
        if (searchStr.length < 3) {
            this.usersList = [];
            return;
        }
        this.idmService
            .getUsersList(
                searchStr,
                `${OrganizationType.ROASTER},${OrganizationType.ESTATE},${OrganizationType.MICRO_ROASTER},${OrganizationType.FACILITATOR},${OrganizationType.HORECA},${OrganizationType.SEWN_ADMIN}`,
            )
            .subscribe((res: any) => {
                if (res.success) {
                    this.usersList = res.result
                        .filter(
                            (ix) =>
                                (this.infoForm.value.user || []).findIndex(
                                    (iy) => ix.id === iy.id && ix.organization_id === iy.organization_id,
                                ) < 0 &&
                                (this.sharedUsers || []).findIndex(
                                    (iy) => ix.id === iy.user_id && ix.organization_id === iy.company_id,
                                ) < 0,
                        )
                        .map((ix) => {
                            return {
                                ...ix,
                                name: `${ix.firstname} ${ix.lastname}`.trim(),
                                nameWithOrg: `${ix.firstname} ${ix.lastname}`.trim() + `(${ix.organization_name})`,
                                permission: this.infoForm.value.permission,
                            };
                        });
                } else {
                    this.toastrService.error('Error while fetching users list');
                }
            });
    }

    close(value = null) {
        this.ref.close(value);
    }
}
