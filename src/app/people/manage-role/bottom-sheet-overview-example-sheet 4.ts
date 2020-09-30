
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet-overview-example-sheet.html',
    styleUrls:['bottom-sheet-overview-example-sheet.css']
  })

  export class BottomSheetOverviewExampleSheet {
      showVar=true;

    toggleChild() {
        this.showVar = !this.showVar;
     }
  }

 