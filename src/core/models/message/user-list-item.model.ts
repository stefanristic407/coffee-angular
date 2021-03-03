import { OrganizationType } from '@core/enums';

export interface UserListItem {
    email_verified: boolean;
    firstname: string;
    id: number;
    user_id: number;
    language: string; // or any specific value
    lastname: string;
    organization_id: number;
    organization_name: string;
    profile_pic: string;
    organization_type: OrganizationType;
    timezone: string;
    computed_fullname: string;
    computed_profile_dp: string;
    computed_organization_name: string;
}
