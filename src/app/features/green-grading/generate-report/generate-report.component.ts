import { Component, OnInit, ViewChild } from '@angular/core';
import { GenerateReportService } from './generate-report.service';
import { GenerateCoffeeGradingComponent } from './generate-coffee-grading/generate-coffee-grading.component';
import { GenerateGreenCoffeeComponent } from './generate-green-coffee/generate-green-coffee.component';
import { GenerateMySampleComponent } from './generate-my-sample/generate-my-sample.component';
import { GenerateCuppingResultsComponent } from './generate-cupping-results/generate-cupping-results.component';
import { GenerateCuppingReportComponent } from './generate-cupping-report/generate-cupping-report.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-generate-report',
    templateUrl: './generate-report.component.html',
    styleUrls: ['./generate-report.component.css'],
})
export class GenerateReportComponent implements OnInit {
    currentScreen: any = 'screen1';
    @ViewChild(GenerateCoffeeGradingComponent, { static: false })
    coffeeGrading: GenerateCoffeeGradingComponent;
    @ViewChild(GenerateGreenCoffeeComponent, { static: false })
    greenCoffee: GenerateGreenCoffeeComponent;
    @ViewChild(GenerateMySampleComponent, { static: false })
    mySample: GenerateMySampleComponent;
    @ViewChild(GenerateCuppingResultsComponent, { static: false })
    cuppingResults: GenerateCuppingResultsComponent;
    @ViewChild(GenerateCuppingReportComponent, { static: false })
    cuppingReport: GenerateCuppingReportComponent;
    constructor(
        public generateReportService: GenerateReportService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe((params) => {
            this.generateReportService.fromQueryParam = params['from'];
            if (
                this.generateReportService.fromQueryParam == 'ServiceRequest' &&
                this.generateReportService.serviceRequestsList == 0
            ) {
                this.router.navigate(['/features/service-requests']);
            } else if (
                this.generateReportService.fromQueryParam == 'SampleRequest' &&
                this.generateReportService.serviceRequestsList == 0
            ) {
                this.router.navigate(['/features/grade-sample']);
                console.log(this.generateReportService.serviceRequestsList);
            }
        });
    }

    ngOnInit(): void {}

    gradeReport(item: any) {
        this.generateReportService.cuppingDetails = item;
        console.log(item);
        if (this.currentScreen == 'screen1') {
            this.coffeeGrading.getEvaluatorData();
            this.coffeeGrading.physicalDefectsList();
        } else if (this.currentScreen == 'screen2') {
            this.greenCoffee.evaluatorsList();
            this.greenCoffee.cupping = '';
            this.greenCoffee.singleCuppingData();
        } else if (this.currentScreen == 'screen3') {
            this.mySample.getCuppingScoreDetails();
            this.mySample.evaluatorsList();
            this.mySample.flavourProfileList();
        } else if (this.currentScreen == 'screen4') {
            // this.cuppingResults.getEvaluators();
        } else if (this.currentScreen == 'screen5') {
            // this.cuppingReport.getEvaluatorData();
            // this.cuppingReport.getCupReports();
            this.greenCoffee.singleCuppingData();
        }
    }
    goNext(event) {
        console.log(event);
        this.currentScreen = event;
    }
}
