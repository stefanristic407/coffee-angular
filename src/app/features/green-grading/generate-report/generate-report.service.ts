import { Injectable } from '@angular/core';
import { RoasteryProfileService } from '@services';

@Injectable({
    providedIn: 'root',
})
export class GenerateReportService {
    cuppingDetails: any;
    fromQueryParam: any;
    serviceRequestsList: any = [];

    constructor(public roasteryProfileService: RoasteryProfileService) {}
    getCountryName(data: any) {
        return this.roasteryProfileService.countryList.find((con) => con.isoCode == data).name;
    }
}
