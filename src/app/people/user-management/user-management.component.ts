// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of User Management.

import { Component, OnInit, TemplateRef } from '@angular/core';
declare var $: any;
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheet } from '../user-management/bottom-sheet-overview-example-sheet'
import { BottomSheetRoles } from '../user-management/to-bottomsheet-roles/bottom-sheet-roles';
import { BottomSheetStatus } from '../user-management/to-bottomsheet-status/bottom-sheet-status';
import { SheetValues } from './sheet-values';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {UserserviceService} from 'src/services/users/userservice.service';
import { DatePipe } from '@angular/common';

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
  roaster_id: any;
  userfilterDat: any[] = [];
  roles: any;
  user_role: any;
  loginId: any;
  userID: any;
  modalRef: BsModalRef;
  modalUserRoasterId = '';
  modalUserRoasterName = '';
  role_roasteruser_id: any;
  assignButtonValue: string;
  roleData: any = "";
  loginValue: any;
  displayModal: boolean;


  constructor(private _bottomSheet: MatBottomSheet,
    private _sheetValues: SheetValues,
    private roasterService: RoasterserviceService,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    public route: ActivatedRoute,
    public userService:UserserviceService) {
    this.termStatus = '';
    this.termRole = '';
    this.loginId = this.cookieService.get('user_id');
  }

  // Function Name : Open Modal
  // Description: This function helps to get the Role Id from user management page 

  openModal(template: TemplateRef<any>, userId: any, userName: any) {
    this.modalRef = this.modalService.show(template);
    this.modalUserRoasterId = userId;
    this.modalUserRoasterName = userName;
    //console.log("UserName : " , this.modalUserName);
  }
  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    this.userfilterDat = [];
    this.roaster_id = this.cookieService.get('roaster_id');
    this.getRoasterUsers();
    this.listRoles();
    this.assignButtonValue = "Submit";

    if (this.route.snapshot.queryParams['roleData'] != undefined) {
      this.roleData = decodeURIComponent(this.route.snapshot.queryParams['roleData'])
      console.log("Data : ", this.roleData);
    }
    else {
      this.roleData = this.termRole;
    }

  }
