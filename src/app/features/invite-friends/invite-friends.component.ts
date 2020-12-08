import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.css']
})
export class InviteFriendsComponent implements OnInit {

  // password: string = 'Ro@Sewn1234';
  addUser = [
    {
      email : ''
    }
  ]
  constructor( private toastrService : ToastrService, 
               private cookieService : CookieService,
               private userService : UserserviceService,
               private router : Router ) { }

  ngOnInit(): void {
  
    /*Onboarding start*/
    // $('body').on('click', '.add-partner', function () {

    //   var NewRow = `<div class="new-row position-relative">
		// 	<div class="row">
			
		// 		<div class="col-12 col-md-10 Onboard-input">

		// 			<label class="w-100">Email address</label>
		// 			<input class="w-100" type="email" placeholder="Please enter your work email">

    //     </div>
    //     <span class="delete-rows fnt-muli fnt-700 txt-clr60b">
		// 		Delete row
		// 	</span>
		// 	</div>
		
		// </div>`
    //   $(this).parents('.Onboard-invite').find('.Onboard-invite__inputs:last').append(NewRow);
    // });

    // $('body').on('click', '.delete-rows', function () {


    //   $(this).parents('.new-row').remove();
    // });
    /*Onboarding end */
  }

  
  public addNewRow(){
    this.addUser.push({ email : ''}
   );
}

public deleteRow( index){
    this.addUser.splice(index, 1);
  }
  
  private validateInput(data){
    // const email_variable = data[0].email;
    let flag = true;
    if (data && data.length){
      data.forEach( ele => {
        if (ele.email === '' ){
          flag = false;
        }
      });
    }
    return flag;
  }


  
  public sendInvites(){
    let flag = true;
    var input = this.addUser;
  console.log(input);
    flag = this.validateInput(input);
  
    if (flag){
      // this.resetButtonValue = "Sending";
      this.addUser.forEach(element => {
      
        var body = {
          "name" : element.email,
          "portal" : "Roaster",
          "content_type" : "invite_with_url",
          "senders" : [element.email],
          "url" : "https://qa-client-horeca.sewnstaging.com/auth/horeca-setup",
          "referral_code" : this.cookieService.get('referral_code')
        };
                    this.userService.sendUrlToEmail(body).subscribe(
                      res => {
                        if(res['status'] == "200 OK"){
                          // this.resetButtonValue = "Send Invite(s)";
                          this.router.navigate(['/people/user-management']);
                          this.toastrService.success("Email has been sent successfully");
                        }
                        else{
                          
                          this.toastrService.error("Error while sending email to the User");
                          // this.resetButtonValue = "Send invites"
                        }
                      }
                    )
                
                
             
                }
      )
               } else {
      // this.resetButtonValue = "Send invite";
      this.toastrService.error('Fields should not be empty.');
    }
  }


}
