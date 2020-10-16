

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  buttonValue: string;

  constructor(private router: Router,
    private cookieService:CookieService) { }

  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    
  }
  
  microRoaster() {
    this.buttonValue = "Micro-Roaster";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/features/roaster-quick-setup"], navigationExtras);
  }

  horeca() {
    this.buttonValue = "HoReCa";
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buttonValue: encodeURIComponent(this.buttonValue)
      }
    };

    this.router.navigate(["/features/roaster-quick-setup"], navigationExtras);
  }

}
