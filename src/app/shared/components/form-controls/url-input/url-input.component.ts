import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-url-input',
    templateUrl: './url-input.component.html',
    styleUrls: ['./url-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UrlInputComponent),
            multi: true,
        },
    ],
})
export class UrlInputComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string;
    prefix = 'https://';

    shortUrl: string;
    onChange: any;
    onTouched: any;

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: string = ''): void {
        if (!value) {
            this.shortUrl = '';
        } else if (!value.startsWith(this.prefix)) {
            this.shortUrl = value;
            this.emitChange();
        } else {
            this.shortUrl = value.replace(this.prefix, '');
        }
    }

    constructor() {}

    ngOnInit(): void {}

    emitChange() {
        setTimeout(() => this.onChange(`${this.prefix}${this.shortUrl}`));
    }
}
