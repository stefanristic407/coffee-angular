import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-region',
  templateUrl: './language-region.component.html',
  styleUrls: ['./language-region.component.css']
})
export class LanguageRegionComponent implements OnInit {
  lang : any = '';
  timezone : any = '';
  langChips : any = [];
  selectable = true;
  removable = true;
  roaster_id: any;
  user_id: any;
  firstName: any;
  languageError: string;
  timeZoneError: string;
  lastName: any;
  email: any;
  constructor( public userService : UserserviceService, private cookieService : CookieService,
              private toastrService : ToastrService, private router : Router) { 
    this.languageError = '';
    this.timeZoneError = '';
  }

  ngOnInit(): void {
    this.roaster_id = this.cookieService.get("roaster_id");
    this.user_id = this.cookieService.get('user_id');
    this.getUserValue();
  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  }

  
getUserValue(){
  this.userService.getRoasterUserData(this.roaster_id, this.user_id).subscribe(
    response => {
      this.firstName = response['result']['firstname'] ;
      this.lastName  = response['result']['lastname'];
      this.email = response['result']['email'] ;
      this.lang = response['result']['language'] ;
      this.timezone = response['result']['timezone'] ;
    }
  );
}


  addLang(value:any) {
    // const input = event.input;
    // const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.langChips.push(value.trim());
    }

    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }

  }

  remove(lang: string): void {
    const index = this.langChips.indexOf(lang);

    if (index >= 0) {
      this.langChips.splice(index, 1);
    }
  }

  saveLanguage(){
    if (this.lang == "" || this.lang == null || this.lang == undefined) {
      this.languageError = "Please Select your Language";
      document.getElementById('lang').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.languageError = "";
      }, 4000);
    }
    else if (this.timezone == "" || this.timezone == null || this.timezone == undefined) {
      this.timeZoneError = "Please Select your Timezone";
      document.getElementById('timezone').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.timeZoneError = "";
      }, 4000);
    }
    else{
      var data = {
        'firstname' : this.firstName,
        'lastname' : this.lastName,
        'email' : this.email,
        'language' : this.lang,
        'timezone' : this.timezone
      };
      this.userService.updateUserData(data, this.roaster_id, this.user_id).subscribe(
        response => {
          if(response['success'] == true){
            this.toastrService.success("The Language and timezone is update succesfully.");
            this.router.navigate(['/features/account-settings']);
          }
          else{
            this.toastrService.error("Something went wrong!, Please try again!")
          }
        }
      )
    }

  }

}
