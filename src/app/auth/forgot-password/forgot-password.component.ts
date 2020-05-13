import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email : string;
  emailError: string;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.emailError = '';

  }
  ngAfterViewChecked(){
  $('.email-link').on('click', function(){
    $('.email-link').addClass('email-recovery');
    $('.email-link').removeClass('email-link');
 });
}
recoveryEmail(){
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(this.email == "" || this.email == null || this.email == undefined){
		this.emailError="Please enter your email address";
    document.getElementById('email').style.border="1px solid #FD4545";
		setTimeout(() => {
			this.emailError="";
		},3000);
    }
    else if(!(this.email.match(emailFormat))){
    this.emailError="Please enter valid email address";
    document.getElementById('email').style.border="1px solid #FD4545";
		setTimeout(() => {
			this.emailError="";
    },3000);
  }
    else{
      this.router.navigate(["auth/verify-otp"]);
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
