import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {GlobalsService} from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.css']
})
export class InviteMemberComponent implements OnInit {
  teamRole: any;
  role_id: any;
  roles: any;
  roaster_id: any;
  add_member_name:any;
  add_member_email:any;
  appLanguage?: any;
  inviteActive:any=0;
  roleData: string;
  roleID: string;
  emailError : string;
  nameError  :string;
  password: string = 'Ro@Sewn1234';
 
  addUser = [
    {
      firstname : '',
      lastname : '',
      email : '',
      password: this.password,
      confirm_password : this.password,
      timezone : "",
      language : ""
    }
  ]
  constructor(public roasterService:RoasterserviceService,
    public cookieService: CookieService,private router: Router, 
       private globals: GlobalsService,
       public route : ActivatedRoute,
       public userService : UserserviceService,
       private toastrService : ToastrService
    ) {
    this.roaster_id = this.cookieService.get('roaster_id');
   }

  ngOnInit(): void {
    //Auth checking
	if (this.cookieService.get("Auth") == "") {
    this.router.navigate(["/auth/login"]);
    }
    this.emailError = "";
    this.nameError = "";
    this.listRoles();
    this.language();


     /*Onboarding start*/
    //  $('body').on('click', '.add-partner', function () {

    //   var NewRow = `<div class="new-row position-relative">
		// 	<div class="row">
			
    //   <div class="col-12 col-md-6 Onboard-input">
    //       <label for="add_member_name">Name<span class="star">*</span></label>
    //       <input class="form-control rectangle_username" id="add_member_name" placeholder="Enter your Full Name" [(ngModel)]="add_member_name" name="add_member_name" type="text" />
    //   </div>

    //   <div class="col-12 col-md-6 Onboard-input">
    //       <label for="add_member_email">Enter work Email Address<span class="star">*</span></label>
    //       <input class="form-control rectangle_useremail" type="email" id="add_member_email" placeholder="you@example.com" [(ngModel)]="add_member_email[" name="add_member_email" />
    //   </div>
    //     <span class="member-delete-rows fnt-muli fnt-700 txt-clr60b">
		// 		Delete row
		// 	</span>
		// 	</div>
		
		// </div>`
    //   $(this).parents('.Onboard-memberinvite').find('.Onboard-memberinvite__inputs:last').append(NewRow);
    // });

    // $('body').on('click', '.member-delete-rows', function () {


    //   $(this).parents('.new-row').remove();
    // });
    /*Onboarding end */


  }
  language(){
    this.appLanguage = this.globals.languageJson;
    this.inviteActive++;
  }

  public addNewRow(){
      this.addUser.push({ firstname : '',
      lastname : '',
      email : '',
      password: this.password,
      confirm_password : this.password,
      timezone : "",
      language : ""});
  }

  public deleteRow( index){
      this.addUser.splice(index, 1);
    }

