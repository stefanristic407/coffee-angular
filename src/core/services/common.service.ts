import { EventEmitter, Injectable } from '@angular/core';
import { COUNTRY_LIST, CONTINIENT_LIST } from '@constants';
import { LabelValue, Country } from '../models/common';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    profileUpdateEvent: EventEmitter<any>;

    constructor() {
        this.profileUpdateEvent = new EventEmitter<any>();
    }

    getCountryList(): LabelValue[] {
        return COUNTRY_LIST.map((x) => ({
            label: x.name,
            value: x.isoCode,
        }));
    }

    getCountryName(isoCode: string): string {
        if (isoCode) {
            const country = this.findCountry(isoCode);
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

    private findCountry(countryCode: string): Country {
        return COUNTRY_LIST.find((x) => x.isoCode === countryCode.toUpperCase());
    }
}
