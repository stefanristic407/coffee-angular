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
export interface OrderCharThreadListItem {
    dispute_type: OrderChatDisputeType;
    thread_id: number;
    thread_type: OrderChatThreadType;
    thread_type_id: number;
    thread_type_status: OrderChatThreadStatus;
}
