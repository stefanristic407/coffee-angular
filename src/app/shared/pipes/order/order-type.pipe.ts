import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_TYPE_ITEMS } from '@constants';
import { OrderType } from '@enums';

@Pipe({
    name: 'orderType',
})
export class OrderTypePipe implements PipeTransform {
    transform(orderType: OrderType): string {
        return ORDER_TYPE_ITEMS.find((x) => x.value === orderType)?.label || '';
    }
}
