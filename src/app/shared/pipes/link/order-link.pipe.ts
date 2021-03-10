import { Pipe, PipeTransform } from '@angular/core';
import { OrgType, OrderType, OrderStatus } from '@enums';

@Pipe({
    name: 'orderLink',
})
export class OrderLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orderId: number, orderType: OrderType, orderStatus: OrderStatus): string {
        return `/orders/${orgType}/${orderId}`;
    }
}
