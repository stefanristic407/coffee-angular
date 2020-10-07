// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Grade Info for pre-book type order.
import { Component, OnInit } from '@angular/core';
import { OrderSampleService } from '../../order-sample/order-sample.service';
import { OrderPrebookService } from '../order-prebook.service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'sewn-prebook-grade-info',
  templateUrl: './prebook-grade-info.component.html',
  styleUrls: ['./prebook-grade-info.component.css']
})
export class PrebookGradeInfoComponent implements OnInit {
  appLanguage :any;
  constructor(public prebookService: OrderPrebookService,public global: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.global.languageJson;
  }
  // Function Name : Grade Info Timeline
  // Description: This function helps to fill the grade info timeline if graded by Facilitator is selected of order pre-book .
  gradeComplete() {
    const completeClass = document.getElementById('gradedTimeline2');
    completeClass.classList.add('completed');
    this.prebookService.afterGradeComplete = true;
    this.prebookService.beforeGradeComplete = false;
  }

}
