import { AvailabilityListingStatus } from '@enums';
import { LabelValue } from '@models';

export const AVAILABILITY_LISTING_STATUS_ITEMS: LabelValue[] = [
    { label: 'Estate', value: AvailabilityListingStatus.ESTATE },
    { label: 'Mill', value: AvailabilityListingStatus.MILL },
    { label: 'Warehouse', value: AvailabilityListingStatus.WAREHOUSE },
];
