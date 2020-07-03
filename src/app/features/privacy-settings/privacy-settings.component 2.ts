import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css']
})
export class PrivacySettingsComponent implements OnInit {
  access_account: boolean = false;
  access_data: boolean = false;
  access_chat: boolean = false;
  agree_cookies : boolean = false;
  agree_privacy : boolean = false;
  agree_terms : boolean = false;
  constructor(public userService : UserserviceService, public toastrService : ToastrService) { }

  ngOnInit(): void {
    this.getPrivacyTerms();
  }

  getPrivacyTerms(){
    this.userService.getPrivacyTerms().subscribe(
      response => {
        if(response['success']== true){
          this.access_account = response['result'].access_account;
          this.access_data = response['result'].access_data;
          this.access_chat = response['result'].access_chat;
          this.agree_cookies = response['result'].agree_cookies;
          this.agree_privacy = response['result'].agree_privacy;
          this.agree_terms = response['result'].agree_terms;
        }else{
          this.toastrService.show("Kindly add the Privacy settings");
        }
      }
    )
  }

  privacyTerms(){
    var data = {
      'access_account' : this.access_account,
      'access_data' : this.access_data,
      'access_chat' : this.access_chat, 
      'agree_cookies' : this.agree_cookies,
      'agree_privacy' : this.agree_privacy,
      'agree_terms' : this.agree_terms
    };
    this.userService.privacyTerms(data).subscribe(
      response => {
        console.log(response);

        if(response['success'] == true){
          this.toastrService.success("Privacy terms setting has been updated successfully");
        }else {
         this.toastrService.error("Please enable all the Privacy policy settings");
          
        }
         
      }
    )
  }
}
