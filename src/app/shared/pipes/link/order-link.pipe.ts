import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationType } from '@enums';

@Pipe({
    name: 'orderLink',
})
export class OrderLinkPipe implements PipeTransform {
    transform(orgType: OrganizationType, orderId: number): string {
        return `/orders/${orgType || OrganizationType.ESTATE}/${orderId || ''}`;
    }
}
