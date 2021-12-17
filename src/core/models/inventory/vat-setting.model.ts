import { OrganizationType, VatType } from '@enums';

export interface VatSetting {
    id: number;
    user_id: number;
    org_id: number;
    org_type: OrganizationType;
    country: string;
    transaction_type: string;
    vat_percentage: number;
    vat_type: VatType;
}
