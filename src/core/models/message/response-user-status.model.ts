import { OrganizationType } from '@core/enums';

export interface ResponseUserStatus {
    id: number;
    last_seen: string;
    online: boolean;
    org_id: number;
    org_type: OrganizationType;
    user_id: number;
}
