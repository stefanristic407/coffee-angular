
import { Component, OnInit } from '@angular/core';
import { SheetValues } from '../sheet-values';

@Component({
    selector: 'bottom-sheet-roles',
    templateUrl: 'bottom-sheet-roles.html',
    styleUrls:['bottom-sheet-roles.css']
  })

  export class BottomSheetRoles{
    constructor(private _sheetValues: SheetValues){

    }

    roles:any[]=["All", "Sales","Accounting","Finance","Brand Management","Master Admin"]
    setValues(value: any){
      if(value == 'All'){
        value = '';
      }
      this._sheetValues.roles = value;
    }
  }

 