import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { OrderSampleService } from './order-sample.service';
import { ActivatedRoute } from '@angular/router';
import { GradeInfoComponent } from '../order-sample/grade-info/grade-info.component';
@Component({
  selector: 'app-order-sample',
  templateUrl: './order-sample.component.html',
  styleUrls: ['./order-sample.component.css']
})
export class OrderSampleComponent implements OnInit {
  @ViewChild('orderPlacedSample',{static: false}) private orderPlacedSample: ElementRef<HTMLElement>;
  @ViewChild('orderConfirmedSample',{static: false}) private orderConfirmedSample  : ElementRef<HTMLElement>;
  @ViewChild('paymentSample',{static: false}) private payment : ElementRef<HTMLElement>;
  @ViewChild('shippmentSample',{static: false}) private shippmentSample : ElementRef<HTMLElement>;
  @ViewChild('receivedSample',{static: false}) private receivedSample : ElementRef<HTMLElement>;
  @ViewChild('gradedSample',{static: false}) private gradedSample : ElementRef<HTMLElement>;

  sampleValueToShow : string = "Order Placed";
  orderSampleTimeline : boolean = true;
  confirmShow : boolean = false;
  confirmReport:boolean = false;
  shippmentReport:boolean =false;
  receivedReport:boolean =false;
  gradedReportSample:boolean=false;
  uploadReportSample:boolean=true;

  dataFromTable : any;

  cancelShow : boolean = false;
  totalstar = 5;
  newvalue:any=2;

  constructor(private sampleService:OrderSampleService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams['data']);
    console.log("the data from table trigger is  : " + this.dataFromTable);
    if(this.dataFromTable == "Order Confirmed"){
      this.sampleValueToShow = "Order Confirmed";
      setTimeout(()=>{
        this.orderConfirmSample();
      },500);
    }
    else if(this.dataFromTable == "Payment"){
      this.sampleValueToShow = "Payment";
    setTimeout(()=>{
      this.paySample();
    },500);

    }
    else if(this.dataFromTable == "Shipped"){
      this.sampleValueToShow = "Shipped";
    setTimeout(()=>{
      this.shipmentStatusSample();
    },500);
      
    }
    else if(this.dataFromTable == "Received"){
      this.sampleValueToShow = "Received";
      setTimeout(()=>{
        this.receivedStatusSample();
      },500);
    }
    else if(this.dataFromTable == "Graded"){
      this.sampleValueToShow = "Graded";
      setTimeout(()=>{
        this.gradedStatusSample();
      },500);
    }
   




  }
  orderPlaceSample(){
    this.sampleValueToShow = this.orderPlacedSample.nativeElement.innerHTML;

  }
  orderConfirmSample(){
    this.sampleValueToShow = this.orderConfirmedSample.nativeElement.innerHTML;
this.orderConfirmedSample.nativeElement.style.color = "#000000";
this.orderConfirmedSample.nativeElement.style.fontWeight = "bold";
const completedProcess = document.getElementById('confirmDivSample');
completedProcess.classList.remove('completed');
this.confirmReport=true;

  }
  paySample(){
    this.orderConfirmSample();
    this.sampleValueToShow = this.payment.nativeElement.innerHTML;
    this.payment.nativeElement.style.color = "#000000";
    this.payment.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('paymentDivSample');
    completedProcess.classList.remove('completed');
    this.sampleService.paymentStatus();
  }
  shipmentStatusSample(){
    this.paySample();
    this.sampleValueToShow = this.shippmentSample.nativeElement.innerHTML;
    this.shippmentSample.nativeElement.style.color = "#000000";
    this.shippmentSample.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('shippmentDivSample');
    completedProcess.classList.remove('completed');
    this.shippmentReport=true;

  }
  receivedStatusSample(){
    this.shipmentStatusSample();
    this.sampleValueToShow = this.receivedSample.nativeElement.innerHTML;
    this.receivedSample.nativeElement.style.color = "#000000";
    this.receivedSample.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('receivedDivSample');
    completedProcess.classList.remove('completed');
    this.receivedReport=true;
  }
  gradedStatusSample(){
    this.receivedStatusSample();
    this.sampleValueToShow = this.gradedSample.nativeElement.innerHTML;
    this.gradedSample.nativeElement.style.color = "#000000";
    this.gradedSample.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('gradedDivSample');
    completedProcess.classList.remove('completed');
    this.uploadReportSample=false;
    this.gradedReportSample=true;
    $('#pills-contact-tab')[0].click();
    setTimeout(()=> {
    this.orderSampleTimeline = false;
    this.confirmShow = true;
    },2000);

    // Calling the Grade info component by creating object of the component and accessing its methods

    let callGradeInfo = new GradeInfoComponent(this.sampleService);
    callGradeInfo.gradeComplete();

    
  }
 
cancelOrder(){
  this.orderSampleTimeline = false;
  this.confirmShow = false;
  this.cancelShow = true;
}
ngAfterViewInit(){
  $(".cancel-order-btn").click(function() {
    $('html,body').animate({
      scrollTop: $(".cancel-predisplay").offset().top},
      500);
    });
}
// onRate($event:{ newValue:number}) {
  
//   this.newvalue=$event.newValue;
//  console.log(this.newvalue);
// }

}
