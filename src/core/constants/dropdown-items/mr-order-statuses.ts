import { OrderStatus } from '@enums';
import { LabelValue } from '@models';

export const MR_ORDER_STATUS_ITEMS: LabelValue[] = [
    { label: 'Placed', value: OrderStatus.Placed },
    { label: 'Confirmed', value: OrderStatus.Confirmed },
    { label: 'Shipped', value: OrderStatus.Shipped },
    { label: 'Received', value: OrderStatus.Received },
    { label: 'Rejected', value: OrderStatus.Rejected },
];
