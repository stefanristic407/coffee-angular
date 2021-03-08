import { ChatMessageType, SocketMessageOrigin } from '@enums';

export interface WSRequest<RequestBody> {
    type: ChatMessageType;
    data?: RequestBody;
    timestamp: string;
    origin?: SocketMessageOrigin;
}
