import { AbstractControl, ControlContainer, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { LBUNIT } from '@constants';

export function maxWordCountValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const stringData = control.value
            .replace(/(^\s*)|(\s*$)/gi, '')
            .replace(/[ ]{2,}/gi, ' ')
            .replace(/\n /, '\n');
        return stringData.split(' ').length > limit ? { maxWordCount: true } : null;
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
        return control.value &&
            control.parent &&
            control.parent.get(unitKey) &&
            control.parent.get(unitKey).value + '' &&
            control.value <
                (control.parent.get(unitKey).value === 'lb'
                    ? limit / LBUNIT
                    : control.parent.get(unitKey).value === 'g'
                    ? limit * 1000
                    : limit)
            ? {
                  min: true,
              }
            : null;
    };
}
