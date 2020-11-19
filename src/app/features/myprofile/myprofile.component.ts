import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  roaster_id: string;
  profileDetails : any =[];
  appLanguage? : any;

  constructor(private userService : UserserviceService, private cookieService : CookieService,
               private router : Router, public globals : GlobalsService ) { 
    this.roaster_id = this.cookieService.get('roaster_id');
  }

  ngOnInit(): void {
    this.appLanguage =this.globals.languageJson;
    this.userService.getRoasterProfile(this.roaster_id).subscribe(
      
      response => {
        console.log(response)
        if(response['success']== true){
          this.profileDetails = response['result'];
          console.log(this.profileDetails.firstname)
        }
      }
    )
  }

  editProfile(id : any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "userID": encodeURIComponent(id),
      }
    }

    this.router.navigate(['/features/profile-edit'], navigationExtras);
  }

}
