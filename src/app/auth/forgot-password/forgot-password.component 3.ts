// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Recovery Eamil.

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { UserserviceService } from "src/services/users/userservice.service";
declare var $: any;
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  emailError: string;
  recoveryButtonValue: any;

  constructor(
    private router: Router,
    private userService: UserserviceService,
    private cookieService: CookieService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.emailError = "";
    this.recoveryButtonValue = "Email me a recovery otp";
  }
  ngAfterViewChecked() {
    $(".email-link").on("click", function() {
      $(".email-link").addClass("email-recovery");
      $(".email-link").removeClass("email-link");
    });
  }

  // Function Name : Recovery Email
  // Description: This function helps to get Email from the user to check recovery Email is valid or not.

  recoveryEmail() {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.email == "" || this.email == null || this.email == undefined) {
      this.emailError = "Please enter your email address";
      document.getElementById("email").style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.emailError = "";
      }, 3000);
    } else if (!this.email.match(emailFormat)) {
      this.emailError = "Please enter valid email address";
      document.getElementById("email").style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.emailError = "";
      }, 3000);
    } else {
      this.recoveryButtonValue = "Sending";
      var data = [];
      data["email"] = this.email;
      this.userService.recoveryEmail(data).subscribe(data => {
        if (data["success"] == true) {
          this.recoveryButtonValue = "Email me a recovery otp";
          this.toastrService.success(
            "OTP has been sent to your email successfully!"
          );
          this.cookieService.set("email", this.email);

          this.cookieService.set("otp", data["result"]);
          console.log("otp:" + data["result"]);
          this.router.navigate(["/auth/verify-otp"]);
        } else {
          if (data["messages"]["email"] !== undefined) {
            //  console.log("Error: Email "+data['messages'].email[0] +"!");
            this.toastrService.error(
              "Error: Email " + data["messages"].email[0] + "!"
            );
          } else {
            // console.log("Something went wrong!, Try again")
            this.toastrService.error("Something went wrong!, Try again");
          }
        }
        this.recoveryButtonValue = "Email me a recovery otp";
      });
    }
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
}
