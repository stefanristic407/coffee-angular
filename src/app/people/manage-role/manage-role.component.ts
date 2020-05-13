import { Component, OnInit } from '@angular/core';
declare var $ : any;

import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';



@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
  styleUrls:['bottom-sheet-overview-example-sheet.css']
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}


@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  // showElement: Array<Boolean>=[]; 

  constructor(private _bottomSheet: MatBottomSheet) { }

   sizes: any[] = [
    { 'id': '1', 'members': '5', 'roles': 'Sales and Marketing' },
    { 'id': '2', 'members': '7', 'roles': 'Accounting' },
    { 'id': '3', 'members': '4', 'roles': 'Finance' },
    { 'id': '4', 'members': '9', 'roles': 'Super Admin' },
    { 'id': '5', 'members': '6', 'roles': 'Admin' },
    { 'id': '6', 'members': '1', 'roles': 'Finance' }
  ];

  ngOnInit(): void {
    $(document).ready(function(){
      $('input[type="checkbox"]').click(function(){
          var inputValue = $(this).attr("value");
          $("." + inputValue).toggle();
      });
  });

  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }


  ngAfterViewChecked(){
  //   $('[data-toggle="popover"]').popover({
  //     html: true,
  //     content: function() {
  //        return $('#popover-content').html();
  //        }
  //      });
  // $('[data-toggle="popover"]').popover({
  //     html: true,
  //     content: function() {
  //        return $('#popover-mobile-content').html();
  //        }
  //      });
  }

  checkAll(ev) {
    this.sizes.forEach(x => x.state = ev.target.checked)
  }

  isAllChecked() {
    return this.sizes.every(_ => _.state);
  }

  
  // mouseEnter(data: any, i: any) { 
  //   this.showElement[i] = data; 

  // } 
  // mouseLeave(data: any, i: any) { 
    
  //   this.showElement[i] = data; 
  // }

}
