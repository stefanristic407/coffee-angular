import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-time-range',
    templateUrl: './time-range.component.html',
    styleUrls: ['./time-range.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeRangeComponent),
            multi: true,
        },
    ],
})
export class TimeRangeComponent implements OnInit, ControlValueAccessor {
    sOpened = false;
    eOpened = false;
    startDate: Date;
    endDate: Date;

    onChange: any;
    onTouched: any;
    writeValue(value: any): void {
        if (value?.length) {
            this.startDate = value[0];
            this.endDate = value[1];
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

    onSelect(value: Date) {
        this.onChange([this.startDate, this.endDate]);
    }
}
