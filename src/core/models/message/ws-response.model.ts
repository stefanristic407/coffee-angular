import { ChatMessageType, SocketMessageOrigin } from '@core/enums';

export interface WSResponse<ResponseBody> {
    type: ChatMessageType; // same as request
    data: ResponseBody | null;
    timestamp: string; // same as request
    success: boolean;
    code: number;
    origin: SocketMessageOrigin;
    messages: {
        [errorKey: string]: string;
    } | null;
    result_info?: {
        // In case of paginated results
        page: number;
        per_page: number;
        total_count: number;
    };
}
