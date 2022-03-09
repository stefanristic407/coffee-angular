import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@models';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class BrandService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // ------------ Brand Profiles ------------
    // View details of the brand profile page.
    getPageDetails(slug: string): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `brand-profile/${slug}`, 'GET');
    }
    // Add details for the SA brand profile page.
    updatePageDetails(slug: string, data: any): Observable<ApiResponse<any>> {
        return this.postWithOrg(this.orgPostUrl, `/brand-profile/${slug}`, 'PUT', data);
    }

    uploadImages(formData: any) {
        return this.http.post(this.fileUploadUrl, formData);
    }
}
