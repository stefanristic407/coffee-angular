import { Component, OnInit } from '@angular/core';
import { OrderSampleService } from '../order-sample.service';

@Component({
  selector: 'sewn-grade-info',
  templateUrl: './grade-info.component.html',
  styleUrls: ['./grade-info.component.css']
})
export class GradeInfoComponent implements OnInit {

  constructor(public sampleService : OrderSampleService) { }

  ngOnInit(): void {
  }

  gradeComplete(){
    const completeClass = document.getElementById('gradedTimeline2');
        completeClass.classList.add('completed');
        this.sampleService.afterGradeComplete = true;
        this.sampleService.beforeGradeComplete = false;
  }

}
