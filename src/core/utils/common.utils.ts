import { COUNTRY_LIST, LANGUAGES, OrganizationName, WEIGHT2KG } from '@constants';
import { OrganizationType, QuantityUnit } from '@enums';
import { Country, Language } from '@models';

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

export const getCountry = (isoCode: string): Country => {
    if (isoCode) {
        return COUNTRY_LIST.find((c: any) => c.isoCode === isoCode.toUpperCase());
    }
    return null;
};

export const getLanguage = (code: string): Language => {
    if (code) {
        return LANGUAGES.find((c: any) => c.value === code.toLowerCase());
    }
    return null;
};
