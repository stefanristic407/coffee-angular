// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Edit Member.

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit {
  member_name: string;
  member_email: string;
  member_role: string = "";
  memberNameError: string;
  memberEmailError: string;
  memberRoleError: string;

  emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(private router: Router,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');
      $(this).find('.btn').toggleClass('active_default');
      $(this).find('.btn').toggleClass('disable_default');
    });

    this.memberNameError = '';
    this.memberEmailError = '';
    this.memberRoleError = '';
  }

  ngAfterViewChecked() {

  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #FD4545";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #E8E8E8";
    }
  }
  update() {
    if (this.member_name == "" || this.member_name == null || this.member_name == undefined) {
      this.memberNameError = "Please enter your member name";
      document.getElementById('member_name').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.memberNameError = "";
      }, 4000);
    }
    else if (this.member_email == "" || this.member_email == null || this.member_email == undefined) {
      this.memberEmailError = "Please enter your member email";
      document.getElementById('member_email').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.memberEmailError = "";
      }, 4000);
    }
    else if (this.member_role == "" || this.member_role == null || this.member_role == undefined) {
      this.memberRoleError = "Please enter your member role";
      document.getElementById('member_role').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.memberRoleError = "";
      }, 3000);
    }
    else if (!(this.member_email.match(this.emailFormat))) {
      this.memberEmailError = "Please enter valid email address";
      document.getElementById('member_email').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.memberEmailError = "";
      }, 4000);
    }
    else {
      // this.router.navigate(['/features/add-members']);
      console.log("New Password:" + this.member_email);
      console.log("Confirm Password:" + this.member_role);

    }
  }

}
