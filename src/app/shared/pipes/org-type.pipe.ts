import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@models';

@Pipe({
    name: 'orgType',
})
export class OrgTypePipe implements PipeTransform {
    transform(orgType: OrgType): string {
        const organizations = {
            [OrgType.ESTATE]: 'Estate',
            [OrgType.FACILITATOR]: 'Facilitaor',
            [OrgType.HORECA]: 'Horeca',
            [OrgType.MICRO_ROASTER]: 'Micro Roaster',
            [OrgType.ROASTER]: 'Roaster',
        };
        return organizations[orgType];
    }
}
