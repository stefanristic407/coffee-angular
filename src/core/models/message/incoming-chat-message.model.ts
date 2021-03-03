import { ChatMessageMember } from './chat-message-member.model';
import { ChatMessage } from './chat-message.model';
import { ThreadMember } from './thread-member.model';

export interface IncomingChatMessage extends ChatMessage {
    activity_member: ChatMessageMember;
    member: ChatMessageMember & { user: ThreadMember };
    thread_id: number;
}
