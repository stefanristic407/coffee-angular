import { AvailabilityListingStatus } from '@enums';
import { LabelValue } from '@models';

export const AVAILABILITY_LISTING_STATUS_ITEMS: LabelValue[] = [
    { label: 'At estate', value: AvailabilityListingStatus.ESTATE },
    { label: 'At mill', value: AvailabilityListingStatus.MILL },
    { label: 'Warehouse', value: AvailabilityListingStatus.WAREHOUSE },
];
