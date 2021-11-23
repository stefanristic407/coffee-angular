import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_STATUS_ITEMS } from '@constants';
import { OrderStatus } from '@enums';

@Pipe({
    name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
    transform(orderStatus: OrderStatus): string {
        return ORDER_STATUS_ITEMS.find((x) => x.value === orderStatus)?.label || '';
    }
}
