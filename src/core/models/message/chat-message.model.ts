import { ThreadActivityType } from '@enums';
import { ChatMessageMember } from './chat-message-member.model';
import { ThreadMember } from './thread-member.model';

export interface ChatMessage {
    activity_type: ThreadActivityType;
    content: string;
    created_at: string;
    id: number;
    member: ChatMessageMember;
    meta_data: string;
    updated_at: string;
    computed_date: string;
    computed_author: ThreadMember;
    showUserBadge: boolean;
    isActiveUser: boolean;
    dateString?: string; // wil be null if same date as prev
    showDateBadge?: boolean;
}
