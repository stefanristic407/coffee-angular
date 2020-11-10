import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { MicroOrderSampleService} from '../micro-order-sample.service';


@Component({
  selector: 'app-sample-notes',
  templateUrl: './sample-notes.component.html',
  styleUrls: ['./sample-notes.component.css']
})
export class SampleNotesComponent implements OnInit {
  appLanguage: any;

  constructor(public microsampleService: MicroOrderSampleService,public global: GlobalsService) { }

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
      this.microsampleService.afterGradeComplete = true;
      this.microsampleService.beforeGradeComplete = false;
  }
}
