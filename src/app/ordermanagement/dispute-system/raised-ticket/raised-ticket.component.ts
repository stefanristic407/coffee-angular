import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-raised-ticket',
  templateUrl: './raised-ticket.component.html',
  styleUrls: ['./raised-ticket.component.css']
})
export class RaisedTicketComponent implements OnInit {
  term: any;
  roasterId: any = '';
  odd: boolean = false;
  public data: any[] = [];
  ticketRaise: any;
  constructor(public router: Router,
    public cookieService: CookieService,
    private roasterService: RoasterserviceService,
    private toastrService: ToastrService) {
    this.roasterId = this.cookieService.get('roaster_id');
  }

  ngOnInit(): void {
    /*$( ".raised-detils" ).click(function() {
      $( this ).toggleClass( "highlight" );
      $('.raised-mobile').toggleClass("active");
      });*/

    $(document).ready(function () {
      $('.order-raised').click(function () {
        $('li', $('.raised-mobile').parent()).removeClass('highlight');
        $(this).addClass('highlight');
        $('.raised-mobile').addClass("active");
      });

    });





    /* pagination start */
    let listCount = 0;
    let elLen;
    let newliLen;

    $(document).ready(function () {
      var pLen = $('.pagination-content').length;
      console.log(pLen)
      for (var x = 0; x < pLen; x++) {
        var elements = $('.pagination-content').eq(x).find(".pagination-content-list .pagination-content-list__item");
        var index = 0;
        elLen = elements.length;
        newliLen = Math.floor(elLen / 4) + 1;
        var showNextFour = function (index) {
          if (index >= elements.length) {
            index = 0;
          }


          elements.hide().slice(index, index + 4).show();

        }
        showNextFour(listCount);

        // $('.responsive-pagination-list')
        if (newliLen > 5) {
          for (var i = 1; i <= 5; i++) {
            var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
            $('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
            $('.pagination-content').eq(x).find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').addClass('active');
          }

        }

        else {
          for (var i = 1; i <= newliLen; i++) {
            var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
            $('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
            $('.pagination-content').eq(x).find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').addClass('active');
          }
        }

      }

    });


    //Next page
    $('body').on('click', '.responsive-pagination__next', function () {
      var step = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active');
      var steps = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item');
      var stepNext = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active').next('.responsive-pagination-list__item');
      var stepLastVal = parseInt($(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:last-child').text());
      $(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
      var pageNew = parseInt($('.page-new').text());
      var pagefind = stepLastVal - pageNew;



      var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
      elLen = elements.length;
      newliLen = Math.floor(elLen / 4) + 1;
      var index = 0;
      var showNextFour = function (index) {
        if (index >= elements.length) {
          index = 0;
        }

        elements.hide().slice(index, index + 4).show();

      }


      listCount = listCount + 4;
      showNextFour(listCount);

      var stepValue = stepNext.text();
      if (stepLastVal < newliLen) {
        stepNext.removeClass('active');
        stepNext.prev('.responsive-pagination-list__item').addClass('active');

        if (newliLen > 5) {
          for (var i = 0; i <= 4; i++) {
            var newStep = parseInt(steps.eq(i).text());

            if (pageNew == (stepLastVal - 1)) {
              return false;
            }

            else {
              steps.eq(i).text(newStep + 1);
            }
          }
        }

        else {
          for (var i = 0; i <= newliLen; i++) {
            var newStep = parseInt(steps.eq(i).text());

            if (pageNew == (stepLastVal - 1)) {
              return false;
            }

            else {
              steps.eq(i).text(newStep + 1);
            }
          }
        }

      }


      else {
        step.removeClass('active');
        stepNext.addClass('active')


        if (stepNext.is(':last-child')) {
          $(this).addClass('disable');

        }

      }




    });



    //Prev page
    $('body').on('click', '.responsive-pagination__prev', function () {
      var step = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active:last');
      var steps = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item');
      var stepPrev = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active').prev('.responsive-pagination-list__item');
      var stepFirst = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child');
      var stepLastVal = parseInt($(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:last-child').text());
      var activeFirst = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').hasClass('active');



      listCount = listCount - 4;

      var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
      elLen = elements.length;
      newliLen = Math.floor(elLen / 4) + 1;
      var index = 0;
      var showNextFour = function (index) {
        if (index >= elements.length) {
          index = 0;
        }

        elements.hide().slice(index, index + 4).show();

      }


      showNextFour(listCount);

      if (newliLen > 5) {

        for (var i = 0; i <= 4; i++) {
          var newStep = parseInt(steps.eq(i).text());



          if (stepLastVal <= 5) {
            stepPrev.addClass('active');
            step.removeClass('active');
          }

          else {
            steps.eq(i).text(newStep - 1);
          }
        }
      }

      else {
        for (var i = 0; i <= newliLen; i++) {
          var newStep = parseInt(steps.eq(i).text());



          if (stepLastVal <= newliLen) {
            stepPrev.addClass('active');
            step.removeClass('active');
          }

          else {
            steps.eq(i).text(newStep - 1);
          }
        }
      }



      if (stepFirst.text() == '1' && stepFirst.hasClass('active')) {
        $(this).addClass('disable');
        $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
      }


    });




    $('body').on('click', '.responsive-pagination-list__item', function () {
      $(this).parents('.pagination-content').find('.responsive-pagination-list__item').not(this).removeClass('active');
      $(this).addClass('active');
      var liStep = parseInt($(this).text());
      listCount = 4;
      if (liStep == 1) {
        $(this).parents('.pagination-content').find('.responsive-pagination__prev').addClass('disable');
        $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
        liStep = 0;
        listCount = 0;
        console.log(listCount)

        var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
        elLen = elements.length;
        newliLen = Math.floor(elLen / 4) + 1;
        var index = 0;
        var showNextFour = function (index) {
          if (index >= elements.length) {
            index = 0;
          }

          elements.hide().slice(index, index + 4).show();

        }


        showNextFour(listCount);
      }

      else {
        $(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
        $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
        listCount = (liStep * listCount) - 4;
        console.log(listCount)

        var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
        elLen = elements.length;
        newliLen = Math.floor(elLen / 4) + 1;
        var index = 0;
        var showNextFour = function (index) {
          if (index >= elements.length) {
            index = 0;
          }

          elements.hide().slice(index, index + 4).show();

        }


        showNextFour(listCount);
      }


      if (liStep == newliLen) {
        $(this).parents('.pagination-content').find('.responsive-pagination__next').addClass('disable');
      }


    });

    /* pagination ends */

    this.getRaisedTicketTableData();//calling table data onload
  }

  ticketDetails($event, group) {
    this.ticketRaise = group;

  }
  continueTicket(ticket?) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: ticket.order_id,
        ticketId: ticket.id
      }
    };
    this.router.navigate(["//ordermanagement/order-chat"], navigationExtras);
    //this.router.navigate(["/ordermanagement/order-chat"]);
  }
  getRaisedTicketTableData() {
    this.roasterService.getRaisedTicketData(this.roasterId).subscribe(
      data => {
        if (data['success'] == true) {
          if (data['result'] == null || data['result'].length == 0) {
            this.odd = true;
            this.toastrService.error("Table Data is empty");
          }
          else {
            this.odd = false;
            this.data = data['result'];
          }
        }
        else {
          this.odd = true;
          this.toastrService.error("Error while getting the agreement list!");
        }
      }
    )
  }

}
