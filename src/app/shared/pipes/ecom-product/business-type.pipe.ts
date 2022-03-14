import { Pipe, PipeTransform } from '@angular/core';
import { BUSINESS_TYPE_ITEMS } from '@constants';
import { BusinessType } from '@enums';

@Pipe({
    name: 'businessType',
})
export class BusinessTypePipe implements PipeTransform {
    constructor() {}
    transform(value: BusinessType): string {
        return BUSINESS_TYPE_ITEMS.find((x) => x.value === value)?.label || '';
    }
}
