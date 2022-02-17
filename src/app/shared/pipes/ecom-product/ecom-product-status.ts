import { Pipe, PipeTransform } from '@angular/core';
import { PRODUCT_STATUS_ITEMS } from '@constants';
import { ProductStatus } from '@enums';

@Pipe({
    name: 'ecomProductStatus',
})
export class EcomProductStatus implements PipeTransform {
    constructor() {}
    transform(value: ProductStatus): string {
        return PRODUCT_STATUS_ITEMS.find((x) => x.value === value)?.label || '';
    }
}
