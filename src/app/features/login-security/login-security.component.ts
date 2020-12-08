import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
declare var $: any;

@Component({
  selector: 'app-login-security',
  templateUrl: './login-security.component.html',
  styleUrls: ['./login-security.component.css']
})
export class LoginSecurityComponent implements OnInit {
  passwordData:any;
  display: boolean = false;
  modalRef: BsModalRef;
  appLanguage?: any;
  securityActive:any =0;
  sessions: any;

  constructor(
    private modalService: BsModalService,
    public globals : GlobalsService,
    private toastrService: ToastrService,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserserviceService
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.getUserSessions();
    // Function Name : Passowrd Indicator
    // Description: This function helps to indicate the entering meeting the newPassword policy.

    $("input#newPassword").on("focus keyup", function() {});

    $("input#newPassword").blur(function() {});
    $("input#newPassword").on("focus keyup", function() {
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

    $("input#newPassword").blur(function() {});
    $("input#newPassword").on("focus keyup", function() {
      var score = 0;
      var a = $(this).val();
      var desc = new Array();

      // strength desc
      desc[0] = "Too short";
      desc[1] = "Weak";
      desc[2] = "Good";
      desc[3] = "Strong";
      desc[4] = "Best";

      // newPassword length
      if (a.length >= 6) {
        $("#length")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#length")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 digit in newPassword
      if (a.match(/\d/)) {
        $("#pnum")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#pnum")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 capital & lower letter in newPassword
      if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
        $("#capital")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#capital")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 special character in newPassword {
      if (a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
        $("#spchar")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#spchar")
          .removeClass("valid")
          .addClass("invalid");
      }

      if (a.length > 0) {
        //show strength text
        $("#passwordDescription").text(desc[score]);
        // show indicator
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      } else {
        $("#passwordDescription").text("newPassword not entered");
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      }
    });

    $("input#newPassword").blur(function() {});
    $("input#newPassword").on("focus keyup", function() {
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

      // newPassword length
      if (a.length >= 6) {
        $("#length")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#length")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 digit in newPassword
      if (a.match(/\d/)) {
        $("#pnum")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#pnum")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 capital & lower letter in newPassword
      if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
        $("#capital")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#capital")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 special character in newPassword {
      if (a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
        $("#spchar")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#spchar")
          .removeClass("valid")
          .addClass("invalid");
      }

      if (a.length > 0) {
        //show strength text
        $("#passwordDescription").text(desc[score]);
        // show indicator
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      } else {
        $("#passwordDescription").text("newPassword not entered");
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      }
    });

    $("input#newPassword").blur(function() {
      $("#pwd_strength_wrap").fadeOut(400);
    });
    /*newPassword Ends */

    this.language();
  }
  language(){
    	this.appLanguage = this.globals.languageJson;
       this.securityActive++;
    }
  showDialog() {
    this.display = true;
  }
  async getUserSessions(){
    const res = await this.userService.getUserSessions().toPromise();
    if(res.success){
      this.sessions = res.result.reverse();
    }
  }
  userLogout() {
    this.userService.logOut().subscribe(
      res => {
        if (res['success'] == true) {
          this.cookieService.deleteAll();
          localStorage.clear();
          this.router.navigate(['/login']);
          console.log('Logout successfully !');
          this.toastrService.success('Logout successfully !');
        }
        else {
          console.log('Error while Logout!');
          this.toastrService.error('Error while Logout!');
        }
      }
    );
  }
  async deactivateAccount(){
    const res = await this.userService.deactivateAccount().toPromise();
    if(res.success){
      this.toastrService.success('Account has been deactivated successfully.');
      this.userLogout();
    }
  }
}
