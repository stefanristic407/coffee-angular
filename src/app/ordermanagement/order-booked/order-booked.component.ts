// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Booked.
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderBookedService } from './order-booked.service';
import { ActivatedRoute } from '@angular/router';
import { BookedGradeInfoComponent } from '../order-booked/booked-grade-info/booked-grade-info.component';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-order-booked',
  templateUrl: './order-booked.component.html',
  styleUrls: ['./order-booked.component.css']
})
export class OrderBookedComponent implements OnInit {
  @ViewChild('orderPlacedBooked', { static: false }) private orderPlacedBooked: ElementRef<HTMLElement>;
  @ViewChild('orderConfirmedBooked', { static: false }) private orderConfirmedBooked: ElementRef<HTMLElement>;
  @ViewChild('paymentBooked', { static: false }) private paymentBooked: ElementRef<HTMLElement>;
  @ViewChild('shippmentBooked', { static: false }) private shipmentBooked: ElementRef<HTMLElement>;
  @ViewChild('receivedBooked', { static: false }) private receivedBooked: ElementRef<HTMLElement>;
  @ViewChild('gradedBooked', { static: false }) private gradedBooked: ElementRef<HTMLElement>;

  bookedValueToShow: string = "Order Placed";
  orderBookedTimeline: boolean = true;
  shippmentShow: boolean = false;
  receivedOrderShow: boolean = false;
  confirmReport: boolean = false;
  paymentReceipt: boolean = false;
  shippmentReport: boolean = false;
  receivedReport: boolean = false;
  gradedReport: boolean = false;
  uploadReport: boolean = true;
  dataFromTable: any;

  cancelShow: boolean = false;
  totalstar = 5;
  newvalue: any = 4;

  constructor(public bookedService: OrderBookedService, private route: ActivatedRoute,
    public router: Router,public cookieService : CookieService) { }

  ngOnInit(): void {
     //Auth checking
     if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    
    //Fills the time line based on the status selected in estate order.
    this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams['data']);
    console.log("the data from table trigger is  : " + this.dataFromTable);
    if (this.dataFromTable == "Order confirmed") {
      this.bookedValueToShow = "Order Confirmed";
      setTimeout(() => {
        this.orderConfirmBooked();
      }, 500);
    }
    else if (this.dataFromTable == "Payment") {
      this.bookedValueToShow = "Payment";
      setTimeout(() => {
        this.paymentStatusBooked();
      }, 500);

    }
    else if (this.dataFromTable == "Shipped") {
      this.bookedValueToShow = "Shipped";
      setTimeout(() => {
        this.shipmentStatusBooked();
      }, 500);

    }
    else if (this.dataFromTable == "Received") {
      this.bookedValueToShow = "Received";
      setTimeout(() => {
        this.receivedStatusBooked();
      }, 500);
    }
    else if (this.dataFromTable == "Graded") {
      this.bookedValueToShow = "Graded";
      setTimeout(() => {
        this.gradedStatusBooked();
      }, 500);
    }


  }

  // Function Name : Order Placed
  // Description: This function fills order placed timeline .
  orderPlaceBooked() {
    this.bookedValueToShow = this.orderPlacedBooked.nativeElement.innerHTML;

  }
  // Function Name : Order Confirmed
  // Description: This function fills order Confirmed timeline and payment status is pending.
  orderConfirmBooked() {
    this.bookedValueToShow = this.orderConfirmedBooked.nativeElement.innerHTML;
    this.orderConfirmedBooked.nativeElement.style.color = "#000000";
    this.orderConfirmedBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('confirmDivBooked');
    completedProcess.classList.remove('completed');
    this.confirmReport = true;

  }
  // Function Name :Payment
  // Description: This function fills order Payment timeline and payment status will change to paid.
  paymentStatusBooked() {
    this.orderConfirmBooked();
    this.bookedValueToShow = this.paymentBooked.nativeElement.innerHTML;
    this.paymentBooked.nativeElement.style.color = "#000000";
    this.paymentBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('paymentDivBooked');
    completedProcess.classList.remove('completed');
    this.paymentReceipt = true;
    this.bookedService.paymentStatus();
  }
  // Function Name : Order Booked Shippment
  // Description: This function shows Tracking Id and Shippment Id in order details tab once shippment is done.
  shipmentStatusBooked() {
    this.paymentStatusBooked();
    this.bookedValueToShow = this.shipmentBooked.nativeElement.innerHTML;
    this.shipmentBooked.nativeElement.style.color = "#000000";
    this.shipmentBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('shippmentDivBooked');
    completedProcess.classList.remove('completed');
    this.shippmentReport = true;
    this.bookedService.shipmentDone = true;

  }
  // Function Name : Order Booked Received
  // Description: This function fills timeline of order received.
  receivedStatusBooked() {
    this.shipmentStatusBooked();
    this.bookedValueToShow = this.receivedBooked.nativeElement.innerHTML;
    this.receivedBooked.nativeElement.style.color = "#000000";
    this.receivedBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('receivedDivBooked');
    completedProcess.classList.remove('completed');
    this.receivedReport = true;
  }

  // Function Name : Order Booked Graded
  // Description: This function shows order is graded and grade info tab timeline is filled.
  gradedStatusBooked() {
    this.receivedStatusBooked();
    this.bookedValueToShow = this.gradedBooked.nativeElement.innerHTML;
    this.gradedBooked.nativeElement.style.color = "#000000";
    this.gradedBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('gradedDivBooked');
    completedProcess.classList.remove('completed');
    this.uploadReport = false;
    this.gradedReport = true;
    $('#pills-contact-tab')[0].click();
    setTimeout(() => {
      this.orderBookedTimeline = false;
      this.shippmentShow = true;
    }, 2000);

    // Calling the Grade info component by creating object of the component and accessing its methods

    let callGradeInfo = new BookedGradeInfoComponent(this.bookedService);
    callGradeInfo.gradedComplete();


  }

  //Confirm Shippment shows and timeline hides
  receivedShippment() {
    this.shippmentShow = false;
    this.receivedOrderShow = true;
  }
  // Function Name : Order Booked Cancel Button
  // Description: This function helps to cancel the order.
  cancelOrder() {
    this.orderBookedTimeline = false;
    this.cancelShow = true;
    this.shippmentShow = false;
    this.receivedOrderShow = false;

  }
  //Click on cancel button scrolls to cancel div

  ngAfterViewInit() {
    $(".cancel-order-btn").click(function () {
      $('html,body').animate({
        scrollTop: $(".cancel-predisplay").offset().top
      },
        500);
    });
  }
  // onRateBooked($event:{ newValue:number}) {

  //   this.newvalue=$event.newValue;
  //  console.log(this.newvalue);
  // }
}
