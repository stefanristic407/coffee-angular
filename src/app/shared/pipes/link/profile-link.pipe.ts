import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationType } from '@enums';
import { environment } from '@env/environment';

@Pipe({
    name: 'profileLink',
})
export class ProfileLinkPipe implements PipeTransform {
    transform(orgType: OrganizationType, orgId: number): string {
        switch (orgType) {
            case OrganizationType.ESTATE: {
                return `${environment.estatesWeb}/features/estate-profile/${orgId}`;
            }
            case OrganizationType.FACILITATOR: {
                return `${environment.facilitatorWeb}/features/facilitator-profile/${orgId}`;
            }
            case OrganizationType.ROASTER: {
                return `${environment.roasterWeb}/features/roastery-profile/${orgId}`;
            }
            case OrganizationType.MICRO_ROASTER: {
                return `${environment.microRoasterWeb}/features/roastery-profile/${orgId}`;
            }
            case OrganizationType.HORECA: {
                return `${environment.horecaWeb}/features/roastery-profile/${orgId}`;
            }
        }
    }
}
