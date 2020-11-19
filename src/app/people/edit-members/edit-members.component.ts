// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Edit Member.

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { GlobalsService } from "src/services/globals.service";
import { RoasterserviceService } from "src/services/roasters/roasterservice.service";
import { UserserviceService } from "src/services/users/userservice.service";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: "app-edit-members",
  templateUrl: "./edit-members.component.html",
  styleUrls: ["./edit-members.component.css"],
})
export class EditMembersComponent implements OnInit {
  member_name: string;
  member_email: string;
  member_role: string = "";
  memberNameError: string;
  memberEmailError: string;
  memberRoleError: string;
  appLanguage?: any;
  emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  editActive: any = 0;
  savemode: boolean = false;
  editmode: boolean = true;
  activeFlag: boolean = true;
  roaster_id: string;
  userId: string;
  status: any;
  resetButtonValue: string = "Send";
  assignedRoles: any;
  created_at: any;
  btnToggle = true;
  statusChange: string;
  roles = [
    {
      name : ''
    }
  ]

  addBtn : boolean = true;
  assignRow : boolean = false;
  RoasterRoles: any;
  selected_role : any = "";
  showDelete : boolean = false;
  roleValue: number;
  assignButtonValue : string = "Assign";
  saveButtonValue : string = "Save";

  constructor(
    private router: Router,
    private cookieService: CookieService,
    public globals: GlobalsService,
    private userService: UserserviceService,
    private roasterService: RoasterserviceService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    this.roaster_id = this.cookieService.get("roaster_id");
    if (this.route.snapshot.queryParams["userID"] != undefined) {
      this.userId = decodeURIComponent(
        this.route.snapshot.queryParams["userID"]
      );
      console.log("Data : ", this.userId);
    } else {
      this.toastrService.error("Error in getting the user Id");
      this.router.navigate(["/people/user-management"]);
    }
  }

  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    this.language();

    this.memberNameError = "";
    this.memberEmailError = "";
    this.memberRoleError = "";

    /*Edit start*/
    // $("body").on("click", ".add-partner", function () {
    //   var NewRow = `<div class="new-row position-relative mt-3">
		// 	<div class="row mt-3">
		// 		<div class="col-12 col-md-6">
		// 			<select id="member_role" class="form-control rectangle_editdropdowns"  [(ngModel)]="member_role" name="status">
		// 				<option value="" selected disabled>Select role</option>
		// 				<option value="sales">Sales & marketing</option>
		// 				<option value="Active">Marketing</option>
		// 				<option value="Disabled">Manager</option>
		// 			</select>
    //     </div>
    //     <div class="col-12 col-md-6">
    //     <button type="submit" class="assign_member_role save">Assign</button>
    //     </div>
		// 	</div>`;
    //   $(this)
    //     .parents(".Onboard-rows")
    //     .find(".Onboard-rows__inputs:last")
    //     .append(NewRow);
    // });

    // $("body").on("click", ".delete-rows", function () {
    //   $(this).parents(".new-row").remove();
    // });
    /*Edit end */

