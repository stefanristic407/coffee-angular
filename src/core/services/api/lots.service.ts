import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LotDetails } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class LotsService extends ApiService {
    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    getLotDetails(estateId: number, lotId: number): Observable<LotDetails> {
        return this.postWithOrg(this.orgPostUrl, `estates/${estateId}/lots/${lotId}`).pipe(
            map((response) => {
                if (response.success) {
                    return response.result;
                }

                return null;
            }),
        );
    }
}
