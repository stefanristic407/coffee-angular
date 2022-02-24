import { CONTINENT_LIST, COUNTRY_LIST, LANGUAGES, OrganizationName, WEIGHT2KG } from '@constants';
import { OrganizationType, QuantityUnit } from '@enums';
import { Country, Language } from '@models';
import { Observable } from 'rxjs';

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

export const getContinentName = (code: string): string => {
    if (code && CONTINENT_LIST[code]) {
        return CONTINENT_LIST[code];
    }
    return '';
};

export const getLanguage = (code: string): Language => {
    if (code) {
        return LANGUAGES.find((c: any) => c.value === code.toLowerCase());
    }
    return null;
};

export const countWords = (value: string = ''): number => {
    return value.replace(/\s+/gi, ' ').split(' ').length;
};

export const checkFile = (file: File, maxSize = 30, maxWidth = 5000, maxHeight = 5000): Observable<any> => {
    return new Observable<any>((observer) => {
        if (!file) {
            observer.next({ file: 'invalid', message: `${file.name} is invalid` });
            observer.complete();
        } else if (file.size > maxSize * 1024 * 1024) {
            observer.next({
                size: 'exceeded',
                message: `The ${file.name} size exceeds the limit of ${maxSize}mb. Upload a smaller file size`,
            });
            observer.complete();
        } else if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const height = img.naturalHeight;
                    const width = img.naturalWidth;
                    if (width > maxWidth || height > maxHeight) {
                        observer.next({
                            dimension: 'exceeded',
                            message: `${file.name} dimention exceeded(${maxWidth}*${maxHeight}px)`,
                        });
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                };
            };
        } else {
            observer.next(null);
            observer.complete();
        }
    });
};

export function getUrl(title: string) {
    title = title.toLowerCase();
    let removeSpace = title.replace(/[._!"`'#%&,:;<>=@{}»¿„”~\$\(\)\*\+\/\\\?\[\]\^\|]+/g, '');
    removeSpace = removeSpace.replace(/[ ]+/g, '-');
    const slug = removeSpace.replace(/^-+|-+(?=-|$)/g, '');
    return slug;
}
