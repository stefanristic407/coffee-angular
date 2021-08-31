import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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
}
