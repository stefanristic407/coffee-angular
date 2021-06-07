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
    public galleryItems: any = [];

    constructor(public authService: AuthService, public http: HttpClient) {
        super(http, authService);
    }

    getGeneralProfileDetails(orgType: OrganizationType, profileId: number) {
        return this.post(this.roasterUrl, `general/${orgType}/${profileId}/profile`, 'GET');
    }

    getVirtualTourFiles(orgType: OrganizationType, profileId: number) {
        const params = this.serializeParams({
            file_module: 'Gallery',
            type_in: 'VIDEO,IMAGE',
        });

        return this.post(
            this.postUrl,
            `general/${orgType}/${profileId}/file-manager/all-files?${params}`,
            'GET',
        ).subscribe((result) => {
            if (result.success) {
                this.galleryItems = [...result.result];
            }
        });
    }
}
