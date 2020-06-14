// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Verify OTP.

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { UserserviceService } from "src/services/users/userservice.service";
declare var $: any;
@Component({
  selector: "app-verify-otp",
  templateUrl: "./verify-otp.component.html",
  styleUrls: ["./verify-otp.component.css"]
})
export class VerifyOtpComponent implements OnInit {
  // otpValue : string;
  otp: string;
  otpButtonValue: any;

  constructor(
    private userService: UserserviceService,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.otpButtonValue = "SUBMIT";

    var counter = 60;
    var interval = setInterval(function() {
      counter--;
      if (counter <= 0) {
        clearInterval(interval);
        $("#timer").html("<span>00:00</span>");
        return;
      } else {
        $("#time").text(counter);
      }
    }, 1000);
  }

  // Function Name : OTP Value
  // Description: This function helps to get OTP Value from the UI.

  onOtpChange(otp) {
    this.otp = otp;
    // console.log("the otp value is :" + this.otp)
  }
  // getCodeBoxElement(index) {
  //   return <HTMLInputElement>document.getElementById('codeBox' + index);
  // }
  //  onKeyUpEvent(index, event) {
  //   const eventCode = event.which || event.keyCode;
  //   let otp = event.target.value;
  //   // this.otpValue = otp;
  //   this.otpValue += otp;

  //   console.log("keyup is coming here ", eventCode);
  //   if (this.getCodeBoxElement(index).value.length == 1) {
  //     if (index !== 6) {
  //       this.getCodeBoxElement(index+ 1).focus();
  //     } else {
  //       this.getCodeBoxElement(index).blur();
  //       // Submit code
  //       console.log('submit code '+ this.getCodeBoxElement(index).value);
  //     }
  //   }
  //   if (eventCode == 8 && index !== 1) {
  //     this.getCodeBoxElement(index - 1).focus();
  //   }
  //   console.log("the value is : "+ this.otpValue)
  // }
  //  onFocusEvent(index) {
  //    console.log("focusing here");
  //   for (let item = 1; item < index; item++) {
  //     const currentElement = this.getCodeBoxElement(item);
  //     if (!currentElement.value) {
  //         currentElement.focus();
  //         break;
  //     }
  //   }
  // }

  // Function Name : Verify OTP
  // Description: This function helps to check the entered OTP is matched or not.

  verifyOtp() {
    this.otpButtonValue = "VERIFYING";
    var data = [];
    data["email"] = this.cookieService.get("email");
    data["otp"] = parseInt(this.otp);
    this.userService.verifyOtp(data).subscribe(data => {
      if (data["success"] == true) {
        this.otpButtonValue = "SUBMIT";
        //  console.log("OTP has been verified successfully!")
        this.toastrService.success("OTP has been verified successfully!");
        this.cookieService.set("token", data["result"].token);
        this.router.navigate(["/auth/change-password"]);
      } else {
        if (data["messages"]["otp"] !== undefined) {
          // console.log("Error: OTP is "+data['messages'].otp[0] +"!")
          this.toastrService.error(
            "Error: OTP is " + data["messages"].otp[0] + "!"
          );
        } else {
          // console.log("Something went wrong!, Try again")
          this.toastrService.error("Something went wrong!, Try again");
        }
        this.otpButtonValue = "SUBMIT";
      }
    });
  }
}
