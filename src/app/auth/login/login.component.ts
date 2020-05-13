import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $ : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userEmail: string;
  userPassword: string;
  loginEmailError: any;
  loginPasswordError: any;
  loginButtonValue: any;
  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.loginEmailError = '';
    this.loginPasswordError = '';

    $("input#pwd").on("focus keyup", function () {
         
    });
     
    $("input#pwd").blur(function () {
             
    });
    $("input#pwd").on("focus keyup", function () {
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
     
    $("input#pwd").blur(function () {
     
    });
    $("input#pwd").on("focus keyup", function () {
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
     
    $("input#pwd").blur(function () {
     
    });
    
     
    $("input#pwd").blur(function () {
            $("#pwd_strength_wrap").fadeOut(400);
    });

    
  }
  myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide(); 
    }, 2000);

}
Login() {
    var regex_email = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    var pwdFormat = /^([a-zA-Z0-9@!#$%^&+=*.\-_]){5,14}$/;

    if (this.userEmail == "" || this.userEmail == null || this.userEmail == undefined) {
      this.loginEmailError = "Please enter email address";
      document.getElementById('email').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.loginEmailError = "";
      }, 3000);
    }
    else if (!regex_email.test(this.userEmail)) {
      this.loginEmailError = "Please enter valid email id";
      document.getElementById("email").style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.loginEmailError = "";
      }, 3000);
    }
    else if (this.userPassword == "" || this.userPassword == null || this.userPassword == undefined) {
      this.loginPasswordError = "Please enter password";
      document.getElementById('pwd').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.loginPasswordError = "";
      }, 3000);
    }
    else if (!(pwdFormat.test(this.userPassword))) {
      this.loginPasswordError = "Password should be between 8 to 15 characters";
      document.getElementById("pwd").style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.loginPasswordError = "";
      }, 3000);
    }
    else {
        //this.myAlertTop();
        if(this.userEmail =="satya@terralogic.com" && this.userPassword == "Temp@123"){
          this.router.navigate(["/auth/update-password"]);
        }
        else if(this.userEmail == "satya@terralogic.com" && this.userPassword == "Live@123"){
          this.router.navigate(["../../features/welcome-aboard"]);
		}
		else{
			this.myAlertTop();
		}

     
    }
  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #FD4545";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #E8E8E8";
    }
  }

}
