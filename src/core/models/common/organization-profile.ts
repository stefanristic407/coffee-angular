import { AreaUnit } from '@enums';

export interface OrganizationProfile {
    address_line1: string;
    address_line2: string;
    admin_id: number;
    admin_name: string;
    avg_employee_age: number;
    banner_file_id: number;
    banner_url: string;
    base_currency: string;
    base_currency_name: string;
    capabilities: string;
    capacity: number;
    capacity_unit: string;
    city: string;
    commission_currency: string;
    commission_currency_name: string;
    company_details_public: boolean;
    company_image_thumbnail_url: string;
    company_image_url: string;
    company_name: string;
    country: string;
    created_at: string;
    customer_count: number;
    description: string;
    email: string;
    fb_profile: string;
    female_employee_count: number;
    founded_on: number;
    id: number;
    ig_profile: string;
    last_login_at: string;
    latitude: number;
    longitude: number;
    male_employee_count: number;
    member_count: number;
    name: string;
    onboarded_by: number;
    owner_name: string;
    phone: string;
    rating: number;
    registration_id: string;
    slug: string;
    state: string;
    status: string;
    total_employees: number;
    updated_at: Date;
    vat_number: string;
    website: string;
    zipcode: string;

    // Special in estate
    agronomist_access: string;
    altitude_end: number;
    altitude_start: number;
    belongs_to: string;
    cluster_cop_name: string;
    coffee_area_unit: string;
    coffee_area: number;
    coffee_production_unit: string;
    coffee_production: number;
    company_number: string;
    crop_year_end: number;
    crop_year_start: number;
    estate_family_member_count: number;
    family_member_count: number;
    full_time_employee_count: number;
    legal_entity: string;
    part_time_employee_count: number;
    total_area_unit: string;
    total_area: number;
    total_polygon_area: number;
    total_production_unit: string;
    total_production: number;
    wild_animals: string;

    // Special in facilitator
    environmental_responsibility: string;
    social_community_responsibility: string;

    // Special in horeca
    partner_id: number;
}

export interface MicroOrganizationProfile {
    address_line1: string;
    address_line2: string;
    admin_id: number;
    admin_name: string;
    avg_employee_age: number;
    banner_file_id: number;
    banner_url: string;
    capabilities: string;
    capacity: number;
    capacity_unit: string;
    city: string;
    company_details_public: boolean;
    company_image_thumbnail_url: string;
    company_image_url: string;
    company_name: string;
    country: string;
    created_at: string;
    customer_count: number;
    description: string;
    email: string;
    fb_profile: string;
    female_employee_count: number;
    founded_on: number;
    id: number;
    ig_profile: string;
    last_login_at: string;
    latitude: number;
    longitude: number;
    male_employee_count: number;
    member_count: number;
    name: string;
    onboarded_by: number;
    owner_name: string;
    phone: string;
    rating: number;
    registration_id: string;
    slug: string;
    state: string;
    status: string;
    total_employees: number;
    updated_at: Date;
    vat_number: string;
    website: string;
    zipcode: string;
    discount_percentage: number;
    roaster_id: number;
}

export interface EstateOrganizationProfile {
    addressLine1: string;
    addressLine2: string;
    adminId: number;
    adminName: string;
    agronomistAccess: string;
    altitudeEnd: number;
    altitudeStart: number;
    animalsFarmed: string;
    bannerFileId: number;
    bannerTitle: string;
    bannerUrl: string;
    belongsTo: string;
    city: string;
    clusterCopName: string;
    coffeeArea: number;
    coffeeAreaUnit: string;
    coffeeProduction: number;
    coffeeProductionUnit: string;
    companyDetailsPublic: boolean;
    companyImageThumbnailUrl: string;
    companyImageUrl: string;
    companyName: string;
    companyNumber: string;
    country: string;
    createdAt: Date;
    cropMonth: string;
    cropYearEnd: number;
    cropYearStart: number;
    cultivatedArea: number;
    description: string;
    email: string;
    estateFamilyMemberCount: number;
    familyMemberCount: number;
    farmYield: string;
    farmYieldUnit: AreaUnit;
    fbProfile: string;
    finalScore: number;
    foundedOn: number;
    fullTimeEmployeeCount: number;
    gradeRange: string;
    greenInitiatives: string;
    hasExportLicense: boolean;
    hasMill: boolean;
    id: number;
    igProfile: string;
    introTitle: string;
    lastLogin_at: Date;
    latitude: number;
    legalEntity: string;
    location: string;
    longitude: number;
    mapUrl: string;
    name: string;
    numberOfTrees: number;
    onboardedBy: number;
    otherCrops: string;
    ownerName: string;
    packaging: string;
    partTimeEmployeeCount: number;
    phone: string;
    picking_method: string;
    processingTypes: string;
    rating: number;
    region: string;
    registrationId: string;
    serviceRequestId: number;
    slug: string;
    soilFootprint: string;
    sourcingImageUrl: string;
    species: string;
    state: string;
    status: string;
    techUsed: string;
    temperatureRange: string;
    totalArea: number;
    totalAreaUnit: string;
    totalEmployees: number;
    totalPolygonArea: number;
    totalProduction: number;
    totalProductionUnit: string;
    varieties: string;
    vatNumber: string;
    visibility: boolean;
    website: string;
    wildAnimals: string;
    zipcode: string;
}

export interface PartnerOrganizationProfile {
    address_line1: string;
    address_line2: string;
    admin_id: number;
    admin_name: string;
    avg_employee_age: number;
    banner_file_id: number;
    banner_url: string;
    city: string;
    company_details_public: boolean;
    company_image_thumbnail_url: string;
    company_image_url: string;
    company_name: string;
    country: string;
    created_at: string;
    description: string;
    email: string;
    fb_profile: string;
    female_employee_count: number;
    founded_on: number;
    id: number;
    ig_profile: string;
    last_login_at: string;
    latitude: number;
    longitude: number;
    male_employee_count: number;
    member_count: number;
    name: string;
    onboarded_by: number;
    owner_name: string;
    phone: string;
    rating: number;
    registration_id: string;
    slug: string;
    state: string;
    status: string;
    total_employees: number;
    updated_at: Date;
    vat_number: string;
    website: string;
    zipcode: string;
    environmental_responsibility: string;
    social_community_responsibility: string;
    company_type: string;
    discount_percentage: number;
    partner_count: number;
    partner_id: number;
    roaster_id: number;
}
