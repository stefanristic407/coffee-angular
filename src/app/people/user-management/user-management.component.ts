import { Component, OnInit } from '@angular/core';
declare var $ : any;
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {BottomSheetOverviewExampleSheet} from '../user-management/bottom-sheet-overview-example-sheet'
import {BottomSheetRoles} from '../user-management/to-bottomsheet-roles/bottom-sheet-roles';
import {BottomSheetStatus} from '../user-management/to-bottomsheet-status/bottom-sheet-status';
import { SheetValues } from './sheet-values';

// @Component({
//   selector: 'bottom-sheet-overview-example-sheet',
//   templateUrl: 'bottom-sheet-overview-example-sheet.html',
//   styleUrls:['bottom-sheet-overview-example-sheet.css']

// })
// export class BottomSheetOverviewExampleSheet {
//   constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

//   openLink(event: MouseEvent): void {
//     this._bottomSheetRef.dismiss();
//     event.preventDefault();
//   }
// }


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  term: any;
  termStatus: any;
  termRole: any;

  userfilterDat:any[] = [
    {
      name: 'Luis Stanley',
      lastLogin: '24/09/2019  11:45am',
      Email: 'louis.s@roaster.com',
      status:'Active',
      roles:'Accountant'
    },
    {
      name: 'Lillian Duncan',
      lastLogin: '4/09/2019 7.45am',
      Email: 'lillian.s@roaster.com',
      status:'Disabled',
      roles:'Sales'
    },
    {
      name: 'Lillian Duncan',
      lastLogin: '14/11/2019 10.45pm',
      Email: 'samein.s@roaster.com',
      status:'Disabled',
      roles:'Admin'
    },
    {
      name: 'Javin Duan',
      lastLogin: '24/09/2019 11.45am',
      Email: 'javin.s@roaster.com',
      status:'Active',
      roles:'Super Admin'
    },
    {
      name: 'Lillian Duncan',
      lastLogin: '5/12/2019 4.30pm',
      Email: 'lillian.s@roaster.com',
      status:'Disabled',
      roles:'Accountant'
    }
  ]

  constructor(private _bottomSheet: MatBottomSheet, private _sheetValues: SheetValues) { 
    this.termStatus = '';
    this.termRole = '';
  }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  openRoleBottomSheet(){
    var bottomSheetRef = this._bottomSheet.open(BottomSheetRoles);
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.termRole = this._sheetValues.roles;
      console.log(this.termRole)
    });
  }
  openStatusBottomSheet(){
    var bottomSheetRef = this._bottomSheet.open(BottomSheetStatus);
    
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.termStatus = this._sheetValues.status;
    });
    
    //bottomSheetRef.dismiss();
  }

  ngAfterViewChecked(){}

  checkAll(ev) {
    this.userfilterDat.forEach(x => x.state = ev.target.checked)
  }

  isAllChecked() {
    return this.userfilterDat.every(_ => _.state);
  }

  setStatus(term:any){
    this.termStatus = term;
  }

  setRole(term:any){
    this.termRole = term;
  }

}
