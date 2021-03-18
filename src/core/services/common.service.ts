import { EventEmitter, Injectable } from '@angular/core';
import { COUNTRY_LIST, CONTINIENT_LIST } from '@constants';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    profileUpdateEvent: EventEmitter<any>;

    constructor() {
        this.profileUpdateEvent = new EventEmitter<any>();
    }

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
