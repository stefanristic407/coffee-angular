import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonService, ValidateEmailService } from '@services';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { convertKg } from './common.utils';

export function maxWordCountValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const stringData = control.value
            ?.replace(/(^\s*)|(\s*$)/gi, '')
            ?.replace(/[ ]{2,}/gi, ' ')
            ?.replace(/\n /, '\n');
        return stringData?.split(' ').length > limit ? { maxWordCount: true } : null;
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
            ? RegExp('^(https://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
            : RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
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

export function quantityMaxValidator(unitKey: string, limit: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        return control.value !== null &&
            control.value !== undefined &&
            control.parent &&
            control.parent.get(unitKey) &&
            control.parent.get(unitKey).value + '' &&
            +control.value > convertKg(limit, control.parent.get(unitKey).value)
            ? {
                  max: true,
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

export function emailValidator(validateService: ValidateEmailService, existenceQuery: string = ''): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
        return new Observable<any>((observer) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(control.value)) {
                observer.next({ email: 'invalid' });
                observer.complete();
            } else {
                validateService.validate(control.value).subscribe((res: any) => {
                    if (![200, 207, 114].includes(res.status)) {
                        observer.next({ email: 'invalid' });
                        observer.complete();
                    } else {
                        if (existenceQuery) {
                            validateService.getUsersList(control.value, existenceQuery).subscribe((user: any) => {
                                if (user.success && user.result?.length) {
                                    observer.next({ exist: true });
                                } else {
                                    observer.next(null);
                                }
                                observer.complete();
                            });
                        } else {
                            observer.next(null);
                            observer.complete();
                        }
                    }
                });
            }
        }).pipe(map((res) => res));
    };
}

export function editorRequired(commonservice: CommonService): ValidatorFn {
    return ({ value }: AbstractControl): { [key: string]: boolean } | null => {
        return value &&
            (commonservice.getJustText(value)?.trim() || new RegExp(/<img.*?src="(.*?)"[^>]*>/g).test(value))
            ? null
            : { required: true };
    };
}
