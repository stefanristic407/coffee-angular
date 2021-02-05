import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export function maxWordCountValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const stringData = control.value
            .replace(/(^\s*)|(\s*$)/gi, '')
            .replace(/[ ]{2,}/gi, ' ')
            .replace(/\n /, '\n');
        return stringData.split(' ').length > limit ? { maxWordCount: true } : null;
    };
}
