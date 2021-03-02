import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { FileService } from '@services';
import { RoasterserviceService } from '@services';
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
    roasterId: string;
    permissionItems = [];
    usersList: any[];
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private cookieSrv: CookieService,
        private toastrService: ToastrService,
        private globals: GlobalsService,
        private fileSrv: FileService,
        private roasterSrv: RoasterserviceService,
        private fileShareSrv: FileShareService,
    ) {
        this.roasterId = this.cookieSrv.get('roaster_id');
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
                            this.shareFolder(res.result.id);
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
                this.roasterSrv.updateFolderDetails(this.roasterId, this.record.id, postData).subscribe((res: any) => {
                    if (res.success) {
                        if (this.invite) {
                            this.record = res.result;
                            this.shareFolder(res.result.id);
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

    shareFolder(fileId) {
        const postData = {
            user_id: this.shareForm.value.user.id,
            permission: this.shareForm.value.permission,
            company_type: this.shareForm.value.user.organization_type,
            company_id: this.shareForm.value.user.organization_id,
        };
        this.roasterSrv.shareFolder(this.roasterId, fileId, postData).subscribe((res: any) => {
            this.submitted = false;
            if (res.success) {
                this.toastrService.success('New folder ' + this.record.name + ' has been created.');
                this.router.navigateByUrl('/file-share');
            } else {
                this.toastrService.error('Error! while sharing the created folder');
            }
        });
    }

    selectOrder() {}

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
}
