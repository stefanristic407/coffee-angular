import { Injectable } from '@angular/core';
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

    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        private cookieService: CookieService,
        private deviceSrv: DeviceDetectorService,
    ) {
        if (deviceSrv.isMobile()) {
            this.device = 'mobile';
        } else if (deviceSrv.isTablet()) {
            this.device = 'tablet';
        }
    }

    checkItem(data, listkey = null) {
        if (!listkey) {
            const flag3 = this.slugList.filter((elememts) => elememts.slug === data)[0];
            const arr1 = ['manage', 'view'];
            if (flag3 && arr1.includes(flag3.access_type)) {
                return true;
            } else {
                return false;
            }
        } else {
            const flag1 = this.slugList.filter((elememt) => elememt.slug === data)[0];
            const flag2 = this.slugList.filter((element1) => element1.slug === data)[0];
            const arr = ['manage', 'view'];
            if ((flag1 && arr.includes(flag1.access_type)) || (flag2 && arr.includes(flag2.access_type))) {
                return true;
            } else {
                return false;
            }
        }
    }

    permissionMethod() {
        this.slugList = JSON.parse(this.cookieService.get('permissionSlug'));
        this.slugList.forEach((element) => {
            this.permissions[element.slug] = {
                manage: element.access_type === 'manage' ? true : false,
                view: element.access_type === 'view' ? true : false,
            };
        });
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
