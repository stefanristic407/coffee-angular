import { Injectable } from '@angular/core';
import { GlobalsService } from '@services';

@Injectable({
    providedIn: 'root',
})
export class GenerateReportService {
    serviceRequestsList: any = [];

    constructor(private globalsService: GlobalsService) {}

    getCountryName(data: any) {
        const countryItem = this.globalsService.getCountryName(data);
        return countryItem;
    }
}
