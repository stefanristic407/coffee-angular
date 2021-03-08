import { OrganizationType } from '@enums';

export interface OpenChatThread {
    user_id: number;
    org_type: OrganizationType;
    org_id: number;
}
