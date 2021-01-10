// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Grade Info for sample type order.
import { Component, OnInit } from '@angular/core';
import { OrderSampleService } from '../order-sample.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
    selector: 'sewn-grade-info',
    templateUrl: './grade-info.component.html',
    styleUrls: ['./grade-info.component.css']
})
export class GradeInfoComponent implements OnInit {
    appLanguage?: any;
    gradeSampleActive: any = 0;
    roaster_id: string = '';
    harvestDetails: any[] = [];
    constructor(public sampleService: OrderSampleService,
        public globals: GlobalsService, public roasterService: RoasterserviceService) { }

    ngOnInit(): void {
        this.language();
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.gradeSampleActive++;
    }

    // Function Name : Grade Info Timeline
    // Description: This function helps to fill the grade info timeline if graded by roaster is selected of order sample .
    gradeComplete() {
        const completeClass = document.getElementById('gradedTimeline2');
        completeClass.classList.add('completed');
        this.sampleService.afterGradeComplete = true;
        this.sampleService.beforeGradeComplete = false;
    }
    getHarvestDetails() {
        this.harvestDetails = [];
        this.roasterService.getHarvestDetails(this.sampleService.harvestId).subscribe(res => {
            if (res['success'] && res['result']) {
                this.harvestDetails = res['result'];
            }
        }, err => {
            console.log(err);
        });
    }
    viewReport(item?) {
        this.roasterService.getCuppingReportDetails(this.sampleService.harvestId).subscribe(res => {
            if (res['success'] && res['result'] && res['result']['url']) {
                var hiddenElement = document.createElement('a');
                hiddenElement.href = res['result']['url'];
                hiddenElement.target = '_blank';
                hiddenElement.click();
            }
        }, err => {
            console.log(err);
        });
    }

}
