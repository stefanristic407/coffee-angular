import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';

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
  result: string;
  value: string;
  appLanguage?: any;
  privacyActive:any=0;
  resetButtonValue : string = "Save changes";
  constructor(public userService : UserserviceService, public toastrService : ToastrService, 
              private route : ActivatedRoute, private router : Router,
              private globals : GlobalsService) { }

  ngOnInit(): void {
    this.getPrivacyTerms();
    this.language();
  }
  language(){
    this.appLanguage = this.globals.languageJson;
       this.privacyActive++;
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
        this.privacyActive++;
      }
    )
  }

  privacyTerms(){
    this.resetButtonValue = "Saving";
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
          
        this.resetButtonValue = "Save changes";
          this.result = decodeURIComponent(this.route.snapshot.queryParams['data']);
          if(this.result == "login" || this.result == "reset-password"){
          this.toastrService.success("Privacy terms setting has been updated successfully");
          this.value = "privacy-settings";
          let navigationExtras: NavigationExtras = {
          queryParams: {
            "data": encodeURIComponent(this.value),
          }
        }
        this.router.navigate(['/features/reset-password'], navigationExtras);
        
          }else{
            this.resetButtonValue = "Save changes";
            this.toastrService.success("Privacy terms setting has been updated successfully");
          this.router.navigate(['/features/account-settings']);
          }
        }else { 
          this.resetButtonValue = "Save changes";
         this.toastrService.error("Please enable all the Privacy policy settings");
          
        }
         
      }
    )
  }
}
