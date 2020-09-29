import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-welcome-aboard',
  templateUrl: './welcome-aboard.component.html',
  styleUrls: ['./welcome-aboard.component.css']
})
export class WelcomeAboardComponent implements OnInit {

  constructor(private router: Router,
    private cookieService:CookieService) { }

  ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }

      $('.nav-links__item').removeClass('active');
      $('.nav-links__item').eq(0).addClass('active');
  }
  

}
