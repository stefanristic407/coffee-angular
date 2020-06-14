// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of change password.

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { UserserviceService } from "src/services/users/userservice.service";
declare var $: any;

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  confirmPassword: string;
  passwordError: string;
  confirmPasswordError: string;
  resetButtonValue: any;

  constructor(
    private router: Router,
    private userService: UserserviceService,
    private cookieService: CookieService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.passwordError = "";
    this.confirmPasswordError = "";
    this.resetButtonValue = "CHANGE PASSWORD";

    // Function Name : Passowrd Indicator
    // Description: This function helps to indicate the entering meeting the password policy.

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

      // password length
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

      // at least 1 digit in password
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

      // at least 1 capital & lower letter in password
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

      // at least 1 special character in password {
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
        $("#passwordDescription").text("Password not entered");
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

      // password length
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

      // at least 1 digit in password
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

      // at least 1 capital & lower letter in password
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

      // at least 1 special character in password {
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
        $("#passwordDescription").text("Password not entered");
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      }
    });

    $("input#newPassword").blur(function() {
      $("#pwd_strength_wrap").fadeOut(400);
    });

    /*confirmPassword starts */

    $("input#confirmPassword").on("focus keyup", function() {});

    $("input#confirmPassword").blur(function() {});
    $("input#confirmPassword").on("focus keyup", function() {
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

    $("input#confirmPassword").blur(function() {});
    $("input#confirmPassword").on("focus keyup", function() {
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
        $("#length_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#length_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 digit in password
      if (a.match(/\d/)) {
        $("#pnum_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#pnum_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 capital & lower letter in password
      if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
        $("#capital_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#capital_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 special character in password {
      if (a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
        $("#spchar_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#spchar_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      if (a.length > 0) {
        //show strength text
        $("#passwordDescription_confirm").text(desc[score]);
        // show indicator
        $("#passwordStrength_confirm")
          .removeClass()
          .addClass("strength" + score);
      } else {
        $("#passwordDescription_confirm").text("Password not entered");
        $("#passwordStrength_confirm")
          .removeClass()
          .addClass("strength" + score);
      }
    });

    $("input#confirmPassword").blur(function() {});
    $("input#confirmPassword").on("focus keyup", function() {
      var score = 0;
      var a = $(this).val();
      var desc = new Array();

      // strength desc
      desc[0] = "Too short";
      desc[1] = "Weak";
      desc[2] = "Good";
      desc[3] = "Strong";
      desc[4] = "Best";

      $("#pwd_strength_wrap_confirm").fadeIn(400);

      // password length
      if (a.length >= 6) {
        $("#length_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#length_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 digit in password
      if (a.match(/\d/)) {
        $("#pnum_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#pnum_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 capital & lower letter in password
      if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
        $("#capital_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#capital_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 special character in password {
      if (a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
        $("#spchar_confirm")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#spchar_confirm")
          .removeClass("valid")
          .addClass("invalid");
      }

      if (a.length > 0) {
        //show strength text
        $("#passwordDescription_confirm").text(desc[score]);
        // show indicator
        $("#passwordStrength_confirm")
          .removeClass()
          .addClass("strength" + score);
      } else {
        $("#passwordDescription_confirm").text("Password not entered");
        $("#passwordStrength_confirm")
          .removeClass()
          .addClass("strength" + score);
      }
    });

    $("input#confirmPassword").blur(function() {
      $("#pwd_strength_wrap_confirm").fadeOut(400);
    });

    /*confirmPassword Ends */
  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border =
        "1px solid #D50000 ";
    } else {
      document.getElementById(event.target.id).style.border =
        "1px solid #E8E8E8";
    }
  }

  // Function Name : Change Password
  // Description: This function helps to change the user Password.

  changePassword() {
    var pwdFormat = /^([a-zA-Z0-9@#$%^&+=*.\-_]){7,14}$/;

    if (
      this.newPassword == "" ||
      this.newPassword == null ||
      this.newPassword == undefined
    ) {
      this.passwordError = "Please enter your password";
      document.getElementById("newPassword").style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.passwordError = "";
      }, 3000);
    } else if (!this.newPassword.match(pwdFormat)) {
      this.passwordError = "Password should be between 8 to 15 characters";
      document.getElementById("newPassword").style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.passwordError = "";
      }, 3000);
    } else if (
      this.confirmPassword == "" ||
      this.confirmPassword == null ||
      this.confirmPassword == undefined
    ) {
      this.confirmPasswordError = "Please enter your password again";
      document.getElementById("confirmPassword").style.border =
        "1px solid #D50000 ";
      setTimeout(() => {
        this.confirmPasswordError = "";
      }, 3000);
    } else if (this.confirmPassword != this.newPassword) {
      this.confirmPasswordError = "Password is not matched";
      document.getElementById("confirmPassword").style.border =
        "1px solid #D50000 ";
      setTimeout(() => {
        this.confirmPasswordError = "";
      }, 3000);
    } else {
      this.resetButtonValue = "UPDATING";
      var data = [];
      data["email"] = this.cookieService.get("email");
      data["token"] = this.cookieService.get("token");
      data["password"] = this.newPassword;
      data["confirm_password"] = this.confirmPassword;
      this.userService.changePassword(data).subscribe(data => {
        this.resetButtonValue = "CHANGE PASSWORD";
        if (data["success"] == true) {
          // console.log("Password has been resetted successfully!");
          this.toastrService.success(
            "Password has been resetted successfully!"
          );
          this.cookieService.deleteAll();
          this.router.navigate(["/auth/login"]);
        } else {
          if (data["messages"]["password"] !== undefined) {
            // console.log("Error: Password is "+data['messages'].password[0] +"!");
            this.toastrService.error(
              "Error: Password is " + data["messages"].password[0] + "!"
            );
          } else {
            // console.log("Something went wrong!, Try again");
            this.toastrService.error("Something went wrong!, Try again");
          }
          this.resetButtonValue = "CHANGE PASSWORD";
        }
      });
      // this.router.navigate(["/auth/login"]);
    }
  }
}
