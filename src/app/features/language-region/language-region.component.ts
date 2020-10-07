import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';

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
  phone: any;
  dateOfBirth: any;
  gender: any;
  address1: any;
  address2: any;
  state: any;
  country: any;
  city: any;
  displayModal: boolean;
  appLanguage: any;
  constructor( public userService : UserserviceService, private cookieService : CookieService,
              private toastrService : ToastrService, private router : Router,
              private globals : GlobalsService) { 
    this.languageError = '';
    this.timeZoneError = '';
  }

  ngOnInit(): void {
    this.roaster_id = this.cookieService.get("roaster_id");
    this.user_id = this.cookieService.get('user_id');
    this.getUserValue();
    // this.getUserLanguage();
    this.appLanguage = this.globals.languageJson;
  }
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  }

  
 getUserValue(){
  this.userService.getRoasterProfile(this.roaster_id).subscribe(
    response => {
      console.log(response)
      setTimeout(()=>{
      this.firstName = response['result']['firstname'] ;
      this.lastName  = response['result']['lastname'];
      this.email = response['result']['email'] ;
      this.lang = response['result']['language'] ;
      this.timezone = response['result']['timezone'] ;
      this.phone = response['result']['phone'];
      this.dateOfBirth = response['result']['date_of_birth'];
         this.gender = response['result']['gender'];
         this.address1 = response['result']['address1'];
         this.address2 = response['result']['address2'];
         this.state = response['result']['state'];
         this.country = response['result']['country'];
         this.city = response['result']['city'];
      },500)
      
    }
  );
}

// getUserLanguage(){
//   this.userService.getLanguageSetting(this.roaster_id).subscribe(
//     result => {
//       console.log(result);
//       this.lang = result['result']['language'] ;
//       this.timezone = result['result']['timezone'] ;
//     }
//   )
// }


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

  showModalDialog() {
    this.displayModal = true;
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
        'language' : this.lang,
        'timezone' : this.timezone,
        'phone' : this.phone,
        'gender' : this.gender,
        'date_of_birth' : this.dateOfBirth,
        "address1": this.address1,
        "address2": this.address2,
        "city": this.city,
        "state": this.state,
        "country": this.country
      };
    
      // var data = {
      //   'language' : this.lang,
      //   'timezone' : this.timezone
      // }
      this.userService.updateRoasterProfile( this.roaster_id,data).subscribe(
        response => {
          console.log(response)
          if(response['success'] == true){
            this.toastrService.success("The Language and timezone is updated succesfully.");
            // this.router.navigate(['/features/account-settings']);
            this.getUserValue();
            this.showModalDialog();
          }
          else{
            this.toastrService.error("Something went wrong!, Please try again!")
          }
        }
      )
    }

  }

   // Function Name : Logout
  //Description: This function helps to logout the user from the session.

  userLogout() {
    this.userService.logOut().subscribe(
      res => {
        if (res['success'] == true) {
          this.cookieService.deleteAll();
          this.router.navigate(['/login']);

          console.log("Logout successfully !");
          this.toastrService.success("Logout successfully !");
        }
        else {
          console.log("Error while Logout!");
          this.toastrService.error("Error while Logout!");
        }
      }
    )
  }

}
