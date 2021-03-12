import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@enums';

@Pipe({
    name: 'orderLink',
})
export class OrderLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orderId: number): string {
        return `/orders/${orgType}/${orderId}`;
    }
}
