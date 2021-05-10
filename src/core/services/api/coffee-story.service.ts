import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';

@Injectable({
    providedIn: 'root',
})
export class CoffeeStoryService extends ApiService {
    constructor(protected cookieService: CookieService, protected http: HttpClient) {
        super(cookieService, http);
    }

    // Public endpoint to get coffee story of a roasted batches
    getRoastedBatchStory(batchId: number): Observable<ApiResponse<any>> {
        return this.post(this.postUrl, `general/roasted-batches/${batchId}/coffee-story`, 'GET');
    }
}
