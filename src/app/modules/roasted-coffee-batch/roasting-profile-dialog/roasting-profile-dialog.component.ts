import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService, InventoryService, UserService } from '@services';
import { toSentenceCase } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-roasting-profile-dialog',
    templateUrl: './roasting-profile-dialog.component.html',
    styleUrls: ['./roasting-profile-dialog.component.scss'],
})
export class RoastingProfileDialogComponent implements OnInit {
    profileId: number;
    roastingForm: FormGroup;
    roastLevelArray: any[];

    constructor(
        private fb: FormBuilder,
        private generalService: GeneralService,
        private router: Router,
        private toastrService: ToastrService,
        private userService: UserService,
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private inventorySrv: InventoryService,
    ) {
        this.config.showHeader = false;
        this.config.styleClass = 'roasting-profile-dialog';
    }

    ngOnInit(): void {
        this.getRoastLevels();

        this.roastingForm = this.fb.group({
            roast_profile_name: ['', Validators.compose([Validators.required])],
            roast_level: ['', Validators.compose([Validators.required])],
            temperature: ['', Validators.compose([Validators.required])],
            roast_duration: ['', Validators.compose([Validators.required])],
            machine_type: ['', Validators.compose([Validators.required])],
        });
    }

    getRoastLevels() {
        this.generalService.getRoastLevels().subscribe((res) => {
            if (res.success) {
                this.roastLevelArray = (res.result || []).map((ix) => ({ ...ix, name: toSentenceCase(ix.name) }));
            }
        });
    }

    createRoastingProfile(productObj) {
        this.inventorySrv.addRoastingProfile(productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasting Profile has been added.');
                    this.ref.close({ success: true, newItem: { ...res.result, ...productObj } });
                } else {
                    this.toastrService.error('Error while adding the roasting profile');
                }
            },
            (err) => {
                this.toastrService.error('Error while adding the roasting profile');
            },
        );
    }

    onSave(): void {
        if (!this.roastingForm.valid) {
            this.roastingForm.markAllAsTouched();
            this.toastrService.error('Please fill all Data');
            return;
        }

        this.createRoastingProfile(this.roastingForm.value);
    }

    close() {
        this.ref.close();
    }
}
