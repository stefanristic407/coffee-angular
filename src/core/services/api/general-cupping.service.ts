import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrgType } from '@enums';
import { CuppingScore } from '@models';
import { toCamelCase } from '@utils';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class GeneralCuppingService extends ApiService {
    private readonly endpoint = 'general/harvests';

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getCuppingReportUrl(harvestId: number): Observable<string> {
        return this.post(this.url, `${this.endpoint}/${harvestId}/cupping-report`, 'GET').pipe(
            map((res) => {
                if (res.success) {
                    return res.result.url;
                }

                return '';
            }),
        );
    }

    getCuppingScores(harvestId: number, orgType: OrgType): Observable<CuppingScore[]> {
        return this.post(this.url, `${this.endpoint}/${harvestId}/cupping-scores`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    return response.result.map((x) => toCamelCase<CuppingScore>(x));
                }

                return [];
            }),
        );
    }
}
