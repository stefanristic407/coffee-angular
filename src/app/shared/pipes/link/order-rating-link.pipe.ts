import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@models/organization';

@Pipe({
    name: 'orderRatingLink',
})
export class OrderRatingLinkPipe implements PipeTransform {
    transform(orderId: string, orgType: OrgType = OrgType.ESTATE): string {
        return `/ordermanagement/rating/${orgType}/${orderId}`;
    }
}
