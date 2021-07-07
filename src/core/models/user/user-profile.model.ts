export interface UserProfile {
    aboutMe: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    createdAt: string;
    dateOfBirth: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    gender: string;
    hasSystemRole: boolean;
    id: number;
    language: string;
    lastLoginAt: string;
    lastName: string;
    organization_id: number;
    phone: string;
    profileImageThumbUrl: string;
    profileImageUrl: string;
    referralCode: string;
    state: string;
    status: string; // TODO: Add enum
    timezone: string;
}
