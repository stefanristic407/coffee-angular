import { OrderChatDisputeType, OrderChatThreadType, OrderChatThreadStatus } from '@core/enums';

export interface OrderChatThreadListItem {
    dispute_type: OrderChatDisputeType;
    thread_id: number;
    thread_type: OrderChatThreadType;
    thread_type_id: number;
    thread_type_status: OrderChatThreadStatus;
}
