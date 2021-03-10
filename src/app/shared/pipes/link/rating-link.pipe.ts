import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@enums';

@Pipe({
    name: 'ratingLink',
})
export class RatingLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orderId: number): string {
        return `/review-rating/rating/${orgType}/${orderId}`;
    }
}
