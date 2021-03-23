import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationType } from '@enums';

@Pipe({
    name: 'reviewLink',
})
export class ReviewLinkPipe implements PipeTransform {
    transform(orgType: OrganizationType, orderId: number): string {
        return `/review-rating/review/${orgType}/${orderId}`;
    }
}