    this.getUserData();
    this.listRoles();
  }

  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border =
        "1px solid #FD4545";
    } else {
      document.getElementById(event.target.id).style.border =
        "1px solid #E8E8E8";
    }
  }
  language() {
    this.appLanguage = this.globals.languageJson;
    this.editActive++;
  }
  showAssignRole(){
    this.addBtn = false;
    this.assignRow = true;
    this.showDelete = true;
  }
  getUserData() {
    this.userService
      .getRoasterUserData(this.roaster_id, this.userId)
      .subscribe((result) => {
        console.log(result["result"]);
        this.member_name = `${result["result"].firstname}  ${result["result"].lastname}`;
        this.member_email = result["result"].email;
        this.status = result["result"].status;
        this.created_at = result["result"].created_at;
        this.btnToggle = this.status == "ACTIVE" ? true : false;
        console.log(
          `${this.member_name} has ${this.member_email} is ${this.status}`
        );
        this.listAssignedRoles();
 
      });
  }


  sendMail() {
    this.resetButtonValue = "Sending";
    var body = {
      name: this.member_name,
      portal: "Roaster",
      content_type: "invite_with_url",
      senders: [this.member_email],
      url: "https://qa-roaster-portal.sewnstaging.com/#/auth/update-password",
    };
    this.userService.sendUrlToEmail(body).subscribe((res) => {
      if (res["status"] == "200 OK") {
        this.resetButtonValue = "Send";
        this.toastrService.success("Email has been sent successfully");
      } else {
        this.resetButtonValue = "Send";
        this.toastrService.error("Error while sending email to the User");
      }
    });
  }

  listAssignedRoles(){
    this.roasterService
    .getUserBasedRoles(this.roaster_id, this.userId)
    .subscribe((response) => {
      if (response["success"] == true) {
        this.roles = response["result"];
        console.log(this.roles)
      } else {
        this.toastrService.error(
          "Error while getting the roles of the user."
        );
      }
    });
  }

  AssignRole() {
    this.assignButtonValue = "Assigning"
    this.roleValue = (parseInt(this.selected_role))
    this.roasterService
      .assignUserBasedUserRoles(this.roaster_id, this.roleValue, this.userId)
      .subscribe((result) => {
        if (result["success"] == true) {
          this.assignButtonValue = "Assign"
          this.toastrService.success("Role has been assigned to the user.");
          this.listAssignedRoles();
          this.selected_role = "";
          this.assignRow = false;
          this.addBtn = true;
          this.showDelete = true;
        } else {
          this.assignButtonValue = "Assign"
          this.toastrService.error("Error while assigning the role");
        }
      });
  }

  listRoles() {
    this.roasterService
      .getRoles(this.roaster_id)
      .subscribe((response) => {
        if (response["success"] == true) {
          this.RoasterRoles = response["result"];
        } else {
          this.toastrService.error(
            "Error while getting the roles of the user."
          );
        }
      });
  }
  saveMember() {
    this.saveButtonValue = "Saving";
    console.log(this.status)
    if (this.member_name == "" || this.member_email == "") {
      this.memberNameError = "Please enter your member name";
      this.memberEmailError = " Please enter your member email";
      document.getElementById("member_name").style.border = "1px solid #FD4545";
      document.getElementById("member_email").style.border =
        "1px solid #FD4545";
      setTimeout(() => {
        this.memberNameError = "";
        this.memberEmailError = "";
      }, 4000);
    } else {
      console.log(this.status);
      const data = {
        firstname: this.member_name,
        lastname: "",
        email: this.member_email,
      };
      this.userService
        .updateUserData(data, this.roaster_id, this.userId)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.toastrService.success("Roaster details successfully updated.");
            if(this.statusChange != this.status){
            if (this.statusChange == "ACTIVE") {
              this.roasterService
                .enableAdminUser(this.roaster_id, this.userId)
                .subscribe((value) => {
                  if (value["success"] == true) {
                    this.toastrService.success("User has been enabled");
                  } else {
                    this.toastrService.error("Error while enabling the user");
                  }
                });
            } else if (this.statusChange == "INACTIVE") {
              this.roasterService
                .disableAdminUsers(this.roaster_id, this.userId)
                .subscribe((value) => {
                  if (value["success"] == true) {
                    this.toastrService.success("User has been disabled");
                  } else {
                    this.toastrService.error("Error while disabling the user");
                  }
                });
            }
          }
            this.savemode = false;
            this.editmode = true;
            this.showDelete = false;
          } else {
            this.toastrService.error("Error while saving the roaster data!");
          }
        });
        this.saveButtonValue = "Save"
    }
  }
  activeStatus() {
    this.btnToggle = !this.btnToggle;
    if(this.btnToggle == true){
      this.statusChange = "ACTIVE";
      console.log(this.statusChange)
    }
    else{
      this.statusChange = "INACTIVE";
      console.log(this.statusChange)
    }
  }


  editMember() {
    // this.contactInfo = false;
    // this.addMediaDiv = true;
    this.savemode = true;
    this.editmode = false;
  }

  removeRole(role_id : any){
    this.roasterService.deleteRoasterUserRole(this.roaster_id,role_id,this.userId).subscribe(
      data => {
        if(data['success'] == true ){
          this.toastrService.success("The selected role has been removed successfully");
          this.listAssignedRoles();
        }
        else{
this.toastrService.error("Error while deleting the role");
        }
      }
    )
  }

}
