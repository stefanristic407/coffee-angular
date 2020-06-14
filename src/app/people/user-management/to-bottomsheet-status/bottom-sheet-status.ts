
import { Component, OnInit } from '@angular/core';
import { SheetValues } from '../sheet-values';

@Component({
  selector: 'bottom-sheet-status',
  templateUrl: 'bottom-sheet-status.html',
  styleUrls: ['bottom-sheet-status.css']
})

export class BottomSheetStatus {

  constructor(private _sheetValues: SheetValues) {

  }
  status: any[] = ["All", "Active", "Disabled"];

  setValues(value: any) {
    if (value == 'All') {
      value = '';
    }
    this._sheetValues.status = value;
  }
}

