import { UserStatus } from '@enums';

export interface UserProfile {
    about_me: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    created_at: string;
    date_of_birth: string;
    email: string;
    email_verified: boolean;
    firstname: string;
    gender: string;
    has_system_role: boolean;
    id: number;
    language: string;
    last_login_at: string;
    lastname: string;
    organization_id: number;
    phone: string;
    profile_image_thumb_url: string;
    profile_image_url: string;
    referral_code: string;
    state: UserStatus;
    status: string; // TODO: Add enum
    terms_accepted: boolean;
    timezone: string;
}
