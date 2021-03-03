import { ThreadActivityType } from '@core/enums';
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
    isActiveUser: boolean;
}
