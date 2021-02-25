import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasterserviceService } from '@services';

@Component({
    selector: 'app-folder-dialog',
    templateUrl: './folder-dialog.component.html',
    styleUrls: ['./folder-dialog.component.scss'],
})
export class FolderDialogComponent implements OnInit {
    infoForm: FormGroup;
    roasterId: string;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
        private cookieSrv: CookieService,
        private toastrService: ToastrService,
        private roasterSrv: RoasterserviceService,
    ) {
        this.roasterId = this.cookieSrv.get('roaster_id');
    }

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            name: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
        });
        this.infoForm.patchValue(this.config.data.record);
    }

    save() {
        if (this.infoForm.valid) {
            this.roasterSrv
                .updateFolderDetails(this.roasterId, this.config.data.record.id, this.infoForm.value)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Folder details updated sucessfully');
                        this.close(res.result);
                    } else {
                        this.toastrService.error('Error while updating details');
                    }
                });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }

    close(value = null) {
        this.ref.close(value);
    }
}
