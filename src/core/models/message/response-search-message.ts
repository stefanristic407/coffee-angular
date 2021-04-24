import { ThreadActivityType } from '../../enums/message/thread-activity-types.enum';
export interface ResponseSearchMessageRow {
    activity_type: ThreadActivityType;
    content: string;
    created_at: string;
    id: number;
    member: {
        id: number;
        joined_at: string;
        last_read_id: number;
        user: {
            first_name: string;
            id: number;
            last_name: '';
            org_id: number;
            org_type: OrientationType;
            profile_pic: string;
            profile_pic_thumb: string;
            user_id: 5;
        };
    };
    meta_data: '';
    meta: any;
    thread_id: number;
    updated_at: string;
}
