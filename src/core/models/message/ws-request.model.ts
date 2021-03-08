import { ChatMessageType, SocketMessageOrigin } from '@core/enums';
export interface WSRequest<RequestBody> {
    type: ChatMessageType;
    data?: RequestBody;
    timestamp: string;
    origin?: SocketMessageOrigin;
}
