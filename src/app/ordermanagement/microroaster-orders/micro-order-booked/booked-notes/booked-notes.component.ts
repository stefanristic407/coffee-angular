import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import {MicroOrderBookedService } from '../micro-order-booked.service';


@Component({
  selector: 'app-booked-notes',
  templateUrl: './booked-notes.component.html',
  styleUrls: ['./booked-notes.component.css']
})
export class BookedNotesComponent implements OnInit {
  appLanguage: any;
  
  constructor(public microbookedService: MicroOrderBookedService,public global: GlobalsService) { }

  ngOnInit(): void {
    this.language();
  }

  language(){
    this.appLanguage = this.global.languageJson;
    }
  
      // Function Name : Grade Info Timeline
    // Description: This function helps to fill the grade info timeline if graded by roaster is selected of order sample .
    gradeComplete() {
      const completeClass = document.getElementById('gradedTimeline2');
      completeClass.classList.add('completed');
      this.microbookedService.afterGradeComplete = true;
      this.microbookedService.beforeGradeComplete = false;
  }

}
