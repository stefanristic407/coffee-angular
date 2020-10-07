// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Grade Info for sample type order.
import { Component, OnInit } from '@angular/core';
import { OrderSampleService } from '../order-sample.service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
    selector: 'sewn-grade-info',
    templateUrl: './grade-info.component.html',
    styleUrls: ['./grade-info.component.css']
})
export class GradeInfoComponent implements OnInit {
	appLanguage: any;

    constructor(public sampleService: OrderSampleService,
        public global: GlobalsService) { }

    ngOnInit(): void {
        this.appLanguage = this.global.languageJson;
    }


    // Function Name : Grade Info Timeline
    // Description: This function helps to fill the grade info timeline if graded by roaster is selected of order sample .
    gradeComplete() {
        const completeClass = document.getElementById('gradedTimeline2');
        completeClass.classList.add('completed');
        this.sampleService.afterGradeComplete = true;
        this.sampleService.beforeGradeComplete = false;
    }

}
