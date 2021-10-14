import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
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
    @Input() styleClass = '';

    selectedItems: any[];

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
    }

    writeValue(value: any[]): void {
        this.selectedItems = value;
    }

    change(): void {
        this.onChange(this.selectedItems);
    }
}
