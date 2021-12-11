import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, RoastingProfile } from '@models';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class InventoryService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ RO - Roasting Profile ------------
    // Add roasting profile details for roaster
    addRoastingProfile(body: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles`, 'POST', body);
    }
    // Return the roasting profile list of a roaster
    getRoastingProfiles(postData?): Observable<ApiResponse<RoastingProfile[]>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles?${this.serializeParams(postData)}`);
    }
    // View the roasting profile details by roasting profile ID
    getRoastingProfileDetail(id: number): Observable<ApiResponse<RoastingProfile>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`);
    }
    // Update the roasting profile details of a roaster
    updateRoastingProfileDetail(id: number, body: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`, 'PUT', body);
    }
    // Delete the roasting profile details
    deleteRoastingProfile(id: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`, 'DELETE');
    }
}
