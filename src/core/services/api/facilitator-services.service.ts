import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceType } from '@enums';
import { ApiResponse } from '@models';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class FcServicesService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getPublicServices(orgId: number): Observable<ApiResponse<any>> {
        return this.post(this.postUrl, `general/fc/${orgId}/services`);
    }

    getPublicService(orgId: number, slug: ServiceType): Observable<ApiResponse<any>> {
        return this.post(this.postUrl, `general/fc/${orgId}/services/${slug}`);
    }
}
