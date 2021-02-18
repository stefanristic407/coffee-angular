import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'underscore';

@Component({
    selector: 'app-day-picker',
    templateUrl: './day-picker.component.html',
    styleUrls: ['./day-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DayPickerComponent),
            multi: true,
        },
    ],
})
export class DayPickerComponent implements OnInit, ControlValueAccessor {
    days: any[] = [
        { label: 'M', value: 1 },
        { label: 'T', value: 2 },
        { label: 'W', value: 3 },
        { label: 'T', value: 4 },
        { label: 'F', value: 5 },
        { label: 'S', value: 6 },
        { label: 'S', value: 0 },
    ];
    onChange: any;
    onTouched: any;
    writeValue(value: any): void {
        if (value) {
            value.split(',').forEach((element) => {
                const idx = this.days.findIndex((item) => item.value === +element);
                if (idx > -1) {
                    this.days[idx].checked = true;
                }
            });
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

    onClick(index: number) {
        this.days[index].checked = !this.days[index].checked;
        this.onChange(
            _.pluck(
                this.days.filter((element) => element.checked),
                'value',
            ).join(','),
        );
    }
}
