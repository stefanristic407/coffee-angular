import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { COUNTRY_LIST, CONTINENT_LIST } from '@constants';
import { OrganizationType } from '@enums';
import { environment } from '@env/environment';
import { LabelValue, Country } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { SimulatedLoginService } from '../api';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private authService: AuthService,
        private cookieService: CookieService,
        private simulatedLoginService: SimulatedLoginService,
    ) {}

    getCountryList(): LabelValue[] {
        return COUNTRY_LIST.map((x) => ({
            label: x.name,
            value: x.isoCode,
        }));
    }

    getCountry(isoCode: string): Country {
        if (isoCode) {
            return COUNTRY_LIST.find((c: any) => c.isoCode === isoCode.toUpperCase());
        }
        return null;
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
            if (CONTINENT_LIST[code]) {
                return CONTINENT_LIST[code];
            }
        }

        return '';
    }

    private findCountry(countryCode: string): Country {
        return COUNTRY_LIST.find((x) => x.isoCode === countryCode.toUpperCase());
    }

    getJustText(content: any) {
        if (content) {
            const contentElement = this.document.createElement('div');
            contentElement.innerHTML = content;
            return contentElement.textContent;
        } else {
            return '';
        }
    }

    userSimulatedLogin(userId: number) {
        this.simulatedLoginService.simulatedLogin(userId).subscribe((res: any) => {
            if (res.success) {
                this.goSimulatedPortal(
                    OrganizationType.ROASTER,
                    res.result.token,
                    this.authService.currentOrganization.id,
                );
            }
        });
    }

    goSimulatedPortal(orgType: OrganizationType, token: string, orgId: number = null) {
        let portalUrl = '';

        switch (orgType) {
            case OrganizationType.ESTATE: {
                portalUrl = environment.estatesWeb;
                break;
            }
            case OrganizationType.FACILITATOR: {
                portalUrl = environment.facilitatorWeb;
                break;
            }
            case OrganizationType.HORECA: {
                portalUrl = environment.horecaWeb;
                break;
            }
            case OrganizationType.MICRO_ROASTER: {
                portalUrl = environment.microRoasterWeb;
                break;
            }
            case OrganizationType.ROASTER: {
                portalUrl = environment.roasterWeb;
                break;
            }
            case OrganizationType.SEWN_ADMIN: {
                portalUrl = environment.adminWeb;
                break;
            }
            case OrganizationType.CONSUMER: {
                portalUrl = environment.consumerWeb;
                break;
            }
            default:
                if (orgType.search('estate/') > -1) {
                    portalUrl = environment.estateBrandProfileUrl;
                } else if (orgType.search('roaster/') > -1) {
                    portalUrl = environment.roasterBrandProfileUrl;
                }
                break;
        }

        portalUrl += `/gate?orgId=${orgId}&loginType=sim`;
        // Probably we need to add separate flag for this logic.
        if (!environment.production) {
            this.cookieService.set('Sim-Authorization', token);
        }

        window.open(portalUrl);
    }
}
