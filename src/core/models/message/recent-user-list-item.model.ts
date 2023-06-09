import { OrganizationType } from '@enums';

export interface RecentUserListItem {
    computed_fullname: string;
    computed_profile_direct_url: string;
    computed_organization_name: string;
    lastname: string;
    firstname: string;
    organization_id: number;
    organization_type: OrganizationType;
    organization_name: string;
    profile_pic: string;
    id: number;
    user_id: number;
    blockedDetails: {
        blockedMe: boolean;
        myBlock: boolean;
    };
}
