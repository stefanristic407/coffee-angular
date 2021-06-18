import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class VarietyService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // List all distinct varieties in the platform for public
    getAllVarieties(query: any = null): Observable<ApiResponse<any>> {
        const params = this.serializeParams(query);
        return this.post(this.postUrl, `general/es/varieties?${params}`, 'GET');
    }
}
