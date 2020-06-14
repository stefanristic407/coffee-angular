// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Update password.

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { UserserviceService } from "src/services/users/userservice.service";
declare var $: any;

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.css"]
})
export class UpdatePasswordComponent implements OnInit {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  currentPasswordError: string;
  passwordError: string;
  confirmPasswordError: string;
  updateButtonValue: string;

  constructor(
    private router: Router,
    private userService: UserserviceService,
    private cookieService: CookieService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    this.currentPasswordError = "";
    this.passwordError = "";
    this.confirmPasswordError = "";
    this.updateButtonValue = "CHANGE PASSWORD";

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
    /*newPassword Ends */

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

  // Function Name : update Password
  // Description: This function helps to update the user Password.

  changePassword() {
    var pwdFormat = /^([a-zA-Z0-9@#$%^&+=*.\-_]){7,14}$/;

    if (
      this.currentPassword == "" ||
      this.currentPassword == null ||
      this.currentPassword == undefined
    ) {
      this.currentPasswordError = "Please enter your password";
      document.getElementById("currentPassword").style.border =
        "1px solid #D50000 ";
      setTimeout(() => {
        this.currentPasswordError = "";
      }, 3000);
    } else if (!this.currentPassword.match(pwdFormat)) {
      this.currentPasswordError =
        "Password should be between 8 to 15 characters";
      document.getElementById("currentPassword").style.border =
        "1px solid #D50000 ";
      setTimeout(() => {
        this.currentPasswordError = "";
      }, 3000);
    } else if (
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
      this.passwordError = "Password should be minimum of 8 characters";
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
      this.updateButtonValue = "UPDATING";
      var data = {
        current_password: this.currentPassword,
        new_password: this.newPassword,
        confirm_password: this.confirmPassword
      };
      this.userService.updatePassword(data).subscribe(response => {
        if (response["success"] == true) {
          this.updateButtonValue = "CHANGE PASSWORD";
          this.toastrService.success(
            "Password has been updated successfully. Please login again to continue."
          );
          //  console.log("Password has been updated successfully. Please login again to continue.")
          this.cookieService.deleteAll();
          this.router.navigate(["/login"]);
        } else {
          if (response["messages"]["current_password"] !== undefined) {
            // console.log("Error: Current password is "+response['messages'].current_password[0] +"!");
            this.toastrService.error(
              "Error: Current password is " +
                response["messages"].current_password[0] +
                "!"
            );
          }
          if (response["messages"]["new_password"] !== undefined) {
            // console.log("Error: New password is "+response['messages'].new_password[0] +"!");
            this.toastrService.error(
              "Error: New password is " +
                response["messages"].new_password[0] +
                "!"
            );
          }
          if (response["messages"]["confirm_password"] !== undefined) {
            // console.log("Error: Confirm password is "+response['messages'].confirm_password[0] +"!")
            this.toastrService.error(
              "Error: Confirm password is " +
                response["messages"].confirm_password[0] +
                "!"
            );
          } else {
            // console.log("Password update failed!, Try again")
            this.toastrService.error("Password update failed!, Try again");
          }
        }
        this.updateButtonValue = "CHANGE PASSWORD";
      });
    }
  }
}
