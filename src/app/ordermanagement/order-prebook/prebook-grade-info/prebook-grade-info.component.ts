import { Component, OnInit } from '@angular/core';
import { OrderSampleService } from '../../order-sample/order-sample.service';
import { OrderPrebookService } from '../order-prebook.service';

@Component({
  selector: 'sewn-prebook-grade-info',
  templateUrl: './prebook-grade-info.component.html',
  styleUrls: ['./prebook-grade-info.component.css']
})
export class PrebookGradeInfoComponent implements OnInit {

  constructor(public prebookService : OrderPrebookService) { }

  ngOnInit(): void {
  }
  gradeComplete(){
    const completeClass = document.getElementById('gradedTimeline2');
        completeClass.classList.add('completed');
        this.prebookService.afterGradeComplete = true;
        this.prebookService.beforeGradeComplete = false;
  }

}
