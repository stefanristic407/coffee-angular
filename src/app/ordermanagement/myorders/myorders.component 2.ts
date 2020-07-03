import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  constructor(public router:Router,
              public cookieService:CookieService) { }

  ngOnInit(): void {
 //Auth checking
 if (this.cookieService.get("Auth") == "") {
  this.router.navigate(["/auth/login"]);
}

    
  }


}
