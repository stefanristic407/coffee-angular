import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FileService, IdmService } from '@services';
import { FileShareService } from '../file-share.service';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-edit-folder',
    templateUrl: './edit-folder.component.html',
    styleUrls: ['./edit-folder.component.scss'],
})
export class EditFolderComponent implements OnInit {
    readonly OrgType = OrganizationType;
    isCreate = true;
    infoForm: FormGroup;
    shareForm: FormGroup;
    record: any;
    invite = false;
    permissionItems = [];
    usersList: any[];
    submitted = false;
    showOrderPanel = false;
    selectedOrderId: any;
    selectedOrderType: any;

    constructor(
        private fb: FormBuilder,
        private fileShareSrv: FileShareService,
        private fileSrv: FileService,
        private idmService: IdmService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
    ) {
        this.route.paramMap.subscribe((params) => {
            if (params.has('folderId')) {
                this.fileShareSrv.folderId = +params.get('folderId');
            }
        });
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
        ];
        this.infoForm = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            description: [null],
        });
        this.shareForm = this.fb.group({
            users: [null],
            permission: ['VIEW'],
        });
    }

    save() {
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                file_module: 'File-Share',
                parent_id: +this.fileShareSrv.folderId,
            };
            this.submitted = true;

            if (this.isCreate) {
                this.fileSrv.createFolder(postData).subscribe((res: any) => {
                    if (res.success) {
                        this.record = res.result;
                        this.shareAndMap(res.result.id);
                    } else {
                        this.submitted = false;
                        this.toastrService.error('Error while creating folder');
                    }
                });
            } else {
                this.fileSrv.updateFolder(this.record.id, postData).subscribe((res: any) => {
                    if (res.success) {
                        this.record = res.result;
                        this.shareAndMap(res.result.id);
                    } else {
                        this.submitted = false;
                        this.toastrService.error('Error while creating folder');
                    }
                });
            }
        } else {
            this.infoForm.markAllAsTouched();
            this.shareForm.markAllAsTouched();
        }
    }

    shareAndMap(fileId) {
        const promises = [];
        if (this.invite && this.shareForm.value.users?.length) {
            this.shareForm.value.users.forEach((ix) =>
                promises.push(new Promise((resolve, reject) => this.shareFolder(fileId, ix, resolve, reject))),
            );
        }
        if (this.selectedOrderId && !(this.record?.order_ids === this.selectedOrderId)) {
            promises.push(new Promise((resolve, reject) => this.mapOrder(fileId, resolve, reject)));
        }
        Promise.all(promises)
            .then(() => {
                this.submitted = false;
                if (this.invite && this.shareForm.value.users?.length) {
                    this.toastrService.success('Folder created and shared sucessfully');
                } else {
                    this.toastrService.success('Folder created sucessfully');
                }
                this.router.navigateByUrl('/file-share');
            })
            .catch(() => {
                this.submitted = false;
                this.toastrService.success('Folder created sucessfully but error while sharing folder');
            });
    }

    shareFolder(fileId, user, resolve, reject) {
        const postData = {
            user_id: user.id,
            permission: user.permission,
            company_type: user.organization_type,
            company_id: user.organization_id,
        };
        this.fileSrv.shareFileFolder(fileId, postData).subscribe((res: any) => {
            this.submitted = false;
            if (res.success) {
                resolve();
            } else {
                reject();
            }
        });
    }

    mapOrder(fileId, resolve, reject) {
        const postData = {
            order_id: this.selectedOrderId,
            order_type: this.selectedOrderType,
        };
        this.fileSrv.mapOrder(fileId, postData).subscribe((res: any) => {
            this.submitted = false;
            if (res.success) {
                this.toastrService.success('Order mapped successfully');
                resolve();
            } else {
                this.toastrService.error('Error! while mapping order');
                reject();
            }
        });
    }

    selectOrder(event) {
        this.selectedOrderId = event.orderId;
        this.selectedOrderType = event.orderType;
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
                                (this.shareForm.value.user || []).findIndex(
                                    (iy) => ix.id === iy.id && ix.organization_id === iy.organization_id,
                                ) < 0,
                        )
                        .map((ix) => {
                            return {
                                ...ix,
                                name: `${ix.firstname} ${ix.lastname}`.trim(),
                                nameWithOrg: `${ix.firstname} ${ix.lastname}`.trim() + `(${ix.organization_name})`,
                                permission: this.shareForm.value.permission,
                            };
                        });
                } else {
                    this.toastrService.error('Error while fetching users list');
                }
            });
    }
}