//  Function Name : Check box function.
	//  Description   : This function helps to Check all the rows of the Users list.
	checkAll(ev) {
		this.userfilterDat.forEach(x => (x.state = ev.target.checked));
  }
  
  //  Function Name : Single Check box function.
	//  Description   : This function helps to Check that single row isChecked.
	isAllChecked() {
		return this.userfilterDat.every(_ => _.state);
	}


    // Function Name : Help
  // Description: This function helps to show the Help modal - info regarding the page 
  showModalDialog() {
    this.displayModal = true;
}

  // Function Name : Roaster
  // Description: This function helps to get the Role Id from user management page 

  getRoasterUsers() {
    this.roasterService.getRoasterUsers(this.roaster_id).subscribe(
      result => {
        if (result['success'] == true) {
          console.log(JSON.stringify(result['result'][0].id));
          var userData = result['result'];
          userData.forEach(element => {
            var tempData = {};
            tempData['id'] = element.id;
            tempData['name'] = element.firstname + " " + element.lastname;
              if(element.id == this.cookieService.get('user_id')){
            	this.userService.userLastlogin().subscribe(
            	  loginResponse => {
                  console.log(loginResponse);
							let sample = loginResponse['result'];
							let latest_date = sample.map(function (e) { return e.logged_in_at; }).sort().reverse()[0];
							this.loginValue = new DatePipe('en-Us').transform(latest_date, 'dd/MM/yyyy h:mma', 'GMT+5:30');
							tempData["lastLogin"] = this.loginValue;
            	  }
            	);
              } else {
            	tempData['lastLogin'] = "";
              }
            tempData['email'] = element.email;
            tempData['status'] = element.status;
            this.roasterService.getUserBasedRoles(this.roaster_id, tempData['id']).subscribe(
              roleResponse => {
                console.log(roleResponse);
                if (roleResponse['success'] == true) {
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

  // Function Name : Roles Edit
  // Description: This function helps to get the Role Id from user management page 

  listRoles() {
    this.roasterService.getRoles(this.roaster_id).subscribe(
      result => {
        this.roles = result['result'];
        console.log(this.roles);
        this.role_roasteruser_id = this.roles[0].id;
        console.log(this.role_roasteruser_id)
      }
    );
  }

  // Function Name : open bottom sheet
  // Description: This function helps to open bottom sheeet in mobile view.

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  // Function Name : Roles 
  // Description: This function helps to roles filiter in mobile view.

  openRoleBottomSheet() {
    var bottomSheetRef = this._bottomSheet.open(BottomSheetRoles);
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.termRole = this._sheetValues.roles;
      console.log(this.termRole)
    });
  }

  // Function Name : status
  // Description: This function helps to status filiter in mobile view.

  openStatusBottomSheet() {
    var bottomSheetRef = this._bottomSheet.open(BottomSheetStatus);

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.termStatus = this._sheetValues.status;
    });

    //bottomSheetRef.dismiss();
  }

  // Function Name : Status Filiter
  // Description: This function helps to filiter the users based on the selected status fiiter.

  setStatus(term: any) {
    this.termStatus = term;
    console.log(this.termStatus)
  }

  // Function Name : Roles Filiter
  // Description: This function helps to filiter the users based on the selected roles fiiter. 

  setRole(term: any) {
    this.termRole = term;
  }

  // Function Name : Delete user
  // Description: This function helps to delete the selected user.

  deleteRoasterUser(userID: any) {
    if (confirm("Please confirm! you want to delete?") == true) {

      this.roasterService.deleteRoasterUser(this.roaster_id, userID).subscribe(
        response => {
          console.log(response);
          if (response['success'] == true) {
			this.toastrService.success("User Deleted successfully!");
			this.userfilterDat=[];
            this.getRoasterUsers();
            // window.location.reload();
          }
          else {
            this.toastrService.error("Unable to delete the user.");

          }
        }
      )
    }
  }

  // Function Name : user Disable
  // Description: This function helps to disable the selected user.

  userDisable(disableId) {
    console.log("disable account id :" + disableId);
    if (confirm("Please confirm! you want to Disable Account?") == true) {
      this.roasterService.disableAdminUsers(this.roaster_id, disableId).subscribe(
        result => {
          if (result['success'] == true) {
			this.toastrService.success("Disabled User Account Successfully");
			this.userfilterDat=[];
            this.getRoasterUsers();
            // window.location.reload();
          }
          else {
            this.toastrService.error("Error while disabling the User account");
          }
        }
      )
    }
  }

  // Function Name : User Enable
  // Description: This function helps to Enable the selected user.

  userEnable(enableId) {
    console.log("Id of enabling account" + enableId);
    if (confirm("Please confirm! you want to Enable Account?") == true) {
      this.roasterService.enableAdminUser(this.roaster_id, enableId).subscribe(
        result => {
          if (result['success'] == true) {
			this.toastrService.success("Enabled User Account");
			this.userfilterDat=[];
            this.getRoasterUsers();
            // window.location.reload();
          }
          else {
            this.toastrService.error("Error while enabling the User account");
          }
        }
      )
    }
  }

  // Function Name : Roles delete
  // Description: This function helps to delete the selected user role.

  roleDeletionRoaster(roleID: any, userID: any) {
    if (confirm("Please confirm! you want to delete?") == true) {
      this.roasterService.deleteRoasterUserRole(this.roaster_id, roleID, userID).subscribe(
        res => {
          console.log(res);
          if (res['success'] == true) {
            this.toastrService.success("User Role Deleted successfully!");
            $("#" + roleID + "_" + userID).hide();
            // this.loadUsers();
            // window.location.reload();

          } else {
            this.toastrService.error("Unable to delete the role. ");
          }
        }
      );
    }
  }

  // Function Name : Edit Member
  // Description: This function helps to redirect to edit member page with user id as route params
  editMember(size: any) {
    this.userID = size;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "userID": encodeURIComponent(this.userID),
      }
    }

    this.router.navigate(['/people/add-members'], navigationExtras);
  }

  // Function Name : Submit Role
  // Description: This function helps to assign new role to particular user. 

  SubmitRole() {
    this.assignButtonValue = "Submitting";
    console.log(this.role_roasteruser_id, this.modalUserRoasterId);
    this.roasterService.assignUserBasedUserRoles(this.roaster_id, this.role_roasteruser_id, this.modalUserRoasterId).subscribe(
      res => {
        console.log(res);
        if (res['success'] == true) {
          this.assignButtonValue = "Submit";
          this.toastrService.success("User Role Assigned Successfully!");
		  this.modalRef.hide();
		  this.userfilterDat=[];
          this.getRoasterUsers();
        //   window.location.reload();

        } else {
          this.toastrService.error("User Role Already exists.Please select another role");
        }
        this.assignButtonValue = "Submit";
      })
  }

    // Function Name : Make Admin
  // Description: This function helps to assign admin to the selected User. 
  makeAdmin(userID:any){
    console.log(this.role_roasteruser_id);
    this.roasterService.getUserBasedRoles(this.roaster_id,userID).subscribe(
      userRoles => {
        if (userRoles['success'] == true) {
          var userbasedRoles = userRoles['result'];
          for(let i =0;i< userbasedRoles.length;i++){
            if(userbasedRoles[i].name == "support-admins"){
              console.log("Make admin name if: ",userbasedRoles[i].name );
              this.toastrService.error("Already an Admin.");
              break;
            }else{
              console.log("Make admin id else : ",this.role_roasteruser_id);
              this.roasterService.assignUserBasedUserRoles(this.roaster_id,this.role_roasteruser_id,userID).subscribe(
                data => {
                  if (data['success'] == true) {
                   this.toastrService.success("User has been made Admin Successfully!");
                   
                   setTimeout(()=> {
                     this.userfilterDat=[];
                    this.getRoasterUsers();
                   },5000)
                   
                  }
                  
                }
              )
            }
          }
        }
        
      }
    )
  }


}
