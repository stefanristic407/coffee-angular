import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BREWING_METHOD_ITEMS } from '@constants';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService, InventoryService } from '@services';
import { maxWordCountValidator, toSentenceCase } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DropdownItem } from 'primeng/dropdown';

@Component({
    selector: 'app-create-roasting-profile',
    templateUrl: './create-roasting-profile.component.html',
    styleUrls: ['./create-roasting-profile.component.scss'],
})
export class CreateRoastingProfileComponent implements OnInit {
    readonly BREWING_METHOD_ITEMS = [...BREWING_METHOD_ITEMS, { label: 'None', value: '' }];
    profileId: number;
    roastingForm: FormGroup;
    roastLevelArray: any[];
    isLoading = false;
    flavoursList: DropdownItem[];

    constructor(
        private fb: FormBuilder,
        private generalService: GeneralService,
        private inventorySrv: InventoryService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {
        this.getRoastLevels();
        this.getRoasterFlavourProfile();
        if (this.route.snapshot.queryParams.profileID) {
            this.profileId = +decodeURIComponent(this.route.snapshot.queryParams.profileID);
            this.getRoastingProfile();
        }

        this.roastingForm = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
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
            recommendation_text: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
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

    getRoastingProfile() {
        this.isLoading = true;
        this.inventorySrv.getRoastingProfileDetail(this.profileId).subscribe((res) => {
            if (res && res.result) {
                this.roastingForm.patchValue({
                    ...res.result,
                    flavour_profiles: (res.result.flavour_profiles || []).map((item) => {
                        return { label: item.name, value: item.id };
                    }),
                });
            }
            this.isLoading = false;
        });
    }

    createRoastingProfile(productObj) {
        this.inventorySrv.createRoastingProfile(productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasting Profile has been added.');
                    this.router.navigate(['/roasted-coffee-batch/roasting-profile']);
                } else {
                    this.toastrService.error('Error while adding the roasting profile');
                }
            },
            (err) => {
                this.toastrService.error('Error while adding the roasting profile');
            },
        );
    }

    updateRoastingProfile(productObj) {
        this.inventorySrv.updateRoastingProfileDetail(this.profileId, productObj).subscribe(
            (res) => {
                if (res && res.success) {
                    this.toastrService.success('The Roasting Profile has been updated.');
                    this.router.navigate(['/roasted-coffee-batch/roasting-profile']);
                } else {
                    this.toastrService.error('Error while updating the roasting profile');
                }
            },
            (err) => {
                this.toastrService.error('Error while updating the roasting profile');
            },
        );
    }

    onSave(): void {
        if (this.roastingForm.invalid) {
            this.roastingForm.markAllAsTouched();
            this.toastrService.error(this.translator.instant('please_check_form_data'));
            return;
        }

        const postData = {
            ...this.roastingForm.value,
            flavour_profiles: this.roastingForm.value.flavour_profiles.map((item) => item.value),
        };

        if (this.profileId) {
            this.updateRoastingProfile(postData);
        } else {
            this.createRoastingProfile(postData);
        }
    }

    onCancel() {
        this.router.navigate(['/roasted-coffee-batch/roasting-profile']);
    }
}
