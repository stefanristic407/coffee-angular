import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@enums';

@Pipe({
    name: 'orderRatingLink',
})
export class OrderRatingLinkPipe implements PipeTransform {
    transform(orderId: string, orgType: OrgType = OrgType.ESTATE): string {
        return `/review-rating/rating/${orgType}/${orderId}`;
    }
}
