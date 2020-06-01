import { Component, OnInit, TemplateRef } from '@angular/core';
declare var $ : any;
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {BottomSheetOverviewExampleSheet} from '../user-management/bottom-sheet-overview-example-sheet'
import {BottomSheetRoles} from '../user-management/to-bottomsheet-roles/bottom-sheet-roles';
import {BottomSheetStatus} from '../user-management/to-bottomsheet-status/bottom-sheet-status';
import { SheetValues } from './sheet-values';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router,ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  roaster_id : any;
  userfilterDat:any[] = [];
  roles : any;
  user_role : any;
  loginId : any;
  userID: any;
  modalRef: BsModalRef;
  modalUserRoasterId = '';
  modalUserRoasterName = '';
  role_roasteruser_id:any;
	assignButtonValue : string;
	roleData  : any = "";


  constructor(private _bottomSheet: MatBottomSheet, 
    private _sheetValues: SheetValues, 
    private roasterService : RoasterserviceService, 
    private cookieService : CookieService,
    private router : Router,
    private toastrService : ToastrService,
	private modalService: BsModalService,
	public route : ActivatedRoute,

    ) { 
    this.termStatus = '';
    this.termRole = '';
    this.loginId = this.cookieService.get('user_id');
  }
// OPEN MODAL

openModal(template: TemplateRef<any>, userId: any, userName: any) {
  this.modalRef = this.modalService.show(template);
  this.modalUserRoasterId = userId;
  this.modalUserRoasterName = userName;
  //console.log("UserName : " , this.modalUserName);
}
  ngOnInit(): void {
    this.userfilterDat =[];
    this.roaster_id = this.cookieService.get('roaster_id');
    this.getRoasterUsers();
    this.listRoles();
		this.assignButtonValue = "Submit";
		
		if(this.route.snapshot.queryParams['roleData'] != undefined){
			this.roleData = decodeURIComponent(this.route.snapshot.queryParams['roleData'])
			console.log("Data : ",this.roleData);
		  }
		  else{
			this.roleData =this.termRole;
		  }

  }

  getRoasterUsers(){
    this.roasterService.getRoasterUsers(this.roaster_id).subscribe(
      result => {
        if(result['success']== true){
		  console.log(JSON.stringify(result['result'][0].id));
			var userData = result['result'];
			userData.forEach(element => {
			  var tempData = {};
			  tempData['id'] = element.id;
			  tempData['name'] = element.firstname + " " + element.lastname;
			//   if(element.id == this.cookieService['user_id']){
			// 	this._roleService.userLastlogin().subscribe(
			// 	  loginResponse => {
			// 		console.log("Login Last: ");
			// 		console.log(loginResponse);
			// 		tempData['lastLogin'] = loginResponse['result'];
			// 	  }
			// 	);
			//   } else {
			// 	tempData['lastLogin'] = "";
			//   }
			  
			  tempData['email'] = element.email;
			  tempData['status'] = element.status;
			  this.roasterService.getUserBasedRoles(this.roaster_id,tempData['id']).subscribe(
				roleResponse => {
				  console.log(roleResponse);
				  if(roleResponse['success'] == true){
					tempData['roles'] = roleResponse['result'];
				  } else {
					tempData['roles'] = "";
				  }
				}
			  );
			  tempData['roles'] = "";
			  this.userfilterDat.push(tempData)
			});
		  } 
		  else {
        this.toastrService.error("Unable to fetch users data");
		  }

        //   this.roasterService.getUserBasedRoles(this.roaster_id,result['result'][0].id).subscribe(
        //     data =>{
        //      this.user_role = data['result'][0].name;
        //       console.log("user role ");
        //       console.log(JSON.stringify(data));
        //     }
        //   )
        //   this.userfilterDat = result['result'];
        
        console.log("Users are :")
        console.log(this.userfilterDat);
      });
  }


  listRoles() {
    this.roasterService.getRoles(this.roaster_id).subscribe(
      result => {
        this.roles = result['result'];
        console.log(this.roles);
        this.role_roasteruser_id = this.roles[0].id;
      }
    );
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

  setStatus(term:any){
    this.termStatus = term;
  }

  setRole(term:any){
    this.termRole = term;
  }

  deleteRoasterUser(userID:any){
    if (confirm("Please confirm! you want to delete?") == true) {

      this.roasterService.deleteRoasterUser(this.roaster_id,userID).subscribe(
        response=>{
          console.log(response);
          if(response['success'] == true){
            this.toastrService.success("User Deleted successfully!");
            this.getRoasterUsers();
            window.location.reload();
          }
          else{
            this.toastrService.error("Unable to delete the user.");
  
          }
        }
      )
      }
  }

  

  userDisable(disableId){
	  console.log("disable account id :"+disableId);
    if (confirm("Please confirm! you want to Disable Account?") == true) {
      this.roasterService.disableAdminUsers(this.roaster_id,disableId).subscribe(
            result=>{
              if(result['success'] == true){
        this.toastrService.success("Disabled User Account Successfully");
        this.getRoasterUsers();
        window.location.reload();
              }
              else{
                this.toastrService.error("Error while disabling the User account");
              }
            }
          )
    }
  }
  userEnable(enableId){
	  console.log("Id of enabling account"+enableId);
    if (confirm("Please confirm! you want to Enable Account?") == true) {
    this.roasterService.enableAdminUser(this.roaster_id,enableId).subscribe(
              result=>{
                if(result['success'] == true){
                  this.toastrService.success("Enabled User Account");
                  this.getRoasterUsers();
                  window.location.reload();
                }
                else{
                  this.toastrService.error("Error while enabling the User account");
                }
              }
            )
    	}     
  }
  roleDeletionRoaster(roleID:any,userID:any){
	if (confirm("Please confirm! you want to delete?") == true) {
		this.roasterService.deleteRoasterUserRole(this.roaster_id,roleID,userID).subscribe(
		  res => {
			console.log(res);
			if (res['success'] == true) {
			  this.toastrService.success("User Role Deleted successfully!");
			  $("#"+roleID+"_"+userID).hide();
			  // this.loadUsers();
			  // window.location.reload();
  
			} else {
			  this.toastrService.error("Unable to delete the role. ");
			}
		  }
		);
	  }
  }

  editMember(size:any){
    this.userID = size;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "userID"   : encodeURIComponent(this.userID),
      }
    }
    
    this.router.navigate(['/people/add-members'], navigationExtras);
  }
  SubmitRole(){
  this.assignButtonValue = "Submitting";
    console.log(this.role_roasteruser_id,this.modalUserRoasterId);
    this.roasterService.assignUserBasedUserRoles(this.roaster_id,this.role_roasteruser_id,this.modalUserRoasterId).subscribe(
    res=>{
    console.log(res);
      if(res['success'] == true){
       this.assignButtonValue = "Submit";
        this.toastrService.success("User Role Assigned Successfully!");
        this.modalRef.hide();
        this.getRoasterUsers();
        window.location.reload();

      } else {
        this.toastrService.error("User Role Already exists.Please select another role");
      }
      this.assignButtonValue = "Submit";
    })
  }

}
