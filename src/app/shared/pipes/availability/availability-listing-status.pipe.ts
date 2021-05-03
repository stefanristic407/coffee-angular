import { Pipe, PipeTransform } from '@angular/core';
import { AvailabilityListingStatus } from '@enums';
import { AVAILABILITY_LISTING_STATUS_ITEMS } from '@constants';

@Pipe({
    name: 'abailabilityListingStatus',
})
export class AvailabilityListingStatusPipe implements PipeTransform {
    constructor() {}
    transform(value: AvailabilityListingStatus): string {
        return AVAILABILITY_LISTING_STATUS_ITEMS.find((x) => x.value === value)?.label || '';
    }
}
