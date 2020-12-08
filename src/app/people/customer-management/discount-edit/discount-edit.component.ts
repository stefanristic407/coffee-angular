import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { CustomerServiceService } from '../customer-service.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.css']
})
export class DiscountEditComponent implements OnInit {
	appLanguage?: any;
	roaster_id: string;

  constructor(public globals: GlobalsService,public customerService : CustomerServiceService,    
	public userService : UserserviceService,public cookieService: CookieService,    
	private toastrService : ToastrService,    public route: ActivatedRoute,     private router: Router  

	) { 
		this.roaster_id = this.cookieService.get('roaster_id');

	}

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

  resendInvite(){
  if (this.customerService.headerValue == "Micro-Roaster") {
    this.userService.sendMicroRoasterInvite(this.roaster_id,this.customerService.pendingEmail,this.customerService.pendingCompany).subscribe(data=>{
      if(data['success']==true){
        console.log("https://qa-micro-roaster.sewnstaging.com/auth/setup?token=" + data['result'].token);
        var body = {
          "name" : this.customerService.pendingCompany,
          "portal" : this.customerService.headerValue,
          "content_type" : "invite_with_url",
          "senders" : [this.customerService.pendingEmail],
          "url" : "https://qa-micro-roaster.sewnstaging.com/auth/setup?token=" + data['result'].token
        };
        this.userService.sendUrlToEmail(body).subscribe(
          res => {
            if(res['status'] == "200 OK"){
            //   this.globals.userInvitesArray.push(this.customerService.pendingEmail);
            //   this.resetButtonValue = "Send Invites";
              this.toastrService.success("Email has been sent successfully");
              this.router.navigate(['/people/customer-management']);
            }
            else{
            //   this.resetButtonValue = "Send Invites";
              this.toastrService.error("Error while sending email to the User");
            }
          }
        )
      }else{
        console.log(data);
        // this.resetButtonValue = "Send Invites";
        this.toastrService.error("Error while sending email to the User");
      }
    })

  }
  else if (this.customerService.headerValue == "HoReCa"){
	  this.userService.sendHorecaInvite(this.roaster_id,this.customerService.pendingEmail,this.customerService.pendingCompany,this.customerService.pendingType).subscribe(data=>{
		if(data['success']==true){
		  console.log(data);
		  console.log("https://qa-client-horeca.sewnstaging.com/auth/horeca-setup?token=" + data['result'].token);
		  var body = {
			"name" : this.customerService.pendingCompany,
			"portal" : this.customerService.headerValue,
			"content_type" : "invite_with_url",
			"senders" : [this.customerService.pendingEmail],
			"url" : "https://qa-client-horeca.sewnstaging.com/auth/horeca-setup?token=" + data['result'].token
		  };
		  this.userService.sendUrlToEmail(body).subscribe(
			res => {
			  if(res['status'] == "200 OK"){
				// this.resetButtonValue = "Send Invites";
				this.toastrService.success("Email has been sent successfully");
				this.router.navigate(['/people/customer-management']);
			  }
			  else{
				// this.resetButtonValue = "Send Invites";
				this.toastrService.error("Error while sending email to the User");
			  }
			}
		  )
		}else{
		  console.log(data);
		//   this.resetButtonValue = "Send Invites";
		  this.toastrService.error("Error while sending email to the User");
		}
	  })
	}
  }

}
