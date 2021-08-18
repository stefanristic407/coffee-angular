import { OrganizationName } from '@constants';
import { OrganizationType } from '@enums';

export const getOrgName = (orgType: OrganizationType | string): string => {
    const type = orgType?.toLowerCase() as OrganizationType;
    return OrganizationName[type] || '';
};
