import { ChatMessageType } from '@enums';

export interface WSRequest<RequestBody> {
    type: ChatMessageType;
    data?: RequestBody;
    timestamp: string;
}
