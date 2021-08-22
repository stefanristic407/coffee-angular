import { OrganizationName, WEIGHT2KG } from '@constants';
import { OrganizationType, QuantityUnit } from '@enums';

export const getOrgName = (orgType: OrganizationType | string): string => {
    const type = orgType?.toLowerCase() as OrganizationType;
    return OrganizationName[type] || '';
};

export const convert2Kg = (weight: number, weightUnit: QuantityUnit = QuantityUnit.kg): number => {
    return weight * (WEIGHT2KG[weightUnit] || 1);
};

export const convertKg = (weight: number, weightUnit: QuantityUnit = QuantityUnit.kg): number => {
    return weight / (WEIGHT2KG[weightUnit] || 1);
};
