// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Grade Info for booked type order.
import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
  selector: 'app-booked-grade-info',
  templateUrl: './booked-grade-info.component.html',
  styleUrls: ['./booked-grade-info.component.css']
})
export class BookedGradeInfoComponent implements OnInit {
  appLanguage?: any;
  roaster_id: string = '';
  harvestDetails: any[] = [];
  constructor(public bookedService: OrderBookedService, public globals: GlobalsService,
    public roasterService: RoasterserviceService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }
  // Function Name : Grade Info Timeline
  // Description: This function helps to fill the grade info timeline if graded by roaster is selected of order booked .
  gradedComplete() {
    const completeClass = document.getElementById('gradedTimeline3');
    completeClass.classList.add('completed');
    this.bookedService.afterGradeComplete = true;
    this.bookedService.beforeGradeComplete = false;
  }
  getHarvestDetails() {
    this.harvestDetails = [];
    this.roasterService.getHarvestDetails(this.bookedService.harvestId).subscribe(res => {
      if (res['success'] && res['result']) {
        this.harvestDetails = res['result'];
      }
    }, err => {
      console.log(err);
    });
  }
  viewReport(item?) {
    this.roasterService.getCuppingReportDetails(this.bookedService.harvestId).subscribe(res => {
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
