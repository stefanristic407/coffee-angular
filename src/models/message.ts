// NOTE:  Avoid using module, use file based types for better maintainability

export enum WSOrganizationType {
    FACILITATOR = 'fc',
    ROASTER = 'ro',
    ESTATE = 'es',
    MICRO_ROASTER = 'mr'
}
export enum ThreadActivityType {
    system = 'S',
    message = 'M',
    adduser = 'AU',
    removeuser = 'RU'
}
export enum WSCommunicationType {
    auth = 'auth', // Authenicate user
    threads = 'threads', // Get Thread Listing
    thread = 'thread', // Get Thread Details
    history = 'history', // Get Thread History
    message = 'message', // Send New Message
    read = 'read', // Inform the server the last read message id
    create = 'create', // Create Thread
    add = 'add', // Add Members to Thread
    update = 'update', // Update a message
    unread = 'unread', // Get unread  message count
    block = 'block', // Block a user
    unblock = 'unblock', // UnBlock a user
    blocklist = 'blocklist', // Get Block List
    users = 'users', // Get Multiple users details
}

export interface WSRequest<RequestBody> {
    type: WSCommunicationType;
    data: RequestBody;
    timestamp: string;
}

export interface WSResponse<ResponseBody> {
    type: WSCommunicationType; // same as request
    data: ResponseBody | null;
    timestamp: string; // same as request
    success: boolean;
    code: number;
    messages: {
        [errorKey: string]: string;
    } | null;
    result_info?: { // In case of paginated results
        page: number;
        per_page: number;
        total_count: number;
    };
}

export interface ThreadListItem {
    activity_created_at: string;
    activity_id: number;
    activity_member_id: number;
    activity_member_org_id: number;
    activity_member_org_type: WSOrganizationType;
    activity_member_user_id: number;
    activity_type: ThreadActivityType;
    content: string;
    created_at: string;
    id: number;
    member_id: number;
    member_org_id: number;
    member_org_type: WSOrganizationType;
    member_user_id: number;
    members: ThreadMembers[];
    meta_data: string;
    name: string;
    status: true;
    type: string;
    type_id: number;
    unread?: number;
    lastActivityText: string;
    targetedUser: ThreadMembers; // Should be ref from members
}


export interface ThreadMembers {
    first_name: string;
    profile_dp_computed: string;
    id: number;
    is_removed: boolean;
    last_name: string;
    org_id: number;
    org_type: string;
    organization_name: string;
    profile_pic: string;
    profile_pic_thumb: string;
    last_seen?: string;
    online?: boolean;
    user_id: number;
}


export interface ResponseUserStatus {
    id: number;
    last_seen: string;
    online: boolean;
    org_id: number;
    org_type: WSOrganizationType;
    user_id: number;
}
export interface RequestAuth {
    user_token: string;
}