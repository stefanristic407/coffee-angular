import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalsService } from 'src/services/globals.service';
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

  constructor(private modalService: BsModalService,
      private globals : GlobalsService
    ) { }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);

    }
  ngOnInit(): void {

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
}
