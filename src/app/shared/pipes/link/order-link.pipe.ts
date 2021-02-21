import { Pipe, PipeTransform } from '@angular/core';
import { OrgType, OrderType, OrderStatus } from '@models';

@Pipe({
    name: 'orderLink',
})
export class OrderLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orderId: number, orderType: OrderType, orderStatus: OrderStatus): string {
        switch (orgType) {
            case OrgType.ESTATE: {
                if (orderType === OrderType.GC_ORDER) {
                    return `/ordermanagement/order-booked/${orderId}/${orderStatus}`;
                } else if (orderType === OrderType.GC_ORDER_SAMPLE) {
                    return `/ordermanagement/order-sample/${orderId}/${orderStatus}`;
                } else if (orderType === OrderType.PREBOOK_LOT) {
                    return `/ordermanagement/order-prebook/${orderId}/${orderStatus}`;
                }
                break;
            }
            case OrgType.MICRO_ROASTER: {
                if (orderStatus === OrderStatus.PLACED) {
                    return `/ordermanagement/booked-order-confirmation/${orderId}/${orderType}`;
                } else if (orderStatus === OrderStatus.REJECTED) {
                    return `/ordermanagement/microroaster-orders/${orderId}/${orderType}`;
                } else {
                    return `/ordermanagement/mr-booked/${orderId}/${orderType}`;
                }
            }
            default: {
                return '';
            }
        }
    }
}
