import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BulkDetails } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { toCamelCase } from '@utils';

@Injectable({
    providedIn: 'root',
})
export class AvailabilityService extends ApiService {
    private readonly endpoint = 'availability/gc';

    constructor(protected cookieSrv: CookieService, protected http: HttpClient) {
        super(cookieSrv, http);
    }

    getAvailabilityList(): Observable<any[]> {
        return this.postWithOrg(this.orgPostUrl, this.endpoint).pipe(
            map((response) => {
                if (response.success && response.result) {
                    return response.result;
                }

                return [];
            }),
        );
    }

    getAvailabilityDetails(harvestId: number): Observable<BulkDetails> {
        return this.post(this.orgPostUrl, `general/${this.endpoint}/${harvestId}`, 'GET').pipe(
            map((response) => {
                if (response.success) {
                    const details: BulkDetails = {
                        flavours: response.result.flavours,
                        listingStatus: response.result.listing_status,
                        packaging: response.result.packaging,
                        processingTypes: response.result.processing_types,
                        type: response.result.type,
                        species: response.result.species,
                        waterActivity: response.result.dry_milling.water_activity,
                        icoNumber: response.result.ico_number,
                        quantityCount: response.result.quantity_count,
                        quantityType: response.result.quantity_type,
                        weight: response.result.dry_milling.gc_weight,
                        qualityGrade: response.result.dry_milling.quality_grade,
                    };

                    return details;
                }

                return null;
            }),
        );
    }
}
