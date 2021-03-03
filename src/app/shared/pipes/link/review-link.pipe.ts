import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@enums';

@Pipe({
    name: 'reviewLink',
})
export class ReviewLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orderId: number): string {
        console.log(orgType, orderId);
        return `/ordermanagement/review-ratings/${orgType}/${orderId}`;
    }
}
