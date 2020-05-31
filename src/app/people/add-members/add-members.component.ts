import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
declare var $ :any;


@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  // member_name:any;
  // member_email :any;
  // memberFirstNameError : string;
  // memberEmailError : string;

  /********New API********/
  member_first_name :string;
  lang: string = '';
  member_last_name :string;
  timezone : string = '';
  member_email :string;
  member_password : string;
  member_confirm_password : string;
  memberFirstNameError : string;
  memberLastNameError : string;
  memberEmailError : string;
  memberPasswordError : string;
  memberConfirmPasswordError : string;
  languageError : string;
  timeZoneError : string;
  roaster_id : any;
  roles : any;
  role_id:any;

  userID : any;
  edit : boolean = true;
  editFlag : string = "add";
  loginButtonValue: any;
  emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  pwdFormat=  /^([a-zA-Z0-9@#$%^&+=*.\-_]){7,14}$/;

  roleData : any;
  termRole: any;
	roleID: string;
  loginButtonValueEdit: string;
  constructor(private router:Router , 
    public route : ActivatedRoute, 
    public roasterService : RoasterserviceService , 
    public cookieService : CookieService,
    public _userService:UserserviceService,
    public toastrService : ToastrService) { 
    this.roaster_id = this.cookieService.get('roaster_id');
    
    // this.termRole = 'Sales and Marketing';
  }

  ngOnInit(): void {
    // $(document).ready(function(){
    //   $('[data-toggle="popover"]').popover({
    //     html: true,
    //     content: function() {
    //       return $('#popover-content').html();
    //     }
    //   });
    // })
    this.loginButtonValue = "Add User";
    this.loginButtonValueEdit ="Update User"

    setTimeout(()=>{
      if(this.route.snapshot.queryParams['userID']){
           this.userID = decodeURIComponent(this.route.snapshot.queryParams['userID']);
           
         this.edit = false;
         this.editFlag = "edit";
         $("#member_email").attr('disabled','disabled');
         $("#member_email").addClass("disable");
           this._userService.getRoasterUserData(this.roaster_id,this.userID).subscribe(
             result => {
               if(result['success'] == true){ 
                 this.member_first_name = result['result'].firstname;
                 this.member_last_name = result['result'].lastname;
                 this.member_email = result['result'].email;
                 this.lang = result['result'].language;
                 this.timezone = result['result'].timezone; 
                 this.roasterService.getUserBasedRoles(this.roaster_id,this.userID).subscribe(
                     data => {
                       if(data['success']==true){
                         this.termRole = data['result'][0].name;
                         this.role_id = data['result'][0].id;
                       }
                       
                     }
                 )
                //  this.spinner.hide();
               }
            
             }
           );
     } },500);
/*new password starts */

$("input#member_password").on("focus keyup", function () {
         
});
 
$("input#member_password").blur(function () {
         
});
$("input#member_password").on("focus keyup", function () {
        var score = 0;
        var a = $(this).val();
        var desc = new Array();
 
        // strength desc
        desc[0] = "Too short";
    desc[1] = "Weak";
    desc[2] = "Good";
    desc[3] = "Strong";
    desc[4] = "Best";
         
});
 
$("input#member_password").blur(function () {
 
});
$("input#member_password").on("focus keyup", function () {
        var score = 0;
        var a = $(this).val();
        var desc = new Array();
 
        // strength desc
        desc[0] = "Too short";
        desc[1] = "Weak";
        desc[2] = "Good";
        desc[3] = "Strong";
        desc[4] = "Best";
         
        // password length
        if (a.length >= 6) {
            $("#length").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#length").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 digit in password
        if (a.match(/\d/)) {
            $("#pnum").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#pnum").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 capital & lower letter in password
        if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
            $("#capital").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#capital").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 special character in password {
        if ( a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) {
                $("#spchar").removeClass("invalid").addClass("valid");
                score++;
        } else {
                $("#spchar").removeClass("valid").addClass("invalid");
        }
 
 
        if(a.length > 0) {
                //show strength text
                $("#passwordDescription").text(desc[score]);
                // show indicator
                $("#passwordStrength").removeClass().addClass("strength"+score);
        } else {
                $("#passwordDescription").text("Password not entered");
                $("#passwordStrength").removeClass().addClass("strength"+score);
        }
});
 
$("input#member_password").blur(function () {
 
});
$("input#member_password").on("focus keyup", function () {
        var score = 0;
        var a = $(this).val();
        var desc = new Array();
 
        // strength desc
        desc[0] = "Too short";
        desc[1] = "Weak";
        desc[2] = "Good";
        desc[3] = "Strong";
        desc[4] = "Best";
 
        $("#pwd_strength_wrap").fadeIn(400);
         
        // password length
        if (a.length >= 6) {
            $("#length").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#length").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 digit in password
        if (a.match(/\d/)) {
            $("#pnum").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#pnum").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 capital & lower letter in password
        if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
            $("#capital").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#capital").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 special character in password {
        if ( a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) {
                $("#spchar").removeClass("invalid").addClass("valid");
                score++;
        } else {
                $("#spchar").removeClass("valid").addClass("invalid");
        }
 
 
        if(a.length > 0) {
                //show strength text
                $("#passwordDescription").text(desc[score]);
                // show indicator
                $("#passwordStrength").removeClass().addClass("strength"+score);
        } else {
                $("#passwordDescription").text("Password not entered");
                $("#passwordStrength").removeClass().addClass("strength"+score);
        }
});
 
$("input#member_password").blur(function () {
        $("#pwd_strength_wrap").fadeOut(400);
});
/*member_password Ends */




    this.memberFirstNameError='';
      this.memberEmailError='';
      this.listRoles();
      // if(this.route.snapshot.queryParams['roleData']){
      // this.roleData = decodeURIComponent(this.route.snapshot.queryParams['roleData']);
      // console.log("role data from role list : ",this.roleData)
      // this.setRole(this.roleData);
      // }
      // else{
      //   this.roleData = this.termRole;
      // }

  }

  onKeyPress(event:any)
    {
      if(event.target.value == "") {
        document.getElementById(event.target.id).style.border= "1px solid #FD4545";
      } else {
        document.getElementById(event.target.id).style.border= "1px solid #E8E8E8";
      }
    }
listRoles(){
  this.roasterService.getRoles(this.roaster_id).subscribe(
    response => {
      this.roles = response['result'];
		this.termRole = this.roles[0].name;
		this.role_id=this.roles[0].id;
        if(this.route.snapshot.queryParams['roleData'] && this.route.snapshot.queryParams['roleID']){
		  this.roleData = decodeURIComponent(this.route.snapshot.queryParams['roleData']);
		  this.roleID = decodeURIComponent(this.route.snapshot.queryParams['roleID']);
          console.log("Data : ",this.roleData);
		  this.termRole = this.roleData;
		  this.role_id = this.roleID;
          }
      
      // this.termRole = this.roles[0].name;
    }
  )
}
    // sendInvites(){
    //   if(this.member_name == "" || this.member_name == null || this.member_name == undefined){
    //     this.memberFirstNameError="Please enter your member name";
    //     document.getElementById('memberName').style.border="1px solid #FD4545";
    //     setTimeout(() => {
    //       this.memberFirstNameError="";
    //     },3000);
    //     }
    //   else if(this.member_email == "" || this.member_email == null || this.member_email == undefined){
    //   this.memberEmailError="Please enter your member email";
    //   document.getElementById('memberEmail').style.border="1px solid #FD4545";
    //   setTimeout(() => {
    //     this.memberEmailError="";
    //   },3000);
    //   }
    //   else if(!(this.member_email.match(this.emailFormat))){
    //     this.memberEmailError="Please enter valid email address";
    //     document.getElementById('memberEmail').style.border="1px solid #FD4545";
    //     setTimeout(() => {
    //       this.memberEmailError="";
    //     },3000);
    //   }
    //   else{
    //     this.router.navigate(["people/manage-role"]);
    //   }
    // }
    sendInvites(){
      if(this.member_first_name == "" || this.member_first_name == null || this.member_first_name == undefined){
        this.memberFirstNameError="Please enter your member name";
        document.getElementById('member_first_name').style.border="1px solid #FD4545";
        setTimeout(() => {
          this.memberFirstNameError="";
        },4000);
        }
        else if(this.lang == "" || this.lang == null || this.lang == undefined){
          this.languageError="Please Select your Language";
          document.getElementById('lang').style.border="1px solid #FD4545";
          setTimeout(() => {
            this.languageError="";
          },4000);
          }
        else if(this.member_last_name == "" || this.member_last_name == null || this.member_last_name == undefined){
          this.memberLastNameError="Please enter your member name";
          document.getElementById('member_last_name').style.border="1px solid #FD4545";
          setTimeout(() => {
            this.memberLastNameError="";
          },4000);
          }
          else if(this.timezone == "" || this.timezone == null || this.timezone == undefined){
            this.timeZoneError="Please Select your Timezone";
            document.getElementById('timezone').style.border="1px solid #FD4545";
            setTimeout(() => {
              this.timeZoneError="";
            },4000);
            }
      else if(this.member_email == "" || this.member_email == null || this.member_email == undefined){
      this.memberEmailError="Please enter your member email";
      document.getElementById('member_email').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.memberEmailError="";
      },4000);
      }
      else if(!(this.member_email.match(this.emailFormat))){
        this.memberEmailError="Please enter valid email address";
        document.getElementById('member_email').style.border="1px solid #FD4545";
        setTimeout(() => {
          this.memberEmailError="";
        },4000);
      }
      else if( (this.member_password == "" || this.member_password == null || this.member_password == undefined) && this.editFlag == "add"){
        this.memberPasswordError="Please enter your member Password";
        document.getElementById('member_password').style.border="1px solid #FD4545";
        setTimeout(() => {
          this.memberPasswordError="";
        },4000);
        }
        else if( this.editFlag == "add" && !(this.member_password.match(this.pwdFormat))){
          this.memberPasswordError="Password should be between of 8 to 15 characters";
          document.getElementById('member_password').style.border="1px solid #FD4545";
          setTimeout(() => {
            this.memberPasswordError="";
          },4000);
        }
        else if((this.member_confirm_password == "" || this.member_confirm_password == null || this.member_confirm_password == undefined) && this.editFlag == "add"){
          this.memberConfirmPasswordError="Please enter your password again";
          document.getElementById('member_confirm_password').style.border="1px solid #FD4545";
          setTimeout(() => {
            this.memberConfirmPasswordError="";
          },2000);
          }else if(this.editFlag == "add" && this.member_confirm_password != this.member_password){
            this.memberConfirmPasswordError="Password is not matched";
            document.getElementById('confirmPassword').style.border="1px solid #FD4545";
            setTimeout(() => {
              this.memberConfirmPasswordError="";
            },2000);
          }else{
            this.loginButtonValue = "adding";
		var data = {
			'firstname' : this.member_first_name,
			'lastname' : this.member_last_name,
			'email' : this.member_email,
			'password' : this.member_password,
			'confirm_password' : this.member_confirm_password,
			"timezone" : this.timezone,
			"language" : this.lang
      };
      if(this.editFlag == "add"){
		  this._userService.addUserRoaster(data).subscribe(
			  result=>{
				  console.log(result);
				  if(result['success'] == true){
            this.loginButtonValue = "Add User";
					  console.log(result);
					  this.toastrService.success("User has been created and We are assigning role to new user");
					  this.roasterService.assignUserBasedUserRoles(this.roaster_id,this.role_id,result['result']['user_id']).subscribe(
						  data=>{
							  console.log("role isssssssss",JSON.stringify(data));
							if(data['success'] == true){
								this.toastrService.success("Role has been assgined to " + this.member_first_name + " " + this.member_last_name);
								this.router.navigate(['/people/user-management']);
							  }
						  }
					  )

				  }
				  else {
					if(result['messages']['email'] !== undefined){
					  this.toastrService.error("Error: Email Already Exists");
					} if(result['messages']['password'] !== undefined){
					  this.toastrService.error("Error: Password did not meet our policies");
					} else {
					  this.toastrService.error("There is something went wrong! Please try again later");
					}
          }
          this.loginButtonValue = "Add User";
			  }
		  );
      }else{
        this.loginButtonValue = "Updating";
        var update_data = {
          'firstname' : this.member_first_name,
          'lastname' : this.member_last_name,
          'email' : this.member_email,
          "timezone" : this.timezone,
          "language" : this.lang
        };
        this._userService.updateUserData(update_data,this.roaster_id,this.userID).subscribe(
          data =>{
            console.log("data coming from edit api: "+ JSON.stringify(data))
            if(data['success'] == true){
              this.loginButtonValue = "Update User";
              console.log("User Updated Successfully :");
              console.log(data['result']);
              this.toastrService.success("User has been updated and We are assigning role to the user");
              console.log("the role of the selected user : "+ this.role_id);

              this.roasterService.assignUserBasedUserRoles(this.roaster_id,this.role_id, this.userID).subscribe(
                response => {
                  console.log(response);
                  if(response['success'] == true){

                    this.toastrService.success("Role has been assgined to " + this.member_first_name + " " + this.member_last_name);
                    this.router.navigate(['/people/user-management']);
                  }
                  else{
                    this.toastrService.error("Role has already exists, Please Change the role");
                  }
                }
              );
            }
            else {
              if(data['messages']['user_id'] === "not_found"){
                this.toastrService.error("Error: User Id is not existed");
              } if(data['messages']['user_id'] === "no_role_in_app"){
                this.toastrService.error("Error: User Id has no role");
              } else {
                this.toastrService.error("There is something went wrong! Please try again later");
              }
            }
            this.loginButtonValue = "Updating";
          }
        )
      }

    }

    }


    setRole(term:any,roleId:any){
	  this.termRole = term;
	  this.role_id=roleId;
    }

}
