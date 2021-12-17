import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BREWING_METHOD_ITEMS } from '@constants';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService, InventoryService } from '@services';
import { toSentenceCase } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DropdownItem } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-roasting-profile-dialog',
    templateUrl: './roasting-profile-dialog.component.html',
    styleUrls: ['./roasting-profile-dialog.component.scss'],
})
export class RoastingProfileDialogComponent implements OnInit {
    readonly BREWING_METHOD_ITEMS = [...BREWING_METHOD_ITEMS, { label: 'None', value: '' }];
    roastingForm: FormGroup;
    roastLevelArray: any[];
    flavoursList: DropdownItem[];

    constructor(
        private fb: FormBuilder,
        private generalService: GeneralService,
        private inventorySrv: InventoryService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
    ) {
        this.config.showHeader = false;
        this.config.styleClass = 'roasting-profile-dialog';
    }

    ngOnInit(): void {
        this.getRoastLevels();
        this.getRoasterFlavourProfile();

        this.roastingForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            roast_level_id: ['', Validators.compose([Validators.required])],
            roast_duration: ['', Validators.compose([Validators.required])],
            temperature: ['', Validators.compose([Validators.required])],
            machine_type: ['', Validators.compose([Validators.required])],
            aroma: [null, Validators.compose([Validators.required])],
            acidity: [null, Validators.compose([Validators.required])],
            body: [null, Validators.compose([Validators.required])],
            flavour: [null, Validators.compose([Validators.required])],
            flavour_profiles: ['', Validators.compose([Validators.required])],
            roaster_notes: ['', Validators.compose([Validators.required])],
            recommended_recipe: ['', Validators.compose([Validators.required])],
            brewing_method: [null],
            recommendation_text: ['', Validators.compose([Validators.required])],
        });
    }

    getRoastLevels() {
        this.generalService.getRoastLevels().subscribe((res) => {
            if (res.success) {
                this.roastLevelArray = (res.result || []).map((ix) => ({ ...ix, name: toSentenceCase(ix.name) }));
            }
        });
    }

    getRoasterFlavourProfile() {
        this.generalService.getFlavourProfile().subscribe((data) => {
            if (data.success) {
                this.flavoursList = data.result.map((item) => {
                    return { label: item.name, value: item.id };
                });
            } else {
                this.toastrService.error('Error while getting the roasting Flavor Profile');
            }
        });
    }

    createRoastingProfile(productObj) {
        this.inventorySrv.createRoastingProfile(productObj).subscribe(
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
            this.toastrService.error(this.translator.instant('please_check_form_data'));
            return;
        }

        const postData = {
            ...this.roastingForm.value,
            flavour_profiles: this.roastingForm.value.flavour_profiles.map((item) => item.value),
        };
        this.createRoastingProfile(postData);
    }

    close() {
        this.ref.close();
    }
}
