import { ChatMessage } from './chat-message.model';
import { ThreadMember } from './thread-member.model';
export interface SearchChatMessagResult {
    activity_id: number;
    messageUnit: { message: ChatMessage; user: ThreadMember; isMatch: boolean }[];
}
