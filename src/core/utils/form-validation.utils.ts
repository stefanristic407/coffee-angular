import { AbstractControl, ControlContainer, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

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
