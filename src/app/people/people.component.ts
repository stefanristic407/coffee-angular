// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Navbar.

import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/services/users/userservice.service';
import { DirectMessagingComponent } from '../ordermanagement/direct-messaging/direct-messaging.component';
// import * as $ from 'jquery';
declare var $: any;

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

  constructor(private elementRef: ElementRef,
    private cookieService: CookieService,
    private userService: UserserviceService,
    private router: Router,
    private toastrService: ToastrService
     ) { }
    ngOnInit(): void {

    this.roaster_id = this.cookieService.get("roaster_id");
    this.user_id = this.cookieService.get("user_id");
    this.getUserValue();



    }




  // Function Name : User Value
  // Description: This function helps to get the details of the logged in user and show the username in header

  getUserValue() {
    this.userService.getRoasterUserData(this.roaster_id, this.user_id).subscribe(
      response => {
        this.userName = response['result']['firstname'] + " " + response['result']['lastname'];
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

  $(window).on('load', function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
});

  }

  
}
