import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationType } from '@enums';
import { CuppingScore } from '@models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class GeneralCuppingService extends ApiService {
    private readonly endpoint = 'general/harvests';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getCuppingReportUrl(harvestId: number): Observable<string> {
        return this.post(this.orgPostUrl, `${this.endpoint}/${harvestId}/cupping-report`, 'GET').pipe(
            map((res) => {
                if (res.success) {
                    return res.result.url;
                }

                return '';
            }),
        );
    }

    getCuppingScores(harvestId: number, orgType: OrganizationType): Observable<CuppingScore[]> {
        return this.post(this.orgPostUrl, `${this.endpoint}/${harvestId}/cupping-scores`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    return response.result;
                }

                return [];
            }),
        );
    }
}
