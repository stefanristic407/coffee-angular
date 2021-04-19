import { ChatMessageMember } from './chat-message-member.model';
import { ChatMessage } from './chat-message.model';
import { ThreadMember } from './thread-member.model';
import { ThreadType } from '@enums';

export interface IncomingChatMessage extends ChatMessage {
    activity_member: ChatMessageMember;
    member: ChatMessageMember & { user: ThreadMember };
    thread: {
        created_at: string;
        created_by: number;
        id: number;
        name: string;
        status: boolean;
        type: ThreadType;
        type_id: number;
    };
}
