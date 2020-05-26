import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { OrderBookedService } from './order-booked.service';
import { ActivatedRoute } from '@angular/router';
import { BookedGradeInfoComponent } from '../order-booked/booked-grade-info/booked-grade-info.component';
declare var $ : any;

@Component({
  selector: 'app-order-booked',
  templateUrl: './order-booked.component.html',
  styleUrls: ['./order-booked.component.css']
})
export class OrderBookedComponent implements OnInit {
  @ViewChild('orderPlacedBooked',{static: false}) private orderPlacedBooked: ElementRef<HTMLElement>;
  @ViewChild('orderConfirmedBooked',{static: false}) private orderConfirmedBooked  : ElementRef<HTMLElement>;
  @ViewChild('paymentBooked',{static: false}) private paymentBooked : ElementRef<HTMLElement>;
  @ViewChild('shippmentBooked',{static: false}) private shipmentBooked : ElementRef<HTMLElement>;
  @ViewChild('receivedBooked',{static: false}) private receivedBooked : ElementRef<HTMLElement>;
  @ViewChild('gradedBooked',{static: false}) private gradedBooked : ElementRef<HTMLElement>;

  bookedValueToShow : string = "Order Placed";
  orderBookedTimeline : boolean = true;
  shippmentShow : boolean = false;
  receivedOrderShow : boolean = false;
  confirmReport:boolean = false;
  paymentReceipt:boolean =false;
  shippmentReport:boolean =false;
  receivedReport:boolean =false;
  gradedReport:boolean=false;
  uploadReport:boolean=true;
  dataFromTable: any;

  cancelShow : boolean = false;
  totalstar = 5;
  newvalue:any= 4;

  constructor(public bookedService : OrderBookedService,  private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams['data']);
    console.log("the data from table trigger is  : " + this.dataFromTable);
    if(this.dataFromTable == "Order Confirmed"){
      this.bookedValueToShow = "Order Confirmed";
      setTimeout(()=>{
        this.orderConfirmBooked();
      },500);
    }
    else if(this.dataFromTable == "Payment"){
      this.bookedValueToShow = "Payment";
    setTimeout(()=>{
      this.paymentStatusBooked();
    },500);

    }
    else if(this.dataFromTable == "Shipped"){
      this.bookedValueToShow = "Shipped";
    setTimeout(()=>{
      this.shipmentStatusBooked();
    },500);
      
    }
    else if(this.dataFromTable == "Received"){
      this.bookedValueToShow = "Received";
      setTimeout(()=>{
        this.receivedStatusBooked();
      },500);
    }
    else if(this.dataFromTable == "Graded"){
      this.bookedValueToShow = "Graded";
      setTimeout(()=>{
        this.gradedStatusBooked();
      },500);
    }
   

  }

  orderPlaceBooked(){
    this.bookedValueToShow = this.orderPlacedBooked.nativeElement.innerHTML;

  }
  orderConfirmBooked(){
    this.bookedValueToShow = this.orderConfirmedBooked.nativeElement.innerHTML;
this.orderConfirmedBooked.nativeElement.style.color = "#000000";
this.orderConfirmedBooked.nativeElement.style.fontWeight = "bold";
const completedProcess = document.getElementById('confirmDivBooked');
completedProcess.classList.remove('completed');
this.confirmReport=true;

  }
  paymentStatusBooked(){
    this.orderConfirmBooked();
    this.bookedValueToShow = this.paymentBooked.nativeElement.innerHTML;
    this.paymentBooked.nativeElement.style.color = "#000000";
    this.paymentBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('paymentDivBooked');
    completedProcess.classList.remove('completed');
    this.paymentReceipt=true;
this.bookedService.paymentStatus();
  }
  shipmentStatusBooked(){
    this.paymentStatusBooked();
    this.bookedValueToShow = this.shipmentBooked.nativeElement.innerHTML;
    this.shipmentBooked.nativeElement.style.color = "#000000";
    this.shipmentBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('shippmentDivBooked');
    completedProcess.classList.remove('completed');
    this.shippmentReport=true;

  }
  receivedStatusBooked(){
    this.shipmentStatusBooked();
    this.bookedValueToShow = this.receivedBooked.nativeElement.innerHTML;
    this.receivedBooked.nativeElement.style.color = "#000000";
    this.receivedBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('receivedDivBooked');
    completedProcess.classList.remove('completed');
    this.receivedReport=true;
  }
  gradedStatusBooked(){
    this.receivedStatusBooked();
    this.bookedValueToShow = this.gradedBooked.nativeElement.innerHTML;
    this.gradedBooked.nativeElement.style.color = "#000000";
    this.gradedBooked.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('gradedDivBooked');
    completedProcess.classList.remove('completed');
    this.uploadReport=false;
    this.gradedReport=true;
    $('#pills-contact-tab')[0].click();
    setTimeout(()=> {
    this.orderBookedTimeline = false;
    this.shippmentShow = true;
    },2000);
    
    // Calling the Grade info component by creating object of the component and accessing its methods

    let callGradeInfo = new BookedGradeInfoComponent(this.bookedService);
    callGradeInfo.gradedComplete();
    
    
  }
  receivedShippment(){
	  this.shippmentShow= false;
	  this.receivedOrderShow= true;
  }

  cancelOrder(){
    this.orderBookedTimeline = false;
    this.cancelShow = true;
    this.shippmentShow = false;
  this.receivedOrderShow= false;

  }
  ngAfterViewInit(){
    $(".cancel-order-btn").click(function() {
      $('html,body').animate({
        scrollTop: $(".cancel-predisplay").offset().top},
        500);
      });
  }
  // onRateBooked($event:{ newValue:number}) {
  
  //   this.newvalue=$event.newValue;
  //  console.log(this.newvalue);
  // }
}
