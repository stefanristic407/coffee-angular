import { Pipe, PipeTransform } from '@angular/core';
import { AvailabilityType } from '@enums';
import { AVAILABILITY_TYPE_ITEMS } from '@constants';

@Pipe({
    name: 'abailabilityType',
})
export class AvailabilityTypePipe implements PipeTransform {
    constructor() {}
    transform(value: AvailabilityType): string {
        return AVAILABILITY_TYPE_ITEMS.find((x) => x.value === value)?.label || '';
    }
}
