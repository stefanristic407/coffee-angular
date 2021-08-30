import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FileService, GlobalsService, IdmService } from '@services';
import { FileShareService } from '../file-share.service';

@Component({
    selector: 'app-edit-folder',
    templateUrl: './edit-folder.component.html',
    styleUrls: ['./edit-folder.component.scss'],
})
export class EditFolderComponent implements OnInit {
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
        private route: ActivatedRoute,
        private router: Router,
        private cookieSrv: CookieService,
        private toastrService: ToastrService,
        private globals: GlobalsService,
        private fileSrv: FileService,
        private idmService: IdmService,
        private fileShareSrv: FileShareService,
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
                label: this.globals.languageJson.can_view,
                value: 'VIEW',
            },
            {
                label: this.globals.languageJson.can_edit,
                value: 'EDIT',
            },
        ];
        this.infoForm = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            description: [null],
        });
        this.shareForm = this.fb.group({
            user: [null, Validators.compose([Validators.required])],
            permission: ['VIEW'],
        });
    }

    save() {
        if (this.infoForm.valid && (!this.invite || this.shareForm.valid)) {
            const postData = {
                ...this.infoForm.value,
                file_module: 'File-Share',
                parent_id: +this.fileShareSrv.folderId,
            };
            this.submitted = true;
            if (this.isCreate) {
                this.fileSrv.createFolder(postData).subscribe((res: any) => {
                    if (res.success) {
                        if (this.invite) {
                            this.record = res.result;
                            this.shareAndMap(res.result.id);
                        } else {
                            this.submitted = false;
                            this.toastrService.success('Folder created sucessfully');
                            this.router.navigateByUrl('/file-share');
                        }
                    } else {
                        this.submitted = false;
                        this.toastrService.error('Error while creating folder');
                    }
                });
            } else {
                this.fileSrv.updateFolder(this.record.id, postData).subscribe((res: any) => {
                    if (res.success) {
                        if (this.invite) {
                            this.record = res.result;
                            this.shareAndMap(res.result.id);
                        } else {
                            this.submitted = false;
                            this.toastrService.success('Folder details updated sucessfully');
                            this.router.navigateByUrl('/file-share');
                        }
                    } else {
                        this.submitted = false;
                        this.toastrService.error('Error while updating details');
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
        promises.push(new Promise((resolve, reject) => this.shareFolder(fileId, resolve, reject)));
        if (this.selectedOrderId && !(this.record?.order_ids === this.selectedOrderId)) {
            promises.push(new Promise((resolve, reject) => this.mapOrder(fileId, resolve, reject)));
        }
        Promise.all(promises)
            .then(() => {
                this.router.navigateByUrl('/file-share');
            })
            .catch(() => {});
    }

    shareFolder(fileId, resolve, reject) {
        const postData = {
            user_id: this.shareForm.value.user.id,
            permission: this.shareForm.value.permission,
            company_type: this.shareForm.value.user.organization_type,
            company_id: this.shareForm.value.user.organization_id,
        };
        this.fileSrv.shareFileFolder(fileId, postData).subscribe((res: any) => {
            this.submitted = false;
            if (res.success) {
                this.toastrService.success('Successfully shared.');
                resolve();
            } else {
                this.toastrService.error('Error! while sharing the created folder');
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
}
