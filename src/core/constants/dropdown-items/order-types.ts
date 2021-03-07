import { OrderType } from '@enums';
import { LabelValue } from '@models';

export const ORDER_TYPE_ITEMS: LabelValue[] = [
    { label: 'Sample', value: OrderType.Sample },
    { label: 'Booked', value: OrderType.Booked },
    { label: 'Pre-Booked', value: OrderType.Prebook },
];
