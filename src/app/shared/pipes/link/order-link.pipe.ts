import { Pipe, PipeTransform } from '@angular/core';
import { OrgType, OrderType, OrderStatus } from '@enums';

@Pipe({
    name: 'orderLink',
})
export class OrderLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orderId: number, orderType: OrderType, orderStatus: OrderStatus): string {
        switch (orgType) {
            case OrgType.ESTATE: {
                if (orderType === OrderType.Booked) {
                    return `/ordermanagement/order-booked/${orderId}/${orderStatus}`;
                } else if (orderType === OrderType.Sample) {
                    return `/ordermanagement/order-sample/${orderId}/${orderStatus}`;
                } else if (orderType === OrderType.Prebook) {
                    return `/ordermanagement/order-prebook/${orderId}/${orderStatus}`;
                }
                break;
            }
            case OrgType.MICRO_ROASTER: {
                if (orderStatus === OrderStatus.Placed) {
                    return `/ordermanagement/booked-order-confirmation/${orderId}/${orderType}`;
                } else if (orderStatus === OrderStatus.Rejected) {
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
