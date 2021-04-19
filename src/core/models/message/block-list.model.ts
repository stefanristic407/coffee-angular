import { OrganizationType } from '@enums';

export interface BlockListItem {
    first_name: string;
    id: number;
    last_name: string;
    org_id: number;
    org_type: OrganizationType;
    profile_pic: string;
    profile_pic_thumb: string;
    user_id: number;
    computed_fullname: string;
    computed_organization_name: string;
    computed_profile_dp: string;
    computed_profile_direct_url: string;
}
