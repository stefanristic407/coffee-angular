import { QuantityType } from '@enums';
import { LabelValue } from '@models';

export const QUANTITY_TYPE_ITEMS: LabelValue[] = [
    { label: 'Bags', value: QuantityType.bags },
    { label: 'Jute bags', value: QuantityType.jute_bags },
    { label: 'Containers', value: QuantityType.containers },
];
