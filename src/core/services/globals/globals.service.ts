import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Gallery, ImageItem, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { COUNTRY_LIST, CONTINIENT_LIST, languages } from '@constants';
import { Country } from '@models';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    languageJson: any;
    slugList: any;
    permissions: any = {};
    userInvitesArray: any = [];
    device = 'desktop';

    constructor(public gallery: Gallery, public lightbox: Lightbox, private deviceSrv: DeviceDetectorService) {
        if (deviceSrv.isMobile()) {
            this.device = 'mobile';
        } else if (deviceSrv.isTablet()) {
            this.device = 'tablet';
        }
    }

    getCountry(data: string): Country {
        if (data) {
            return COUNTRY_LIST.find((con: any) => con.isoCode === data.toUpperCase());
        }
        return null;
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

    openPicture(src) {
        const items = [new ImageItem({ src, thumb: src })];
        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumb: false,
        });
        lightboxRef.load(items);
        this.lightbox.open(0);
    }

    getLanguage(code: string): string {
        if (code) {
            const language = languages.find((c) => c.value === code.toLowerCase());
            if (language) {
                return language.name;
            }
        }
        return '';
    }
}
