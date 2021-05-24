import { OrderStatus } from '@enums';
import { LabelValue } from '@models';

export const ORDER_STATUS_ITEMS: LabelValue[] = [
    { label: 'Placed', value: OrderStatus.Placed },
    { label: 'Confirmed', value: OrderStatus.Confirmed },
    { label: 'Payment', value: OrderStatus.Payment },
    { label: 'Harvest Ready', value: OrderStatus.HarvestReady },
    { label: 'Shipped', value: OrderStatus.Shipped },
    { label: 'Received', value: OrderStatus.Received },
    { label: 'Rejected', value: OrderStatus.Rejected },
];
