import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '@models';
import { AuthService } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class CoffeeStoryService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    // Public endpoint to get coffee story of a roasted batches
    getRoastedBatchStory(batchId: number): Observable<ApiResponse<any>> {
        return this.post(this.postUrl, `general/roasted-batches/${batchId}/coffee-story`, 'GET');
    }
}
