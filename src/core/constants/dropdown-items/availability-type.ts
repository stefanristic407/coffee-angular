import { AvailabilityType } from '@enums';
import { LabelValue } from '@models';

export const AVAILABILITY_TYPE_ITEMS: LabelValue[] = [
    { label: 'Single origin', value: AvailabilityType.SINGLE_ORIGIN },
    { label: 'Blend', value: AvailabilityType.BLEND },
    { label: 'Micro lot', value: AvailabilityType.MICRO_LOT },
];
