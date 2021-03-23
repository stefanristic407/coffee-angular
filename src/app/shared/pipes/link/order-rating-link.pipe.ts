import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationType } from '@enums';

@Pipe({
    name: 'orderRatingLink',
})
export class OrderRatingLinkPipe implements PipeTransform {
    transform(orderId: string, orgType: OrganizationType = OrganizationType.ESTATE): string {
        return `/review-rating/rating/${orgType}/${orderId}`;
    }
}
