import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {GlobalsService} from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
  selector: 'app-roaster-quick-setup',
  templateUrl: './roaster-quick-setup.component.html',
  styleUrls: ['./roaster-quick-setup.component.css']
})
export class RoasterQuickSetupComponent implements OnInit {
  add_member_name:any;
  add_member_email:any;
  add_member_type: any = "";
  appLanguage?: any;
  roaster_id: any;
  inviteActive:any=0;
  headerValue: string;
  email: any;
  name: any;
  type: any;
  resetButtonValue : any = "Send Invites";

  addUser = [
    {
      name : '',
      email : '',
      type: ''
   
    }
  ]
  usersArray: any = [];

  constructor(public roasterService:RoasterserviceService,
    public cookieService: CookieService,
    private router: Router,  
    private toastrService : ToastrService,
    public route: ActivatedRoute, 
    public userService : UserserviceService, 
     public globals: GlobalsService) {
    this.roaster_id = this.cookieService.get('roaster_id');

   }

  ngOnInit(): void {
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
      }
      this.headerValue = decodeURIComponent(
        this.route.snapshot.queryParams["buttonValue"]
      );
      this.appLanguage = this.globals.languageJson;

      // this.language();
    }
    // language(){
    //   this.appLanguage = this.globals.languageJson;
    //   this.inviteActive++;
    // }


    public addNewRow(){
      this.addUser.push({ 
      name : '',
      email : '',
      type: ''
    });
  }

  public deleteRow( index){
      this.addUser.splice(index, 1);
    }

    private validateInput(data){
      // const email_variable = data[0].email;
      let flag = true;

      if(this.headerValue == "Micro-Roaster"){

      if (data && data.length){
        data.forEach( ele => {
          if (ele.name === '' || ele.email === '' ){
            flag = false;
          }
        });
      }
    }

    if(this.headerValue == "HoReCa"){

      if (data && data.length){
        data.forEach( ele => {
          if (ele.name === '' || ele.email === '' || ele.type === '' ){
            flag = false;
          }
        });
      }
    }

      return flag;
    }


    sendInvite(){
      this.resetButtonValue = "Sending";

      let flag = true;
      var input = this.addUser;
    console.log(input);
    debugger
      flag = this.validateInput(input);

      console.log(this.add_member_email)
      if (this.headerValue == "Micro-Roaster") {
        this.globals.userInvitesArray = [];
        if (flag){
          this.addUser.forEach(element => {
        this.userService.sendMicroRoasterInvite(this.roaster_id,element.email,element.name).subscribe(data=>{
          if(data['success']==true){
            
            // this.inviteSent = 1;
            console.log(data);
            console.log("https://qa-micro-roaster.sewnstaging.com/#/auth/setup?token=" + data['result'].token);
            var body = {
              "name" : element.name,
              "portal" : this.headerValue,
              "content_type" : "invite_with_url",
              "senders" : [element.email],
              "url" : "https://qa-micro-roaster.sewnstaging.com/#/auth/setup?token=" + data['result'].token
            };
            this.userService.sendUrlToEmail(body).subscribe(
              res => {
                if(res['status'] == "200 OK"){
                  this.globals.userInvitesArray.push(element.email);
                  this.resetButtonValue = "Send Invites";
                  this.toastrService.success("Email has been sent successfully");
                  this.router.navigate(['/features/success-mail']);
                }
                else{
                  this.resetButtonValue = "Send Invites";
                  this.toastrService.error("Error while sending email to the User");
                }
              }
            )
          }else{
            console.log(data);
            this.resetButtonValue = "Send Invites";
            this.toastrService.error("Error while sending email to the User");
          }
        })
      })}
      }
      else if (this.headerValue == "HoReCa") {
        this.globals.userInvitesArray = [];
        if (flag){
          this.addUser.forEach(element => {
        this.userService.sendHorecaInvite(this.roaster_id,element.email,element.name,element.type).subscribe(data=>{
          if(data['success']==true){
            console.log(data);
            console.log("https://qa-client-horeca.sewnstaging.com/#/auth/horeca-setup?token=" + data['result'].token);
            var body = {
              "name" : element.name,
              "portal" : this.headerValue,
              "content_type" : "invite_with_url",
              "senders" : [element.email],
              "url" : "https://qa-client-horeca.sewnstaging.com/#/auth/horeca-setup?token=" + data['result'].token
            };
            this.userService.sendUrlToEmail(body).subscribe(
              res => {
                if(res['status'] == "200 OK"){
                  this.globals.userInvitesArray.push(element.email);
                  this.resetButtonValue = "Send Invites";
                  this.toastrService.success("Email has been sent successfully");
                  this.router.navigate(['/features/success-mail']);
                }
                else{
                  this.resetButtonValue = "Send Invites";
                  this.toastrService.error("Error while sending email to the User");
                }
              }
            )
          }else{
            console.log(data);
            this.resetButtonValue = "Send Invites";
            this.toastrService.error("Error while sending email to the User");
          }
        })
      })}
      } 
  
    }

}
