export enum ServiceChatTypes {
    RO_ES = 'RO_ES',
    RO_MR = 'RO_MR',
    ES_RO = 'ES_RO',
    SA_ORDER = 'SA_RO_ES',
    SA_MR_ORDER = 'SA_MR_RO',
    MR_RO = 'MR_RO',
}

export enum OrderChatThreadType {
    ORDER = 'dispute',
}
export enum OrderChatDisputeType {
    ORDER = 'Order',
}
export enum OrderChatThreadStatus {
    OPEN = 'OPEN',
    RESOLVED = 'RESOLVED',
}
export interface OrderChatThreadListItem {
    dispute_type: OrderChatDisputeType;
    thread_id: number;
    thread_type: OrderChatThreadType;
    thread_type_id: number;
    thread_type_status: OrderChatThreadStatus;
}
export interface DisputeChatThreadListItem {
    chat_thread_id: number;
    created_at: string;
    date_ordered: string;
    dispute_status: string;
    dispute_type: string;
    disputer_type: string;
    escalated: false;
    id: number;
    micro_roaster_id: number;
    micro_roaster_name: string;
    order_id: number;
}
