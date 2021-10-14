import { Component, OnInit } from '@angular/core';
import { AuthService, GeneralService, UserService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { toSentenceCase } from '@utils';

@Component({
    selector: 'app-create-roasting-profile',
    templateUrl: './create-roasting-profile.component.html',
    styleUrls: ['./create-roasting-profile.component.scss'],
})
export class CreateRoastingProfileComponent implements OnInit {
    profileId: number;
    roastingForm: FormGroup;
    roastLevelArray: any[];
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private generalService: GeneralService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.getRoastLevels();
        if (this.route.snapshot.queryParams.profileID) {
            this.profileId = +decodeURIComponent(this.route.snapshot.queryParams.profileID);
            this.getRoastingProfile();
        }

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

    getRoastingProfile() {
        this.isLoading = true;
        this.userService.getRoastingProfileDetail(this.profileId).subscribe((res) => {
            if (res && res.result) {
                this.roastingForm.patchValue(res.result);
            }
            this.isLoading = false;
        });
    }

    createRoastingProfile(productObj) {
        this.userService.addRoastingProfile(productObj).subscribe(
            (res) => {
                console.log('create roasting profile response <>>>>>>>>>>>', res);
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
        this.userService.updateRoastingProfileDetail(this.profileId, productObj).subscribe(
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
            this.toastrService.error('Please fill all Data');
            return;
        }

        if (this.profileId) {
            this.updateRoastingProfile(this.roastingForm.value);
        } else {
            this.createRoastingProfile(this.roastingForm.value);
        }
    }

    onCancel() {
        this.router.navigate(['/roasted-coffee-batch/roasting-profile']);
    }
}
