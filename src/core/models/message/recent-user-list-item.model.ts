import { OrganizationType } from '@enums';

export interface RecentUserListItem {
    computed_fullname: string;
    computed_profile_dp: string;
    computed_organization_name: string;
    lastname: string;
    firstname: string;
    organization_id: number;
    organization_type: OrganizationType;
    profile_pic: string;
    id: number;
    user_id: number;
}
