import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationType } from '@enums';

@Pipe({
    name: 'orgType',
})
export class OrgTypePipe implements PipeTransform {
    transform(orgType: OrganizationType): string {
        const organizations = {
            [OrganizationType.ESTATE]: 'Estate',
            [OrganizationType.FACILITATOR]: 'Facilitaor',
            [OrganizationType.HORECA]: 'Partner',
            [OrganizationType.MICRO_ROASTER]: 'Micro-roaster',
            [OrganizationType.ROASTER]: 'Roaster',
            [OrganizationType.SEWN_ADMIN]: 'Admin',
        };
        return organizations[orgType];
    }
}
