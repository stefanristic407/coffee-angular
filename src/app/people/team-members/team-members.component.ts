import { Component, OnInit, TemplateRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {GlobalsService} from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  termRole: any;
  roaster_id: string;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole:any;
  showVar: boolean = true;
  showRole:boolean = true;
  term:any;
  appLanguage?: any;
  teamActive:any = 0;
  roleData: string;
  roleID: string;
  userfilterDat: any = [];
  loginValue: any;
  deleteUserId: any;
  modalRef: BsModalRef;
  loginId: string;
  checkCondition: any;
  showAssignBtn:boolean = false;

  
  constructor(public roasterService:RoasterserviceService,
    public cookieService: CookieService,
    private router: Router,
    public route: ActivatedRoute,
    public globals: GlobalsService,
    private toastrService : ToastrService,
    private userService : UserserviceService,
    private modalService: BsModalService,) { 
    this.roaster_id = this.cookieService.get('roaster_id');
    this.termStatus = '';
    this.termRole = '';
  
	this.loginId = this.cookieService.get('user_id');
  }

  openDeleteModal(template1:TemplateRef<any>,deleteId:any){
    this.modalRef = this.modalService.show(template1);
    this.deleteUserId = deleteId;
    }

  ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }
      this.listRoles();
      this.language();
      this.getRoasterUsers();
         // console.log(this.globals.permissions['user-management']);
	if(!this.globals.permissions['user-management']){
		this.router.navigate(["/people/permission-error"]);
  }
  }

  
  listRoles() {
    this.roasterService.getRoles(this.roaster_id).subscribe(
      response => {
        this.roles = response['result'];
        this.teamRole = this.roles[0].name;
        this.role_id = this.roles[0].id;
        if (this.route.snapshot.queryParams['roleData'] && this.route.snapshot.queryParams['roleID']) {
          this.roleData = decodeURIComponent(this.route.snapshot.queryParams['roleData']);
          this.roleID = decodeURIComponent(this.route.snapshot.queryParams['roleID']);
          console.log("Data : ", this.roleData);
          this.teamRole = this.roleData;
          this.role_id = this.roleID;
        }
		// this.teamRole = this.roles[0].name;
		this.teamActive++;
      }
    )
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
            console.log(tempData)
            this.userfilterDat.push(tempData)
          });
        //   this.userActive++;          
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

  // assignTheRole(){

  // }

  language(){
    this.appLanguage = this.globals.languageJson;
    this.teamActive++;
  }
  
  setTeamRole(term: any, roleId: any) {
    this.teamRole = term;
    this.role_id = roleId;
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
  toggleRole() {
    this.showRole = !this.showRole;
    if(this.showRole==false){
      document.getElementById('role_id').style.border="1px solid #30855c";
    }
    else{
      document.getElementById('role_id').style.border="1px solid #d6d6d6";
    
    }
   }
  
   toggleStatus() {
    this.showVar = !this.showVar;
    if(this.showVar==false){
    document.getElementById('status_id').style.border="1px solid #30855c";
  }
  else{
    document.getElementById('status_id').style.border="1px solid #d6d6d6";
  
  }
  }
  // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    this.userfilterDat.forEach(x => {x.state = ev.target.checked
      console.log(x.state);
    })
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    return this.userfilterDat.every(_ => _.state);
  } 

  inviteNewMembers() {
    console.log(this.roleData)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "roleData": encodeURIComponent(this.roleData),
        "roleID": encodeURIComponent(this.roleID)
      }
    }
    this.router.navigate(['/people/invite-member'], navigationExtras);
  }

  checkedValue(ev : any, user_id : any){
    this.checkCondition = ev.target.checked;
    const getCheckValue = this.userfilterDat.filter(ele => ele['state'] == true);
    this.showAssignBtn = getCheckValue && getCheckValue.length > 0 ? true : false;
  }

  assignUsersToRole(){
    let selectedUserID = this.userfilterDat.find(ele => ele['state'] == true);    
    this.roasterService.assignUserBasedUserRoles(this.roaster_id, this.roleID, selectedUserID['id'], ).subscribe(
      res => {
        console.log(res);
        if (res['success'] == true) {
          this.toastrService.success("User Role Assigned Successfully!");
		      this.userfilterDat=[];
          this.getRoasterUsers();
        } else {
          this.toastrService.error("User Role Already exists.Please select another role");
        }        
      }, err=>{
        console.log(err); 
      });
  }

   // Function Name : Delete user
  // Description: This function helps to delete the selected user.

  deleteRoasterUser(userID: any) {
    // if (confirm("Please confirm! you want to delete?") == true) {

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
          // this.userActive++;
        }
      )
    // }
  }
}
