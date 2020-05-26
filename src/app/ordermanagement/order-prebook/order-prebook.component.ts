import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderPrebookService } from './order-prebook.service';
import { ActivatedRoute } from '@angular/router';
import { PrebookGradeInfoComponent } from './prebook-grade-info/prebook-grade-info.component';
declare var $ : any;
@Component({
  selector: 'app-order-prebook',
  templateUrl: './order-prebook.component.html',
  styleUrls: ['./order-prebook.component.css']
})
export class OrderPrebookComponent implements OnInit {
  @ViewChild('orderPlaced',{static: false}) private orderPlaced: ElementRef<HTMLElement>;
  @ViewChild('orderConfirmed',{static: false}) private orderConfirmed  : ElementRef<HTMLElement>;
  @ViewChild('payment',{static: false}) private payment : ElementRef<HTMLElement>;
  @ViewChild('harvestReady',{static: false}) private harvestReady : ElementRef<HTMLElement>;
  @ViewChild('graded',{static: false}) private graded : ElementRef<HTMLElement>;
  
  // @ViewChild('pills-contact-tab',{static: false}) private pillsContact : ElementRef<HTMLElement>;
  valueToShow : string = "Order Placed";

  harvestInfo : boolean = false;
  orderTimeline : boolean = true;
  cancelShow : boolean = false;
  confirmOrderShow : boolean = false;
  dataFromTable : any;
  totalstar = 5;
  newvalue:any= 4;
  
  constructor(public prebookService : OrderPrebookService,  private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams['data']);
    if(this.dataFromTable == "Order Confirmed"){
      this.valueToShow = "Order Confirmed";
      setTimeout(()=>{
        this.orderConfirm();
      },500);
    }
    else if(this.dataFromTable == "Payment"){
      this.valueToShow = "Payment";
    setTimeout(()=>{
      this.paymentStatus();
    },500);

    }
    else if(this.dataFromTable == "Harvest Ready"){
      this.valueToShow = "Harvest Ready";
    setTimeout(()=>{
      this.harvest();
    },500);
      
    }
 
    else if(this.dataFromTable == "Graded"){
      this.valueToShow = "Graded";
      setTimeout(()=>{
        this.gradedStatus();
      },500);
    }
   
  }

  orderPlace(){

    this.valueToShow = this.orderPlaced.nativeElement.innerHTML;
  }
  orderConfirm(){
this.valueToShow = this.orderConfirmed.nativeElement.innerHTML;
this.orderConfirmed.nativeElement.style.color = "#000000";
this.orderConfirmed.nativeElement.style.fontWeight = "bold";
const completedProcess = document.getElementById('confirmDiv');
completedProcess.classList.remove('completed');
  }
 paymentStatus(){
   this.orderConfirm();
  this.valueToShow = this.payment.nativeElement.innerHTML;
  this.payment.nativeElement.style.color = "#000000";
  this.payment.nativeElement.style.fontWeight = "bold";
  const completedProcess = document.getElementById('paymentDiv');
  completedProcess.classList.remove('completed');
  this.prebookService.changePaymentStatus();
 }
 harvest(){
   this.paymentStatus();
  this.valueToShow = this.harvestReady.nativeElement.innerHTML;
  this.harvestReady.nativeElement.style.color = "#000000";
  this.harvestReady.nativeElement.style.fontWeight = "bold";
  const completedProcess = document.getElementById('harvestDiv');
  completedProcess.classList.remove('completed');
 }
 gradedStatus(){
   this.harvest();
  this.valueToShow = this.graded.nativeElement.innerHTML;
  this.graded.nativeElement.style.color = "#000000";
  this.graded.nativeElement.style.fontWeight = "bold";
  const completedProcess = document.getElementById('gradedDiv');
  completedProcess.classList.remove('completed');
  // this.pillsContact[0].nativeElement.click();
  $("#pills-contact-tab")[0].click();

 setTimeout(()=> {
  this.orderTimeline = false;
  this.confirmOrderShow = true;
 },2000)
     
 // Calling the Grade info component by creating object of the component and accessing its methods

      let callGradeInfo = new PrebookGradeInfoComponent(this.prebookService);
      callGradeInfo.gradeComplete();
  
      
  
 }

  showHarvest(){
    this.harvestInfo = !this.harvestInfo;
  }

  cancelOrder(){
    this.orderTimeline = false;
    this.cancelShow = true;
    this.confirmOrderShow = false;
  }
  buyIt(){
    this.orderTimeline = true;
    this.cancelShow = false;
  }

ngAfterViewInit(){
  $(".havestShow").click(function() {
    $('html,body').animate({
        scrollTop: $(".harvest-content").offset().top},
        500);
});

$(".cancel-order-btn").click(function() {
$('html,body').animate({
  scrollTop: $(".cancel-predisplay").offset().top},
  500);
});
}

}
