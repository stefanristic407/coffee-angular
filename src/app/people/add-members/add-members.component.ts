import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  member_name:any;
  member_email :any;
  memberFirstNameError : string;
  memberEmailError : string;

  emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  pwdFormat=  /^([a-zA-Z0-9@#$%^&+=*.\-_]){7,14}$/;
  constructor(private router:Router) { }

  ngOnInit(): void {
    // $(document).ready(function(){
    //   $('[data-toggle="popover"]').popover({
    //     html: true,
    //     content: function() {
    //       return $('#popover-content').html();
    //     }
    //   });
    // })
    this.memberFirstNameError='';
      this.memberEmailError='';
  }

  ngAfterViewChecked(){

 
  }
  onKeyPress(event:any)
    {
      if(event.target.value == "") {
        document.getElementById(event.target.id).style.border= "1px solid #FD4545";
      } else {
        document.getElementById(event.target.id).style.border= "1px solid #E8E8E8";
      }
    }

    sendInvites(){
      if(this.member_name == "" || this.member_name == null || this.member_name == undefined){
        this.memberFirstNameError="Please enter your member name";
        document.getElementById('memberName').style.border="1px solid #FD4545";
        setTimeout(() => {
          this.memberFirstNameError="";
        },3000);
        }
      else if(this.member_email == "" || this.member_email == null || this.member_email == undefined){
      this.memberEmailError="Please enter your member email";
      document.getElementById('memberEmail').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.memberEmailError="";
      },3000);
      }
      else if(!(this.member_email.match(this.emailFormat))){
        this.memberEmailError="Please enter valid email address";
        document.getElementById('memberEmail').style.border="1px solid #FD4545";
        setTimeout(() => {
          this.memberEmailError="";
        },3000);
      }
    
        
      else{
        this.router.navigate(["people/manage-role"]);

      
      }
    }

}
