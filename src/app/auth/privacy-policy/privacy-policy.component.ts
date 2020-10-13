import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.css"]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    //Auth checking
  
  }
}
