import { Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { CommonService } from '@services';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LANGUAGES } from '@constants';
import * as _ from 'underscore';
import { DOCUMENT } from '@angular/common';
import { getLanguage } from '@utils';

@Component({
    selector: 'app-select-language',
    templateUrl: './select-language.component.html',
    styleUrls: ['./select-language.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectLanguageComponent),
            multi: true,
        },
    ],
})
export class SelectLanguageComponent implements OnInit, ControlValueAccessor {
    public readonly LANGUAGES = LANGUAGES;
    converseLanguages;

    onChange: any;
    onTouched: any;
    isDisabled = false;

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: any): void {
        this.converseLanguages = value?.map((ix: string) => getLanguage(ix)) || null;
    }

    constructor(private commonService: CommonService, @Inject(DOCUMENT) private doc) {}

    ngOnInit(): void {}

    onLanguagesChange() {
        this.onChange(this.converseLanguages.map((item: any) => item.value));
    }
}