    private validateInput(data){
      // const email_variable = data[0].email;
      let flag = true;
      if (data && data.length){
        data.forEach( ele => {
          if (ele.firstname === '' || ele.email === '' ){
            flag = false;
          }
        });
      }
      return flag;
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

		// this.termRole = this.roles[0].name;
		this.inviteActive++;
      }
    )
  }

  setTeamRole(term: any, roleId: any) {
    this.teamRole = term;
    this.role_id = roleId;
  }


  public sendInvites(){
    let flag = true;
    var input = this.addUser;
  console.log(input);
    flag = this.validateInput(input);
  
    if (flag){
      this.addUser.forEach(element => {
      this.userService.addUserRoaster(element).subscribe(
        data => {
          if(data['success'] == true){
            this.toastrService.success("New Roaster details Fetched and assigning role to new user.");
            this.roasterService.assignUserBasedUserRoles(this.roaster_id, this.role_id, data['result']['user_id']).subscribe(
              data => {
                if (data['success'] == true) {
                  this.toastrService.success("Role has been assgined to " + element.firstname );
                  
                    var body = {
                      "portal" : "RO",
                      "content_type" : "invite_with_password",
                      "data":[
                        {
                            "email":element.email,
                            "password":element.password,
                            "name" : element.firstname,
                            "url" : "https://qa-roaster-portal.sewnstaging.com",
                        }
                        ]
                    };
                    this.userService.sendUrlToEmail(body).subscribe(
                      res => {
                        if(res['status'] == "200 OK"){
                          this.toastrService.success("Email has been sent successfully");
                        }
                        else{
                          
                          this.toastrService.error("Error while sending email to the User");
                        }
                      }
                    )
                
                
             
                }else{
                  this.toastrService.error("Error while assigning role");
                }
              }
            )
          }else{
            if (data['messages']['email'] !== undefined) {
              this.toastrService.error("Error: Email Already Exists");
            } else if (data['messages']['password'] !== undefined) {
              this.toastrService.error("Error: Password did not meet our policies");
            } else {
              this.toastrService.error("There is something went wrong! Please try again later");
            }
          }
        }
      )
    });

    // this.addUser = [
    //   {
    //     firstname : '',
    //     lastname : '',
    //     email : '',
    //     password: this.password,
    //     confirm_password : this.password,
    //     timezone : "",
    //     language : ""
    //   }
    // ]
    } else {
      this.toastrService.error('Fields should not be empty.');
    }
  }
  // sendInvites(){
  //   if (this.add_member_name == "" || this.add_member_name == null || this.add_member_name == undefined) {
  //     this.nameError = "Please enter the member name";
  //     document.getElementById('add_member_name').style.border = "1px solid #D50000";
  //     setTimeout(() => {
  //       this.nameError = "";
  //     }, 4000);
  //   }
  //   else if (this.add_member_email == "" || this.add_member_email == null || this.add_member_email == undefined) {
  //     this.emailError = "Please enter the member email";
  //     document.getElementById('add_member_email').style.border = "1px solid #D50000";
  //     setTimeout(() => {
  //       this.emailError = "";
  //     }, 4000);
  //   }else{
  //     var val = Math.floor(1000 + Math.random() * 9000);
  //     this.password = "Ro@Sewn" + val.toString();
  //     var data = {
  //       'firstname': this.add_member_name,
  //       'lastname': '',
  //       'email': this.add_member_email,
  //       'password': this.password,
  //       'confirm_password': this.password,
  //       "timezone": "",
  //       "language": ""
  //     };
  //     this.userService.addUserRoaster(data).subscribe(
  //       data => {
  //         if(data['success'] == true){
  //           this.toastrService.success("New Roaster details Fetched and assigning role to new user.");
  //           this.roasterService.assignUserBasedUserRoles(this.roaster_id, this.role_id, data['result']['user_id']).subscribe(
  //             data => {
  //               if (data['success'] == true) {
  //                 this.toastrService.success("Role has been assgined to " + this.add_member_name );
  //                 var body = {
  //                   "portal" : "RO",
  //                   "content_type" : "invite_with_password",
  //                   "data":[
  //                     {
  //                         "email":this.add_member_email,
  //                         "password":this.password,
  //                         "name" : this.add_member_name
  //                     }
  //                     ]
  //                 };
  //                 this.userService.sendUrlToEmail(body).subscribe(
  //                   res => {
  //                     if(res['status'] == "200 OK"){
  //                       this.toastrService.success("Email has been sent successfully");
  //                     }
  //                     else{
                        
  //                       this.toastrService.error("Error while sending email to the User");
  //                     }
  //                   }
  //                 )
  //               }else{
  //                 this.toastrService.error("Error while assigning role");
  //               }
  //             }
  //           )
  //         }else{
  //           if (data['messages']['email'] !== undefined) {
  //             this.toastrService.error("Error: Email Already Exists");
  //           } else if (data['messages']['password'] !== undefined) {
  //             this.toastrService.error("Error: Password did not meet our policies");
  //           } else {
  //             this.toastrService.error("There is something went wrong! Please try again later");
  //           }
  //         }
  //       }
  //     )
  //   }
  // }
}
