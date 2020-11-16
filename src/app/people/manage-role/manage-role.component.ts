// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Manage a Role.

import { Component, OnInit, TemplateRef } from '@angular/core';
declare var $: any;
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import {GlobalsService} from 'src/services/globals.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})

export class ManageRoleComponent implements OnInit {
  roleData: any;
  roaster_id: any;
  role_id: any;
  sizes: any[] = [];
  roleID: any;
  roasterUsers: any[] = [];
  userRoles: any[] = [];
  appLanguage?: any;
  roleActive:any=0;
  displayModal: boolean;
  modalRef: BsModalRef;
	deleteroleId: any;

  constructor(
    public router: Router,
    private roasterService: RoasterserviceService,
    private cookieService: CookieService,
    private toastrService: ToastrService,
    public globals: GlobalsService,
    private modalService: BsModalService
  ) { 
    // this.isActive = 0;
  }

  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    if(!this.globals.checkItem('acl-management') && !this.globals.checkItem('acl-list')){
      this.router.navigate(["/people/permission-error"]);
    }
    $(document).ready(function () {
      $('input[type="checkbox"]').click(function () {
        var inputValue = $(this).attr("value");
        $("." + inputValue).toggle();
      });
    });
    this.sizes = [];
    this.roaster_id = this.cookieService.get('roaster_id');
    this.loadroles();

    this.language();
  }
language(){
  this.appLanguage = this.globals.languageJson;
  this.roleActive++;

}
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
openDeleteModal(template1:TemplateRef<any>,deleteId:any){
	this.modalRef = this.modalService.show(template1);
	this.deleteroleId = deleteId;
}
  // getRandomInt(max: any) {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }


  // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    this.sizes.forEach(x => x.state = ev.target.checked)
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    return this.sizes.every(_ => _.state);
  }

  // Function Name : Roles
  // Description: This function helps to get the all Roles of the user. 
  loadroles() {
    var roasterServices = this.roasterService;
    var roasterId = this.roaster_id;
    console.log(roasterId);
    //var userRoles = [];
    roasterServices.getRoles(roasterId).subscribe(
      result => {

        console.log(result);
        if (result["success"] == true) {
          var list = result['result'];
          for (var i = 0; i < list.length; i++) {
            this.userRoles[list[i]['name']] = 0;
          }
          for (var i = 0; i < list.length; i++) {
            list[i]['team_size'] = this.userRoles[list[i]['name']];
            this.sizes[i] = list[i];
          }
        }
        this.roleActive++;
      }
    );
    // this.getRoleCount(this.roaster_id);
  }

  // getRoleCount(roasterId: any) {
  //   this.roasterService.getRoasterUsers(roasterId).subscribe(
  //     roasterUsers => {
  //       roasterUsers['result'].forEach(element => {
  //         var userId = element['id'];
  //         this.roasterService.getUserBasedRoles(roasterId, userId).subscribe(
  //           userRoleDetails => {
  //             for (var j = 0; j < userRoleDetails['result'].length; j++) {
  //               this.userRoles[userRoleDetails['result'][j]['name']]++;
  //             }
  //           }
  //         );
  //       });
  //     }
  //   );
  //   console.log(this.userRoles);
  // }

  // Function Name : Delete Role
  // Description: This function helps to Delete the role of the user. 
  deleteRole(id: any) {
    // if (confirm("Please confirm! you want to delete?") == true) {
      this.roasterService.deleteRoles(this.roaster_id, id).subscribe(
        data => {
          if (data['success'] == true) {
            this.toastrService.success("Roles deleted successfully!");
            $('#tr_' + id).hide();
            $('body').trigger('click');
          } else {
            this.toastrService.error("There are Users assigned to this role.");
          }
        }
    );
    // }
  }


  // Function Name : Update Role
  // Description: This function helps to update the role permissions of the user. 
  updateRole(id: any) {
    this.router.navigate(["/people/create-role", id]);

  }
  // Function Name : Add  Member
  // Description: This function helps to redirect to the add member page with selected role.
  addMembers(event, data: any) {
    this.roleData = data.name;
    this.roleID = data.id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "roleData": encodeURIComponent(this.roleData),
        "roleID": encodeURIComponent(this.roleID)

      }
    }
    this.router.navigate(['/people/team-members'], navigationExtras);
  }

  // Function Name : View Member
  // Description: This function helps to redirect to the user management page with selected role.
  viewMembers(data: any) {
    this.roleData = data.name;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "roleData": encodeURIComponent(this.roleData),
      }
    }
    this.router.navigate(['/people/user-management'], navigationExtras);
  }

  members() {
    this.router.navigate(["/people/team-members"]);
  }

   // Function Name : Help
  // Description: This function helps to show the Help modal - info regarding the page 
  	showModalDialog() {
    	this.displayModal = true;
	}


}
