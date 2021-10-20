import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-otp-input',
    templateUrl: './otp-input.component.html',
    styleUrls: ['./otp-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OtpInputComponent),
            multi: true,
        },
    ],
})
export class OtpInputComponent implements OnInit, ControlValueAccessor {
    otp: string;
    onChange: any;
    onTouched: any;

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: string = ''): void {
        this.otp = value;
    }

    constructor() {}

    ngOnInit(): void {}

    onOtpChange(otp) {
        this.otp = otp;
        this.onChange(otp);
    }
}
