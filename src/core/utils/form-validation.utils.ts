import { AbstractControl, ControlContainer, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { LBUNIT } from '@constants';
import { convertKg } from './common.utils';

export function maxWordCountValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const stringData = control.value
            .replace(/(^\s*)|(\s*$)/gi, '')
            .replace(/[ ]{2,}/gi, ' ')
            .replace(/\n /, '\n');
        return stringData.split(' ').length > limit ? { maxWordCount: true } : null;
    };
}

export function fileRequired(): ValidatorFn {
    return ({ value }: AbstractControl): { [key: string]: boolean } | null => {
        return value && value.image_url ? null : { required: true };
    };
}

export function fileCountValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        return control.value?.length === limit ? null : { fileCount: true };
    };
}

export function maxValidator(limitKey: string) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        return control.value &&
            control.parent &&
            control.parent.get(limitKey) &&
            control.parent.get(limitKey).value + '' &&
            control.value > control.parent.get(limitKey).value
            ? {
                  max: true,
              }
            : null;
    };
}

export function minValidator(limitKey: string) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        return control.value &&
            control.parent &&
            control.parent.get(limitKey) &&
            control.parent.get(limitKey).value + '' &&
            control.value < control.parent.get(limitKey).value
            ? {
                  min: true,
              }
            : null;
    };
}

export function urlValidator(isHttps: boolean = false): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const uriRegEx = isHttps
            ? RegExp('(https://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
            : RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        const result = uriRegEx.test(control.value);

        if (control.value && !result) {
            return { url: true };
        }

        return null;
    };
}

export function quantityMinValidator(unitKey: string, limit: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        return control.value !== null &&
            control.value !== undefined &&
            control.parent &&
            control.parent.get(unitKey) &&
            control.parent.get(unitKey).value + '' &&
            +control.value < convertKg(limit, control.parent.get(unitKey).value)
            ? {
                  min: true,
              }
            : null;
    };
}

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const isWhitespace = ((control && control.value && control.value.toString()) || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    };
}
