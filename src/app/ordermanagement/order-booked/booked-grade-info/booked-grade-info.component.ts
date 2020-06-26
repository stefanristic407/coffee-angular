// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Grade Info for booked type order.
import { Component, OnInit } from '@angular/core';
import { OrderBookedService } from '../order-booked.service';

@Component({
  selector: 'app-booked-grade-info',
  templateUrl: './booked-grade-info.component.html',
  styleUrls: ['./booked-grade-info.component.css']
})
export class BookedGradeInfoComponent implements OnInit {

  constructor(public bookedService: OrderBookedService) { }

  ngOnInit(): void {

  }
  // Function Name : Grade Info Timeline
  // Description: This function helps to fill the grade info timeline if graded by roaster is selected of order booked .
  gradedComplete() {
    const completeClass = document.getElementById('gradedTimeline3');
    completeClass.classList.add('completed');
    this.bookedService.afterGradeComplete = true;
    this.bookedService.beforeGradeComplete = false;
  }


}
