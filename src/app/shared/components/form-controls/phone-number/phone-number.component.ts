import { ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryCode, isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

@Component({
    selector: 'app-phone-number',
    templateUrl: './phone-number.component.html',
    styleUrls: ['./phone-number.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhoneNumberComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: PhoneNumberComponent,
            multi: true,
        },
    ],
})
export class PhoneNumberComponent implements OnInit, ControlValueAccessor {
    // intl-tel-input doesn't support auto format so have to integrate libphonenumber-js manually

    countryCode: CountryCode = 'US';
    nationalNumber: string;
    inputObj: any;
    onChange: any;
    onTouched: any;
    placeholder = '';
    template = '';

    writeValue(value: string): void {
        if (value) {
            const phoneNumber = parsePhoneNumber(value);
            this.countryCode = phoneNumber.country;
            this.nationalNumber = phoneNumber.nationalNumber as string;
        }
        this.setInputObj();
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    validate({ value }: FormControl) {
        if (!(this.nationalNumber && this.countryCode)) {
            return null;
        }
        if (isValidPhoneNumber(this.nationalNumber, this.countryCode)) {
            return null;
        }
        return { invalid: true };
    }

    telInputObject(obj: any): void {
        this.inputObj = obj;
        this.setInputObj();
    }

    setInputObj() {
        if (this.inputObj) {
            this.inputObj.setCountry(this.countryCode);
            // For the default country
            if (this.countryCode === 'US') {
                this.refreshTemplate();
            }
        }
    }

    refreshTemplate() {
        const temp = this.inputObj.a.placeholder || '';
        // Remove first zero
        this.placeholder = temp.replace(/^0/, '');
        this.template = this.placeholder.replace(/[0-9]/g, '9');
    }

    onInput(event) {
        setTimeout(() => {
            this.saveChange();
        });
    }

    onCountryChange(value: any): void {
        this.countryCode = value.iso2.toUpperCase() as CountryCode;
        if (this.nationalNumber && !isValidPhoneNumber(this.nationalNumber, this.countryCode)) {
            this.nationalNumber = null;
        }
        this.refreshTemplate();
        this.saveChange();
    }

    saveChange() {
        try {
            const phoneNumber = parsePhoneNumber(this.nationalNumber, this.countryCode);
            console.log(phoneNumber.number);
            this.onChange(phoneNumber.number);
        } catch (error) {
            this.onChange(null);
        }
    }
}
