import { OrderType } from '@enums';
import { LabelValue } from '@models';

export const MR_ORDER_TYPE_ITEMS: LabelValue[] = [
    { label: 'Sample', value: OrderType.Sample },
    { label: 'Booked', value: OrderType.Booked },
];
