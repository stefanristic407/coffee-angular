import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';

@Component({
  selector: 'app-booked-grade-info',
  templateUrl: './booked-grade-info.component.html',
  styleUrls: ['./booked-grade-info.component.css']
})
export class BookedGradeInfoComponent implements OnInit {

  constructor(public bookedService : OrderBookedService) { }

  ngOnInit(): void {
   
  }

  gradedComplete(){
        const completeClass = document.getElementById('gradedTimeline3');
        completeClass.classList.add('completed');
        this.bookedService.afterGradeComplete = true;
        this.bookedService.beforeGradeComplete = false;  
  }


}
