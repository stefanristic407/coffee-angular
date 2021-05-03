import { ThreadActivityType } from '@enums';

export interface ResponseReadUpdate {
    id: number;
    thread: {
        id: number;
        name: string;
        status: boolean;
        created_by: number;
        type: string;
        type_id: number;
        created_at: string;
    };
    content: string;
    meta_data: string;
    member: {
        id: number;
        joined_at: string;
        is_muted: boolean;
        is_deleted: boolean;
    };
    activity_type: ThreadActivityType;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}
