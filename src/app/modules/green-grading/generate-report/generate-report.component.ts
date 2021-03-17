import { Component, OnInit } from '@angular/core';
import { GenerateReportService } from './generate-report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-generate-report',
    templateUrl: './generate-report.component.html',
    styleUrls: ['./generate-report.component.scss'],
})
export class GenerateReportComponent implements OnInit {
    currentScreen: any = 'screen1';
    showProcessDetail = false;

    cuppingDetails: any;
    selectedRequestIndex = 0;
    selectedCuppingId: any;
    fromQueryParam: string;

    constructor(
        public generateReportService: GenerateReportService,
        public router: Router,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        this.route.queryParams.subscribe((params) => {
            this.fromQueryParam = params.from;
            if (
                this.fromQueryParam === 'ServiceRequest' &&
                this.generateReportService.serviceRequestsList.length === 0
            ) {
                this.router.navigate(['/green-grading/green-coffee-orders']);
            } else if (
                this.fromQueryParam === 'SampleRequest' &&
                this.generateReportService.serviceRequestsList.length === 0
            ) {
                this.router.navigate(['/green-grading/grade-sample']);
            }
        });
    }

    ngOnInit(): void {
        this.cuppingDetails = this.generateReportService.serviceRequestsList[0];
    }

    gradeReport(index: number) {
        this.selectedRequestIndex = index;
        this.selectedCuppingId = null;
        this.cuppingDetails = this.generateReportService.serviceRequestsList[index];
    }

    goNext(event) {
        if (typeof event === 'string') {
            this.currentScreen = event;
            this.selectedCuppingId = null;
        } else {
            this.selectedCuppingId = event.selectedCuppingId;
            this.currentScreen = event.screen;
        }
    }

    returnBack() {
        this.showProcessDetail = false;
    }

    onShowDetail() {
        this.showProcessDetail = true;
    }

    addBtnClick() {
        this.location.back();
    }
}
