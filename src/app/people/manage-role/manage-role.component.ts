import { Component, OnInit } from '@angular/core';
declare var $ : any;

import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

import {BottomSheetOverviewExampleSheet} from '../manage-role/bottom-sheet-overview-example-sheet'
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  // showElement: Array<Boolean>=[]; 
  roleData : any;
  roaster_id :any;
  role_id : any;
  sizes : any[]=[];
  roleID: any;
  constructor(private _bottomSheet: MatBottomSheet, 
              public router : Router, 
              private roasterService : RoasterserviceService,
              private cookieService : CookieService,
              private toastrService : ToastrService
              ) { }

  //  sizes: any[] = [
  //   { 'id': '1', 'members': '5', 'roles': 'Sales and Marketing' },
  //   { 'id': '2', 'members': '7', 'roles': 'Accounting' },
  //   { 'id': '3', 'members': '4', 'roles': 'Finance' },
  //   { 'id': '4', 'members': '9', 'roles': 'Super Admin' },
  //   { 'id': '5', 'members': '6', 'roles': 'Admin' },
  //   { 'id': '6', 'members': '1', 'roles': 'Finance' }
  // ];

  ngOnInit(): void {
    $(document).ready(function(){
      $('input[type="checkbox"]').click(function(){
          var inputValue = $(this).attr("value");
          $("." + inputValue).toggle();
      });
  });
  this.sizes = [];
  this.roaster_id = this.cookieService.get('roaster_id');
  this.loadroles();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  checkAll(ev) {
    this.sizes.forEach(x => x.state = ev.target.checked)
  }

  isAllChecked() {
    return this.sizes.every(_ => _.state);
  }

  loadroles(){
    this.roasterService.getRoles(this.roaster_id).subscribe(
      result => {
        if(result["success"]== true){
        this.sizes = result['result'];
        console.log("Roles are :")
        console.log(this.sizes);
        console.log("Roles list ended here.")
      }
    }
    );
  }

  deleteRole(id:any){
    if(confirm("Please confirm! you want to delete?") == true){
    this.roasterService.deleteRoles(this.roaster_id,id).subscribe(
      data => {
        if(data['success']== true){
          // console.log("the role deleted succesfully");
          this.toastrService.success("Roles deleted successfully!");
          $('#tr_'+id).hide();
          $('body').trigger('click');
        }else{
          this.toastrService.error("There are Users assigned to this role.");
        }

      });
    }
  }

  updateRole(id:any){
      this.router.navigate(["/people/create-role",id]);
    
  }
  
  addMembers(event,data:any){
 this.roleData = data.name;
 this.roleID =data.id;
 console.log(this.roleData);
 let navigationExtras: NavigationExtras = {
  queryParams: {
    "roleData"   : encodeURIComponent(this.roleData),
    "roleID" : encodeURIComponent(this.roleID)

  }
}

this.router.navigate(['/people/add-members'], navigationExtras);
}
viewMembers(data:any){
  this.roleData = data.name;
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "roleData"   : encodeURIComponent(this.roleData),
    }
  }
  this.router.navigate(['/people/user-management'], navigationExtras);

}


}
