import { ChatMessageType } from '@core/enums';

export interface WSRequest<RequestBody> {
    type: ChatMessageType;
    data?: RequestBody;
    timestamp: string;
}
