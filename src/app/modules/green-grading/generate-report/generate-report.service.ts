import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class GenerateReportService {
    serviceRequestsList: any = [];
    totalRequestList: any = [];
    fromQueryParam: 'ServiceRequest' | 'SampleRequest';

    constructor(private router: Router) {}

    backToOriginalPage() {
        if (this.fromQueryParam === 'ServiceRequest') {
            this.router.navigate(['/green-grading/green-coffee-orders']);
        } else if (this.fromQueryParam === 'SampleRequest') {
            this.router.navigate(['/green-grading/grade-sample']);
        } else {
            this.router.navigate(['/green-grading/green-coffee-orders']);
        }
    }
}
