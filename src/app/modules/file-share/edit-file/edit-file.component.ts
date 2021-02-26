import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '@services';

@Component({
    selector: 'app-edit-file',
    templateUrl: './edit-file.component.html',
    styleUrls: ['./edit-file.component.scss'],
})
export class EditFileComponent implements OnInit {
    isCreate = true;
    infoForm: FormGroup;
    record: any;
    roasterId: string;
    submitted = false;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
        private cookieSrv: CookieService,
        private toastrService: ToastrService,
        private fileSrv: FileService,
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
        this.infoForm.patchValue(this.record);
    }

    save() {
        console.log(this.infoForm.value);
        if (this.infoForm.valid) {
            const formData: FormData = new FormData();
            // formData.append('file', file, file.name);
            formData.append('name', this.infoForm.value.name);
            formData.append('description', this.infoForm.value.description);

            this.submitted = true;
            if (this.isCreate) {
                // formData.append('file_module', 'File-Share');
                // formData.append('parent_id', '0');
                // this.fileSrv.uploadFiles(formData).subscribe((res: any) => {
                //     if (res.success) {
                //         this.submitted = false;
                //         this.toastrService.success('Folder created sucessfully');
                //         this.close(res.result);
                //     } else {
                //         this.submitted = false;
                //         this.toastrService.error('Error while creating folder');
                //     }
                // });
            } else {
                this.fileSrv.updateFile(this.record.id, formData).subscribe((res: any) => {
                    if (res.success) {
                        this.submitted = false;
                        this.toastrService.success('File updated sucessfully');
                        this.close(res.result);
                    } else {
                        this.submitted = false;
                        this.toastrService.error('Error while updating file');
                    }
                });
            }
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    close(value = null) {
        this.ref.close(value);
    }
}
