// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of Navbar.

import { Component, ElementRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
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
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    // $('[data-toggle="tooltip"]').tooltip(); 

    // $( ".mytogglecl" ).click(function() {
    //   alert( "Handler for .click() called." );
    // });
    //copy pasted all custom JS code here.....
    this.roaster_id = this.cookieService.get("roaster_id");
    this.user_id = this.cookieService.get('user_id');
    this.getUserValue();


    // Function Name : sidebar
    // Description: This function helps to the side bar functionality.

    $(function () {
      "use strict";

      // ============================================================== 
      // Theme options
      // ==============================================================     
      // ============================================================== 
      // sidebar-hover
      // ==============================================================

      $(".left-sidebar").hover(
        function () {
          $(".navbar-header").addClass("expand-logo");
        },
        function () {
          $(".navbar-header").removeClass("expand-logo");
        }
      );
      // this is for close icon when navigation open in mobile view
      $(".nav-toggler").on('click', function () {
        $("#main-wrapper").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
      });
      $(".nav-lock").on('click', function () {
        $("body").toggleClass("lock-nav");
        $(".nav-lock i").toggleClass("mdi-toggle-switch-off");
        $("body, .page-wrapper").trigger("resize");
      });
      $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
        $(".app-search").toggle(200);
        $(".app-search input").focus();
      });

      // ============================================================== 
      // Right sidebar options
      // ==============================================================
      $(function () {
        $(".service-panel-toggle").on('click', function () {
          $(".customizer").toggleClass('show-service-panel');

        });
        $('.page-wrapper').on('click', function () {
          $(".customizer").removeClass('show-service-panel');
        });
      });
      // ============================================================== 
      // This is for the floating labels
      // ============================================================== 
      $('.floating-labels .form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');

      // ============================================================== 
      //tooltip
      // ============================================================== 
      // $(function() {
      //     $('[data-toggle="tooltip"]').tooltip()
      // })
      // ============================================================== 
      //Popover
      // ============================================================== 
      // $(function() {
      //     $('[data-toggle="popover"]').popover()
      // })

      // ============================================================== 
      // Perfact scrollbar
      // ============================================================== 
      // $('.message-center, .customizer-body, .scrollable').perfectScrollbar({
      //     wheelPropagation: !0
      // });

      /*var ps = new PerfectScrollbar('.message-body');
      var ps = new PerfectScrollbar('.notifications');
      var ps = new PerfectScrollbar('.scroll-sidebar');
      var ps = new PerfectScrollbar('.customizer-body');*/

      // ============================================================== 
      // Resize all elements
      // ============================================================== 
      $("body, .page-wrapper").trigger("resize");
      $(".page-wrapper").show();
      // ============================================================== 
      // To do list
      // ============================================================== 
      $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
      });

      //****************************
      /* This is for the mini-sidebar if width is less then 1170*/
      //**************************** 
      var setsidebartype = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        if (width < 1170) {
          $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        } else {
          $("#main-wrapper").attr("data-sidebartype", "full");
        }
      };
      $(window).ready(setsidebartype);
      $(window).on("resize", setsidebartype);
      //****************************
      /* This is for sidebartoggler*/
      //****************************
      $('.sidebartoggler').on("click", function () {
        $("#main-wrapper").toggleClass("mini-sidebar");
        if ($("#main-wrapper").hasClass("mini-sidebar")) {
          $(".sidebartoggler").prop("checked", !0);
          $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        } else {
          $(".sidebartoggler").prop("checked", !1);
          $("#main-wrapper").attr("data-sidebartype", "full");
        }
      });
    });


    // ============================================================== 
    // Auto select left navbar
    // ============================================================== 
    $(function () {
      "use strict";
      var url = window.location + "";
      var path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");
      var element = $('ul#sidebarnav a').filter(function () {
        return this.href === url || this.href === path;// || url.href.indexOf(this.href) === 0;
      });
      element.parentsUntil(".sidebar-nav").each(function (index) {
        if ($(this).is("li") && $(this).children("a").length !== 0) {
          $(this).children("a").addClass("active");
          $(this).parent("ul#sidebarnav").length === 0
            ? $(this).addClass("active")
            : $(this).addClass("selected");
        }
        else if (!$(this).is("ul") && $(this).children("a").length === 0) {
          $(this).addClass("selected");

        }
        else if ($(this).is("ul")) {
          $(this).addClass('in');
        }

      });

      element.addClass("active");
      $('#sidebarnav a').on('click', function (e) {

        if (!$(this).hasClass("active")) {
          // hide any open menus and remove all other classes
          $("ul", $(this).parents("ul:first")).removeClass("in");
          $("a", $(this).parents("ul:first")).removeClass("active");

          // open our new menu and add the open class
          $(this).next("ul").addClass("in");
          $(this).addClass("active");

        }
        else if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).parents("ul:first").removeClass("active");
          $(this).next("ul").removeClass("in");
        }
      })
      $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
        e.preventDefault();
      });

    });


    // Function Name : Stricky header
    // Description: This function helps to the stricky header.

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
      if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        document.getElementById("navbar-sewn").style.backgroundColor = "#ffffff";
        document.getElementById("white-sewn-logo").style.display = "none";
        document.getElementById("black-sewn-logo").style.display = "block";
        document.getElementById("white-add").style.display = "none";
        document.getElementById("black-add").style.display = "block";
        document.getElementById("white-msg").style.display = "none";
        document.getElementById("black-msg").style.display = "block";
        document.getElementById("white-alert").style.display = "none";
        document.getElementById("black-alert").style.display = "block";
        document.getElementById("white-search").style.display = "none";
        document.getElementById("black-search").style.display = "block";
        document.getElementById("username-black").style.color = "black";
        // document.getElementById("admin-black").style.color = "black";
        document.getElementById("menu-close").style.color = "black";


      } else {
        document.getElementById("navbar-sewn").style.backgroundColor = "transparent";
        document.getElementById("white-sewn-logo").style.display = "block";
        document.getElementById("black-sewn-logo").style.display = "none";
        document.getElementById("white-add").style.display = "block";
        document.getElementById("black-add").style.display = "none";
        document.getElementById("white-msg").style.display = "block";
        document.getElementById("black-msg").style.display = "none";
        document.getElementById("white-alert").style.display = "block";
        document.getElementById("black-alert").style.display = "none";
        document.getElementById("white-search").style.display = "block";
        document.getElementById("black-search").style.display = "none";
        document.getElementById("username-black").style.color = "white";
        // document.getElementById("admin-black").style.color = "white";
        document.getElementById("menu-close").style.color = "white";



      }
    }



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

          console.log("Logout successfully !");
          this.toastrService.success("Logout successfully !");
        }
        else {
          console.log("Error while Logout!");
          this.toastrService.error("Error while Logout!");
        }
      }
    )
  }


  ngAfterViewInit() {
    $(".closed-link").click(function () {
      $(".ti-close").addClass("ti-menu");
      $(".checking").addClass("ti-menu");
      $("#main-wrapper").removeClass("show-sidebar");

    });


  }

}
