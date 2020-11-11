import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { UserserviceService } from "src/services/users/userservice.service";
import { GlobalsService } from 'src/services/globals.service';
import {HomeService} from 'src/services/brand-profile/home.service'

declare var $: any;

@Component({
  selector: 'app-brand-pages-home',
  templateUrl: './brand-pages-home.component.html',
  styleUrls: ['../brand-profile.component.css']
})
export class BrandPagesHomeComponent implements OnInit {

  homeval: number = 5 ;
  aboutval: number = 15 ;
  learnval:  number = 5 ;
  sustainval: number = 5 ;
  visitval: number = 15 ;
  appLanguage?: any;
  brandProfileActive:any=0;


  // Home page Variables
  bannerTitle: string;
  bannerImage: any;
  whoWeAreDescription:string;
  whoWeAreTitle: string;
  wizardSubheading: string;
  wizardTitle: string;
  sustainabilitySubheading: string;
  sustainabilityTitle: string;
  traceabilitydSubheading: string;
  traceabilityTitle: string;
  featureImages: any;
  
  constructor(
    private router: Router,
    private userService: UserserviceService,
    private cookieService: CookieService,
    private toastrService: ToastrService,
    private route : ActivatedRoute ,
    private globals : GlobalsService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.language();
    $('.nav-links__item').removeClass('active');
    $('.nav-links__item').eq(1).addClass('active');
}
language(){
	this.appLanguage = this.globals.languageJson;
	this.brandProfileActive++;
}

}
