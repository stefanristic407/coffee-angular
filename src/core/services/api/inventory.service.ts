import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, RoastedBatch, RoastingProfile } from '@models';
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
    createRoastingProfile(body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles`, 'POST', body);
    }
    // Return the roasting profile list of a roaster
    getRoastingProfiles(postData?: object): Observable<ApiResponse<RoastingProfile[]>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles?${this.serializeParams(postData)}`);
    }
    // View the roasting profile details by roasting profile ID
    getRoastingProfileDetail(id: number): Observable<ApiResponse<RoastingProfile>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`);
    }
    // Update the roasting profile details of a roaster
    updateRoastingProfileDetail(id: number, body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`, 'PUT', body);
    }
    // Delete the roasting profile details
    deleteRoastingProfile(id: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasting-profiles/${id}`, 'DELETE');
    }

    // ------------ RO - RC Batches ------------
    // Add roasted batch details for roaster
    createRoastedBatch(body: object): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches`, 'POST', body);
    }
    // Return the list roasted batches of roaster
    getRoastedBatches(postData?: object): Observable<ApiResponse<RoastedBatch[]>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches?${this.serializeParams(postData)}`);
    }
    // View the roasted batch details by batch ID
    getRoastedBatch(id: number): Observable<ApiResponse<RoastedBatch>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches/${id}`);
    }
    // Update roasted batch details for roaster
    updateRoastedBatch(id: number, body: object): Observable<ApiResponse<any>> {
        return this.putWithOrg(this.orgPutUrl, `roasted-batches/${id}`, 'PUT', body);
    }
    // Delete the roasting profile details
    deleteRoastedBatch(id: number): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `roasted-batches/${id}`, 'DELETE');
    }
}
