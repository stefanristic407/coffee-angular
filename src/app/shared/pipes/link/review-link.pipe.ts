import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@enums';

@Pipe({
    name: 'reviewLink',
})
export class ReviewLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orderId: number): string {
        return `/review-rating/review/${orgType}/${orderId}`;
    }
}
