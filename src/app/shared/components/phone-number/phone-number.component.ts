import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    phoneNumber: any;
    isValid = true;
    inputObj: any;
    onChange: any;
    onTouched: any;
    writeValue(value: any): void {
        if (value) {
            this.phoneNumber = value;
            if (this.phoneNumber) {
                this.inputObj.setNumber(this.phoneNumber);
            }
        }
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    constructor() {}

    ngOnInit(): void {}

    validate({ value }: FormControl) {
        return (
            !this.isValid && {
                invalid: true,
            }
        );
    }

    hasError(isValid: any): void {
        this.isValid = isValid;
        if (!isValid) {
            this.onChange(this.phoneNumber);
        }
    }

    getPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
        this.onChange(this.phoneNumber);
    }

    telInputObject(obj: any): void {
        this.inputObj = obj;
        if (this.phoneNumber) {
            this.inputObj.setNumber(this.phoneNumber);
        }
    }
}
