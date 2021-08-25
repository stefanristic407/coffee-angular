import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { languages } from '@constants';

@Injectable({
    providedIn: 'root',
})
export class GlobalsService {
    languageJson: any;
    device = 'desktop';

    constructor(private deviceSrv: DeviceDetectorService) {
        if (deviceSrv.isMobile()) {
            this.device = 'mobile';
        } else if (deviceSrv.isTablet()) {
            this.device = 'tablet';
        }
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
