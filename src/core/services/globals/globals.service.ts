import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Gallery, ImageItem, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { COUNTRY_LIST, CONTINIENT_LIST } from '@constants';
import { Country } from '@models';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    monthList: any[] = [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];
    languageJson: any;
    slug_list: any;
    permissions: any = {};
    roaster_id: string;
    permissionList: any;
    selected_order_id: any;
    ord_received_date: any;
    userInvitesArray: any = [];
    device = 'desktop';

    constructor(
        public gallery: Gallery,
        public lightbox: Lightbox,
        private cookieService: CookieService,
        private deviceSrv: DeviceDetectorService,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
        // console.log(this.permissions);
        if (deviceSrv.isMobile()) {
            this.device = 'mobile';
        } else if (deviceSrv.isTablet()) {
            this.device = 'tablet';
        }
    }

    checkItem(data, listkey = null) {
        if (!listkey) {
            const flag3 = this.slug_list.filter((elememts) => elememts.slug === data)[0];
            const arr1 = ['manage', 'view'];
            if (flag3 && arr1.includes(flag3.access_type)) {
                return true;
            } else {
                return false;
            }
        } else {
            const flag1 = this.slug_list.filter((elememt) => elememt.slug === data)[0];
            const flag2 = this.slug_list.filter((element1) => element1.slug === data)[0];
            const arr = ['manage', 'view'];
            if ((flag1 && arr.includes(flag1.access_type)) || (flag2 && arr.includes(flag2.access_type))) {
                return true;
            } else {
                return false;
            }
        }
    }

    permissionMethod() {
        this.slug_list = JSON.parse(this.cookieService.get('permissionSlug'));
        this.slug_list.forEach((element) => {
            this.permissions[element.slug] = {
                manage: element.access_type === 'manage' ? true : false,
                view: element.access_type === 'view' ? true : false,
            };
        });
    }

    countTheString(value: any, count: any) {
        let stringData = value;
        stringData = stringData.replace(/(^\s*)|(\s*$)/gi, '');
        stringData = stringData.replace(/[ ]{2,}/gi, ' ');
        stringData = stringData.replace(/\n /, '\n');
        if (stringData == '') {
            return 0;
        } else {
            const outputLength = stringData.split(' ').length;
            if (outputLength > count) {
                value = stringData
                    .split(' ')
                    .splice(outputLength - 1, 1)
                    .join(' ');
                return outputLength - 1;
            }
            return outputLength;
        }
    }

    getTheMaxLength(value: any, countValue: any) {
        const getLength = this.countTheString(value, countValue);
        return getLength === countValue ? value.length : '';
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
}