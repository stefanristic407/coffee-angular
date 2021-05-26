import { Pipe, PipeTransform } from '@angular/core';
import { QuantityType } from '@enums';
import { QUANTITY_TYPE_ITEMS } from '@constants';

@Pipe({
    name: 'quantityType',
})
export class QuantityTypePipe implements PipeTransform {
    constructor() {}
    transform(value: QuantityType): string {
        return QUANTITY_TYPE_ITEMS.find((x) => x.value === value)?.label || value;
    }
}
