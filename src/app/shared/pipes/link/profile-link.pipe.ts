import { Pipe, PipeTransform } from '@angular/core';
import { OrgType } from '@models';
import { environment } from '@env/environment';

@Pipe({
    name: 'profileLink',
})
export class ProfileLinkPipe implements PipeTransform {
    transform(orgType: OrgType, orgId: number): string {
        switch (orgType) {
            case OrgType.ESTATE: {
                return `${environment.estatesWeb}/features/estate-profile/${orgId}`;
            }
            case OrgType.FACILITATOR: {
                return `${environment.facilitatorWeb}/features/facilitator-profile/${orgId}`;
            }
            case OrgType.ROASTER: {
                return `${environment.roasterWeb}/features/roastery-profile/${orgId}`;
            }
            case OrgType.MICRO_ROASTER: {
                return `${environment.microRoasterWeb}/features/roastery-profile/${orgId}`;
            }
            case OrgType.HORECA: {
                return `${environment.horecaWeb}/features/roastery-profile/${orgId}`;
            }
        }
    }
}
