import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService, AuthService } from '@services';
import { OrganizationType } from '@enums';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends ApiService {
    private roasterUrl = environment.apiURL + '/ro/api';

    constructor(public authService: AuthService, public http: HttpClient) {
        super(http, authService);
    }

    getGeneralProfileDetails(orgType: OrganizationType, profileId: number) {
        return this.post(this.roasterUrl, `general/${orgType}/${profileId}/profile`, 'GET');
    }
}
