import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-welcome-aboard',
  templateUrl: './welcome-aboard.component.html',
  styleUrls: ['./welcome-aboard.component.css']
})
export class WelcomeAboardComponent implements OnInit {
  appLanguage: any;

  constructor(private router: Router,
    private cookieService:CookieService,
    private globals: GlobalsService
    ) { }

  ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }

      $('.nav-links__item').removeClass('active');
      $('.nav-links__item').eq(0).addClass('active');
      this.appLanguage = this.globals.languageJson;
  }
  

}
