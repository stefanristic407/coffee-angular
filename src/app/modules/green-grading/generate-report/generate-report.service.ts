import { Injectable } from '@angular/core';
import { GlobalsService } from '@services';

@Injectable({
    providedIn: 'root',
})
export class GenerateReportService {
    serviceRequestsList: any = [];
    totalRequestList: any = [];

    constructor(private globalsService: GlobalsService) {}
}
