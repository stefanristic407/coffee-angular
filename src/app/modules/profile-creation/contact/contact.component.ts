import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { GlobalsService } from '@services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_LIST } from '@constants';
import { Country } from '@models';
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
    constructor(
        private fb: FormBuilder,
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
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
            email: ['', Validators.compose([Validators.required, Validators.email])],
            phone: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: [''],
            address_line1: ['', Validators.compose([Validators.required])],
            address_line2: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            zipcode: [''],
            fb_profile: [''],
            ig_profile: [''],
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
            console.log('value changed: ', this.contactForm.invalid, changedData);
            this.roasteryProfileService.contactFormInvalid = this.contactForm.invalid;
            this.roasteryProfileService.editProfileData(changedData);
        });
    }

    setFormValue() {
        this.countryList.forEach((item: Country) => {
            if (item.isoCode === this.roasteryProfileService.roasteryProfileData.country.toUpperCase()) {
                this.cityList = item.cities;
            }
        });

        const formValue = {
            email: this.roasteryProfileService.roasteryProfileData.email,
            phone: this.roasteryProfileService.roasteryProfileData.phone,
            country: this.roasteryProfileService.roasteryProfileData.country.toUpperCase(),
            state: this.roasteryProfileService.roasteryProfileData.state,
            address_line1: this.roasteryProfileService.roasteryProfileData.address_line1,
            address_line2: this.roasteryProfileService.roasteryProfileData.address_line2,
            city: this.roasteryProfileService.roasteryProfileData.city,
            zipcode: this.roasteryProfileService.roasteryProfileData.zipcode,
            fb_profile: this.roasteryProfileService.roasteryProfileData.fb_profile,
            ig_profile: this.roasteryProfileService.roasteryProfileData.ig_profile,
        };

        this.contactForm.patchValue(formValue);
    }

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.contactForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }
}
