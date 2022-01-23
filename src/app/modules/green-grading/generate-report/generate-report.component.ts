import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerateReportService } from './generate-report.service';

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

    constructor(
        public generateReportService: GenerateReportService,
        public router: Router,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        this.route.queryParams.subscribe((params) => {
            this.generateReportService.fromQueryParam = params.from;
            if (
                this.generateReportService.fromQueryParam === 'ServiceRequest' &&
                this.generateReportService.serviceRequestsList.length === 0
            ) {
                this.router.navigate(['/green-grading/green-coffee-orders']);
            } else if (
                this.generateReportService.fromQueryParam === 'SampleRequest' &&
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
        this.currentScreen = this.cuppingDetails?.screen ?? 'screen1';
    }

    goNext(event) {
        if (typeof event === 'string') {
            this.currentScreen = event;
            this.selectedCuppingId = null;
        } else {
            this.selectedCuppingId = event.selectedCuppingId;
            this.currentScreen = event.screen;
        }
        this.cuppingDetails.screen = this.currentScreen;
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

    afterUpload() {
        if (this.generateReportService.serviceRequestsList.length === 1) {
            this.generateReportService.serviceRequestsList = [];
            this.router.navigate(['/green-grading/green-coffee-orders']);
        } else {
            this.generateReportService.serviceRequestsList = this.generateReportService.serviceRequestsList.filter(
                (item) => item.cupping_report_id !== this.cuppingDetails.cupping_report_id,
            );
            this.gradeReport(0);
        }
    }

    handleChangeCuppingVersion(cuppingReportId: any) {
        this.cuppingDetails = this.generateReportService.totalRequestList.find(
            (item) => item.cupping_report_id === cuppingReportId,
        );
    }
}
