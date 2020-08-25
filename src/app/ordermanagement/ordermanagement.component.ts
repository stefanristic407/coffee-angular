// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Navbar.

import { Component, ElementRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DirectMessagingComponent } from '../../app/ordermanagement/direct-messaging/direct-messaging.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-ordermanagement',
  templateUrl: './ordermanagement.component.html',
  styleUrls: ['./ordermanagement.component.css']
})
export class OrdermanagementComponent implements OnInit {
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



  constructor(private elementRef: ElementRef,
    private cookieService: CookieService,
    private userService: UserserviceService,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private toastrService: ToastrService) { }

    ngOnInit(): void {

    this.roaster_id = this.cookieService.get('roaster_id');
    this.user_id = this.cookieService.get('user_id');
    this.getUserValue();
      this.getRoasterProfile();

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
  
    

  // Function Name : User Value
  // Description: This function helps to get the details of the logged in user and show the username in header

  getUserValue() {
    this.userService.getRoasterUserData(this.roaster_id, this.user_id).subscribe(
      response => {
        this.userName = response['result']['firstname'] + " " + response['result']['lastname'];
        this.profilePic = response['result']['profile_image_thumb_url'];
      }
    );
  }


    
  // Function Name : Roaster Profile
  //Description: This function helps to get the details of the Roaster Profile 
  getRoasterProfile() {
    this.userService.getRoasterAccount(this.roaster_id).subscribe(
      result => {
        this.roasterProfilePic = result['result']['company_image_thumbnail_url'];
    }
    );
  }

  // Function Name : Open Bottom Sheet
  // Description: This function helps to open the more options in mobile view
  openBottomSheet(): void {
    this._bottomSheet.open(DirectMessagingComponent);
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
          //   console.log("Error while Logout!");
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
    if ($(window).width() < 768) {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      
        $('.sectin-footer-mb').css({
          "opacity": "0",
          "pointer-events": "none"
        })
        $('.stricky-order').css({
          "transform": "translateY(0)",
          "z-index": "10",
          "transition": "0.7s ease-in-out"
        })
    }

    else {
      $('.sectin-footer-mb').css({
        "opacity": "1",
        "pointer-events": "all"
      })
      $('.stricky-order').css({
        "transform": "translateY(-52px)",
        "z-index": "10",
        "transition": "0.7s ease-in-out"
      })
    }
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
    if ($(window).width() < 768) {
      $('.stricky-order').css({
        "transform": "translateY(-52px)",
        "z-index": "10",
        "transition": "0.7s ease-in-out"
      })
    }
   
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
