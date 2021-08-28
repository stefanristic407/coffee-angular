import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { GlobalsService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_LIST } from '@constants';
import { Country } from '@models';
import { urlValidator } from '@utils';
import { ValidateEmailService } from '@services';
import { ValidateEmail } from '@utils';
@Component({
    selector: 'app-sewn-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    isSaveMode: boolean;
    countryList = COUNTRY_LIST;
    cityList = [];
    latitude: number;
    longitude: number;
    zoom = 13;

    constructor(
        private fb: FormBuilder,
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
        private validateService: ValidateEmailService
    ) {}

    ngOnInit(): void {
        this.initialForm();
        this.detectMode();
    }

    detectMode() {
        this.roasteryProfileService.saveMode$.subscribe((res: boolean) => {
            this.isSaveMode = res;
            if (res) {
                this.setFormValue();
            }
        });
    }

    initialForm() {
        this.contactForm = this.fb.group({
            email: ['', Validators.compose([Validators.required]), ValidateEmail.createValidator(this.validateService)],
            phone: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: [''],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            zipcode: [''],
            fb_profile: ['', Validators.compose([Validators.required, urlValidator(true)])],
            ig_profile: ['', Validators.compose([Validators.required, urlValidator(true)])],
        });

        this.contactForm.controls.country.valueChanges.subscribe((updatedCountry: any) => {
            this.countryList.forEach((countryItem: Country) => {
                if (countryItem.isoCode === updatedCountry.toUpperCase()) {
                    this.cityList = [];
                    countryItem.cities.map((stateItem: string) => {
                        this.cityList.push({
                            name: stateItem,
                            value: stateItem,
                        });
                    });
                }
            });
        });

        this.contactForm.valueChanges.subscribe((changedData: any) => {
            this.roasteryProfileService.contactFormInvalid = this.contactForm.invalid;
            this.roasteryProfileService.editProfileData(changedData);
        });
    }

    setFormValue() {
        this.countryList.forEach((item: Country) => {
            if (item.isoCode === this.roasteryProfileService.toUpdateProfileData.country.toUpperCase()) {
                this.cityList = item.cities;
            }
        });
        this.contactForm.patchValue(this.roasteryProfileService.toUpdateProfileData);

        this.latitude = this.roasteryProfileService.toUpdateProfileData.latitude;
        this.longitude = this.roasteryProfileService.toUpdateProfileData.longitude;
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
                    console.log('Current position:', position.coords);
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
        this.roasteryProfileService.toUpdateProfileData.latitude = this.latitude;
        this.roasteryProfileService.toUpdateProfileData.longitude = this.longitude;
    }
}
