import { Component, ContentChild, ElementRef, forwardRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-singleselect',
    templateUrl: './singleselect.component.html',
    styleUrls: ['./singleselect.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SingleselectComponent),
            multi: true,
        },
    ],
})
export class SingleselectComponent implements OnInit, ControlValueAccessor {
    @ViewChild('select', { static: false }) select;
    @Input() options;
    @Input() footer;
    @Input() filter = false;
    @Input() placeholder: string;
    @Input() optionLabel = 'label';
    @Input() optionValue = 'value';

    @ContentChild('footerTemplate') footerTemplate: TemplateRef<ElementRef>;

    selectedItem: any;

    onChange = (delta: any[]) => {};
    onTouched = () => {};

    constructor() {}

    ngOnInit(): void {}

    registerOnChange(fn: (v: any[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(value: any[]): void {
        this.selectedItem = value;
    }

    onSelect(event) {
        this.selectedItem = [event.itemValue];
        this.onChange(event.itemValue);
        setTimeout(() => this.select.hide());
    }
}
