import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationType } from '@enums';
import { environment } from '@env/environment';

@Pipe({
    name: 'profileLink',
})
export class ProfileLinkPipe implements PipeTransform {
    transform(orgType: OrganizationType, orgId: number): string {
        return `${environment.roasterWeb}/profile/${orgType}/${orgId}`;
    }
}
