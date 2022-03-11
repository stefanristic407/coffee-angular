import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_LIST } from '@constants';
import { OrganizationType } from '@enums';
import { ValidateEmailService } from '@services';
import { emailValidator, getCountry, urlValidator } from '@utils';
import { ProfileCreationService } from '../profile-creation.service';

@Component({
    selector: 'app-sewn-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    readonly COUNTRY_LIST = COUNTRY_LIST;
    readonly OrgType = OrganizationType;
    contactForm: FormGroup;
    isSaveMode: boolean;
    cities = [];
    latitude: number;
    longitude: number;
    zoom = 13;

    constructor(
        private fb: FormBuilder,
        private validateService: ValidateEmailService,
        public profileCreationService: ProfileCreationService,
    ) {}

    ngOnInit(): void {
        this.initialForm();
        this.detectMode();
    }

    detectMode() {
        this.profileCreationService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
            }
        });
    }

    initialForm() {
        this.contactForm = this.fb.group({
            website: ['', Validators.compose([urlValidator(true)])],
            email: ['', Validators.compose([Validators.required]), emailValidator(this.validateService)],
            phone: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: [''],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: [''],
            city: ['', Validators.compose([Validators.required])],
            zipcode: [''],
            fb_profile: ['', Validators.compose([urlValidator(true)])],
            ig_profile: ['', Validators.compose([urlValidator(true)])],
        });
        this.profileCreationService.contactForm = this.contactForm;

        this.contactForm.controls.country.valueChanges.subscribe((updatedCountry: any) => {
            if (updatedCountry) {
                this.cities = getCountry(updatedCountry)?.cities;
                if (this.cities.indexOf(this.contactForm.value.state) < 0) {
                    this.contactForm.get('state').setValue(null);
                }
                this.cities = this.cities.map((element) => {
                    return { label: element, value: element };
                });
            }
        });

        this.contactForm.valueChanges.subscribe((changedData: any) => {
            this.profileCreationService.editProfileData(changedData);
        });
    }

    setFormValue() {
        this.contactForm.patchValue(this.profileCreationService.toUpdateProfileData);

        this.latitude = this.profileCreationService.toUpdateProfileData.latitude;
        this.longitude = this.profileCreationService.toUpdateProfileData.longitude;
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.contactForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                },
                (err) => {
                    console.log('error', err);
                },
                { timeout: Infinity },
            );
        }
    }

    markerDragEnd(event) {
        this.latitude = event.coords.lat;
        this.longitude = event.coords.lng;
        this.profileCreationService.toUpdateProfileData.latitude = this.latitude;
        this.profileCreationService.toUpdateProfileData.longitude = this.longitude;
    }
}
