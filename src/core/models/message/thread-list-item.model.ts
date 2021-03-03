import { OrganizationType, ThreadActivityType, ThreadType } from '@core/enums';
import { ThreadMember } from './thread-member.model';

export interface ThreadListItem {
    activity_created_at: string;
    activity_id: number;
    activity_member_id: number;
    activity_member_org_id: number;
    activity_member_org_type: OrganizationType;
    activity_member_user_id: number;
    activity_type: ThreadActivityType;
    content: string;
    created_at: string;
    id: number;
    member_id: number;
    member_org_id: number;
    member_org_type: OrganizationType;
    member_user_id: number;
    members: ThreadMember[];
    meta_data: string;
    name: string;
    status: true;
    type: ThreadType;
    type_id: number;
    unread?: number;
    messages: [];
    computed_mute: boolean;
    computed_createdAt: string;
    computed_thread_createdAt: string;
    computed_lastActivityText: string;
    computed_activeUser: ThreadMember; // Should be ref from members
    computed_targetedUser: ThreadMember;
    computed_targetedUserList: ThreadMember[];
}
