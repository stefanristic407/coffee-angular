import { Injectable } from '@angular/core';
import { COUNTRY_LIST, CONTINIENT_LIST } from '@core/constants';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    getCountryName(isoCode: string): string {
        if (isoCode) {
            const country = COUNTRY_LIST.find((c) => c.isoCode === isoCode.toUpperCase());
            if (country) {
                return country.name;
            }
        }

        return '';
    }

    getContinentName(code: string): string {
        if (code) {
            if (CONTINIENT_LIST[code]) {
                return CONTINIENT_LIST[code];
            }
        }

        return '';
    }
}
