// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Grade Info for pre-book type order.
import { Component, OnInit } from '@angular/core';
import { OrderSampleService } from '../../order-sample/order-sample.service';
import { OrderPrebookService } from '../order-prebook.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
  selector: 'sewn-prebook-grade-info',
  templateUrl: './prebook-grade-info.component.html',
  styleUrls: ['./prebook-grade-info.component.css']
})
export class PrebookGradeInfoComponent implements OnInit {
  appLanguage?: any;
  roaster_id: string = '';
  harvestDetails: any[] = [];
  constructor(public prebookService: OrderPrebookService, public globals: GlobalsService,
    public roasterService: RoasterserviceService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }
  // Function Name : Grade Info Timeline
  // Description: This function helps to fill the grade info timeline if graded by Facilitator is selected of order pre-book .
  gradeComplete() {
    const completeClass = document.getElementById('gradedTimeline1');
    completeClass.classList.add('completed');
    this.prebookService.afterGradeComplete = true;
    this.prebookService.beforeGradeComplete = false;
  }
  getHarvestDetails() {
    this.harvestDetails = [];
    this.roasterService.getHarvestDetails(this.prebookService.harvestId).subscribe(res => {
      if (res['success'] && res['result']) {
        this.harvestDetails = res['result'];
      }
    }, err => {
      console.log(err);
    });
  }
  viewReport(item?) {
    this.roasterService.getCuppingReportDetails(this.prebookService.harvestId).subscribe(res => {
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
