import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-multiselect-chips',
    templateUrl: './multiselect-chips.component.html',
    styleUrls: ['./multiselect-chips.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiselectChipsComponent),
            multi: true,
        },
    ],
})
export class MultiselectChipsComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder = this.translateService.instant('add');
    @Input() optionLabel = 'label';
    @Input() optionValue = 'value';
    @Input() addOnBlur = true;
    @Input() allowDuplicate = false;
    @Input() itemList: any[] = [];

    readonly chipsControl = this.fb.control([]);

    isDisabled = false;

    onChange = (delta: any[]) => {};
    onTouched = () => {};

    constructor(private fb: FormBuilder, private translateService: TranslateService) {}

    ngOnInit(): void {}

    registerOnChange(fn: (v: any[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;

        if (this.isDisabled) {
            this.chipsControl.disable();
        } else {
            this.chipsControl.enable();
        }
    }

    writeValue(value: any[]): void {
        this.chipsControl.patchValue(value);
        this.onChange(value.map((x) => x[this.optionValue]));
    }

    itemSelected(event: any): void {
        const currentValue = this.chipsControl.value;

        if (!this.allowDuplicate) {
            const existingItem = currentValue.find((x) => x[this.optionValue] === event.value);
            if (existingItem) {
                return;
            }
        }

        const item = this.itemList.find((x) => x[this.optionValue] === event.value);
        if (item) {
            this.chipsControl.patchValue([...currentValue, item]);
            this.onChange(this.chipsControl.value.map((x) => x[this.optionValue]));
            this.onTouched();
        }
    }

    chipsRemoved(): void {
        this.onChange(this.chipsControl.value.map((x) => x[this.optionValue]));
    }
}
