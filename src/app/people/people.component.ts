// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Navbar.

import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/services/users/userservice.service';
import { DirectMessagingComponent } from '../ordermanagement/direct-messaging/direct-messaging.component';
import { runInThisContext } from 'vm';
// import * as $ from 'jquery';
declare var $: any;
import { TranslateService } from "@ngx-translate/core";
import {GlobalsService} from 'src/services/globals.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  userName: string;
  selected: string;
  roaster_id: any;
  user_id: any;

  states: string[] = [
    'alabama@gmail.com',
    'alaska@gmail.com',
    'arizona@gmail.com',
    'arkansas@gmail.com',
    'daniel.hedlund@nordsud.se',
    'dinesh@gmail.com',
    'dinesh@terralogic.com',
    'dineshnp@nordsud.se',
    'erik.hedlund@nordsud.se',
    'sindhu@gmail.com',
    'sindhu@terralogic.com',
    'sindhu@nordsud.se',
    'satya@gmail.com',
    'satyanarayana@gmail.com',
    'satyanarayana.murthy@nordsud.se',
    'vijay@gmail.com',
    'vijaysimha@gmail.com',
    'vijaysimha@terralogic.com',
    'vijaysimha.challa@nordsud.se'

  ];
  profilePic: any;
  roasterProfilePic: any;
  supportLanguages = ["en", "es"];
  lag: any;
  languages: any;
  appLanguage: any;
  isActive:any=0;
	slug_list: any;
	access_list: string;
	slugType: any;
	accessType: any;

  constructor(private elementRef: ElementRef,
    private cookieService: CookieService,
    private userService: UserserviceService,
    private router: Router,
    private toastrService: ToastrService,
    private translateService:TranslateService,
    public globals:GlobalsService) {

      this.translateService.addLangs(this.supportLanguages);
    if (localStorage.getItem("locale")) {
      const browserLang = localStorage.getItem("locale");
      this.translateService.use(browserLang);
    } else {
      const browserlang = this.translateService.getBrowserLang();
      this.translateService.use(browserlang);
      localStorage.setItem("locale", "en");
    }
     }
    ngOnInit(): void {

    this.roaster_id = this.cookieService.get("roaster_id");
    this.user_id = this.cookieService.get("user_id");
    this.getUserValue();
	this.getRoasterProfile();
	this.slug_list=JSON.parse(this.cookieService.get('permissionSlug'));
	// var slugData = result['result'];
						// slugData.forEach(element => {
						//   var tempList = {};
						//   tempList['slugList'] = element.slug;
						//   tempList['accessList'] = element.access_type;
						//   this.permissionSlugData.push(tempList);
	

    //Open side nav
    $('body').on('click', '.sidenav-hamberg', function(event) {
      $('.sidenav-mb').addClass('open');
      $('.sidenav-mb__content').addClass('open')
      event.stopImmediatePropagation();
    });

    $('body').on('click', '.sidenav-mb__close', function(event) {
     
      $('.sidenav-mb__content').removeClass('open')
      setTimeout(function(){
        $('.sidenav-mb').removeClass('open');
       }, 800);
      event.stopImmediatePropagation();
    });

    $('body').on('click', '.sidenav-mb__hide', function(event) {
     
      $('.sidenav-mb__content').removeClass('open')
      setTimeout(function(){
        $('.sidenav-mb').removeClass('open');
       }, 800);
      event.stopImmediatePropagation();
    });



    $('.nav-links__item .router-link').on('click', function (event) {
      $('.sidenav-mb__content').removeClass('open')
      setTimeout(function(){
        $('.sidenav-mb').removeClass('open');
       }, 800);
      event.stopImmediatePropagation();
    });



    }

	// checkItem(data){
	// 	console.log(data);
	// 	var slugType='';
	// 	console.log(this.slug_list);
	// 	for (var i = 0; i < this.slug_list.length; i++) {
	// 		if(this.slug_list[i].slug == data){
	// 		slugType =  this.slug_list[i].access_type;
	// 		// console.log(slugType);
	// 		return slugType;
	// 		}
	// 	}	
	// }


  // Function Name : User Value
  // Description: This function helps to get the details of the logged in user and show the username in header

  getUserValue() {
    this.userService.getRoasterUserData(this.roaster_id, this.user_id).subscribe(
      response => {
        this.userName = response['result']['firstname'] + " " + response['result']['lastname'];
        this.profilePic = response['result']['profile_image_thumb_url'];
        var language = (response['result']['language'] == "") ? "en" : response['result']['language'];
        this.userService.getUserLanguageStrings(language).subscribe(
          resultLanguage => {
            console.log(resultLanguage);
            this.globals.languageJson = resultLanguage;
            console.log(this.globals.languageJson);
            this.appLanguage = this.globals.languageJson;
            this.isActive++;
          }
        )
      }
    );
  }

  
    
  // Function Name : Roaster Profile
  //Description: This function helps to get the details of the Roaster Profile 
  getRoasterProfile() {
    this.userService.getRoasterAccount(this.roaster_id).subscribe(
      result => {
        this.roasterProfilePic = result['result']['company_image_thumbnail_url'];
        this.isActive++;
    }
    );
  }
  


  // Function Name : Logout
  // Description: This function helps to logout the user from the session.

  userLogout() {
    this.userService.logOut().subscribe(
      res => {
        if (res['success'] == true) {
          this.cookieService.deleteAll();
          this.router.navigate(['/login']);

          // console.log("Logout successfully !");
          this.toastrService.success("Logout successfully !");
        }
        else {
          // console.log("Error while Logout!");
          this.toastrService.error("Error while Logout!");
        }
      }
    )
  }

 

  ngAfterViewInit() {
  //   $('.nav-links__item').on('click', function() {
  //     $('.nav-links__item').not(this).removeClass('active');
  //     $(this).addClass('active')
  // });

  // $('.nav-dropdown li').on('click', function() {
  //     $('.nav-dropdown li').parents('.nav-links__item').not(this).removeClass('active');
  //     $(this).parents('.nav-links__item').addClass('active')
  // });
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('.sectin-footer-mb').css({
          "opacity": "0",
          "pointer-events": "none"
        })
    }

    else {
      $('.sectin-footer-mb').css({
        "opacity": "1",
        "pointer-events": "all"
      })
    }
 });

  $(document).ready(function() {
    if ($(window).width() < 768) {
      $('.nav-links__item').removeClass('active');
    }
  });

  $('.nav-links__item').on('click', function () { 

    if ($(window).width() < 768) {
      $('.nav-links__item').not(this).find('.nav-dropdown').slideUp();
      $(this).find('.nav-dropdown').slideToggle();
      $('.nav-links__item').not(this).removeClass('active');
      $(this).toggleClass('active')
    }

    
  });


  $(window).on('load', function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  // Footer links
  
  $('body').on('click', '.footer-links__item', function () {
    $(this).parents('.footer-links').find('.footer-links__item').not(this).removeClass('active');
    $(this).addClass('active');
    $('.footer-links__item').find('.ft-dropdown').not(this).removeClass('active')

    $(this).find('.ft-dropdown').addClass('active')

    setTimeout(function(){
      $('.ft-dropdown').removeClass('active');
     }, 3500);
  });

  }

  
}
