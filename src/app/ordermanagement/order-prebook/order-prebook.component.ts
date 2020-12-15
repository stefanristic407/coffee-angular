// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Pre-Book.
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderPrebookService } from './order-prebook.service';
import { ActivatedRoute } from '@angular/router';
import { PrebookGradeInfoComponent } from './prebook-grade-info/prebook-grade-info.component';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';

declare var $: any;
@Component({
  selector: 'app-order-prebook',
  templateUrl: './order-prebook.component.html',
  styleUrls: ['./order-prebook.component.css']
})
export class OrderPrebookComponent implements OnInit {
  @ViewChild('orderPlaced', { static: false }) private orderPlaced: ElementRef<HTMLElement>;
  @ViewChild('orderConfirmed', { static: false }) private orderConfirmed: ElementRef<HTMLElement>;
  @ViewChild('payment', { static: false }) private payment: ElementRef<HTMLElement>;
  @ViewChild('harvestReady', { static: false }) private harvestReady: ElementRef<HTMLElement>;
  @ViewChild('graded', { static: false }) private graded: ElementRef<HTMLElement>;
  @ViewChild('myForm') myForm;


  // @ViewChild('pills-contact-tab',{static: false}) private pillsContact : ElementRef<HTMLElement>;
  valueToShow: string = "Order Placed";

  harvestInfo: boolean = false;
  orderTimeline: boolean = true;
  cancelShow: boolean = false;
  confirmOrderShow: boolean = false;
  greenIconShow: boolean = false;

  dataFromTable: any;
  totalstar = 5;
  newvalue: any = 4;

  
  public multi = [

		{
			"name": "Legend1",
			"series": [
			  {
				  "name": "27",
				  "value": 10
				},
				{
				  "name": "28",
				  "value": 8
				},
				{
				  "name": "1",
				  "value": 12
				},
				{
				  "name": "2",
				  "value": 19
				},
				{
				  "name": "3",
				  "value": 16
				},
				{
				  "name": "4",
				  "value": 11
				},
				{
				  "name": "5",
				  "value": 13
				},{
				  "name": "6",
				  "value": 23
				},{
				  "name": "7",
				  "value": 18
				},
				{
				  "name": "8",
				  "value": 18
				},
				{
					"name": "9",
					"value": 17
				  },{
					"name": "10",
					"value": 18
				  },{
					"name": "11",
					"value": 13
				  },
				  {
					"name": "12",
					"value": 17
				  },
				  {
					"name": "13",
					"value": 12
				  },
				  {
					"name": "14",
					"value": 10
				  }
			]
		  },
		{
		  "name": "Legend2",
		  "series": [
			{
			  "name": "27",
			  "value": 7
			},
			{
			  "name": "28",
			  "value": 2
			},
			{
			  "name": "1",
			  "value": 4
			},
			{
			  "name": "2",
			  "value": 9
			},
			{
			  "name": "3",
			  "value": 7
			},
			{
			  "name": "4",
			  "value": 3
			},
			{
			  "name": "5",
			  "value": 20
			},{
			  "name": "6",
			  "value": 15
			},{
			  "name": "7",
			  "value": 10
			},
			{
			  "name": "8",
			  "value": 15
			}
			,
			{
				"name": "9",
				"value": 13
			  },{
				"name": "10",
				"value": 13
			  },{
				"name": "11",
				"value": 10
			  },
			  {
				"name": "12",
				"value": 8
			  },
			  {
				"name": "13",
				"value": 7
			  },
			  {
				"name": "14",
				"value": 9
			  }
		  ]
		}];
	  
	  

    view: any[] = [1080, 340];

    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = 'Temperature (°C)';
    timeline = true;
    roundDomains = true;
  
    colorScheme = {
      domain: ['#f19634','#7c6be8']
    };
  
    // line, area
    autoScale = true;
    appLanguage? :any;
    orderPreBookId: any;
  countryValue: any;
  constructor(public prebookService: OrderPrebookService, private route: ActivatedRoute,
    public router: Router,public cookieService : CookieService,
    public globals: GlobalsService,public profileservice:RoasteryProfileService) {
      this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams['data']);
      this.orderPreBookId = decodeURIComponent(this.route.snapshot.queryParams['id']);
      this.prebookService.orderPreId=this.orderPreBookId;
      this.prebookService.viewPrebookOrderDetails();
     }

  ngOnInit(): void {
     //Auth checking
     if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    this.appLanguage = this.globals.languageJson;

    //Fills the time line based on the status selected in estate order.
    if (this.dataFromTable == "CONFIRMED") {
      this.valueToShow = "Order Confirmed";
      setTimeout(() => {
        this.orderConfirm();
      }, 500);
    }
    else if (this.dataFromTable == "Payment") {
      this.valueToShow = "Payment";
      setTimeout(() => {
        this.paymentStatus();
      }, 500);

    }
    else if (this.dataFromTable == "Harvest Ready") {
      this.valueToShow = "Harvest Ready";
      setTimeout(() => {
        this.harvest();
      }, 500);

    }

    else if (this.dataFromTable == "Graded") {
      this.valueToShow = "Graded";
      setTimeout(() => {
        this.gradedStatus();
      }, 500);
    }

  }

  // Function Name : Order Placed
  // Description: This function fills order placed timeline .
  orderPlace() {
    this.valueToShow = this.orderPlaced.nativeElement.innerHTML;
  }
  // Function Name : Order Confirmed
  // Description: This function fills order Confirmed timeline and payment status is pending.
  orderConfirm() {
    this.valueToShow = this.orderConfirmed.nativeElement.innerHTML;
    this.orderConfirmed.nativeElement.style.color = "#232334";
    this.orderConfirmed.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('confirmDiv');
    completedProcess.classList.remove('completed');
  }
  // Function Name :Payment
  // Description: This function fills order Payment timeline and payment status will change to paid.
  paymentStatus() {
    this.orderConfirm();
    this.valueToShow = this.payment.nativeElement.innerHTML;
    this.payment.nativeElement.style.color = "#232334";
    this.payment.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('paymentDiv');
    completedProcess.classList.remove('completed');
    this.prebookService.changePaymentStatus();
  }
  // Function Name : Order Pre-book harvest Ready
  // Description: This function fills harvest timeline and click on follow your harvest will scroll to harvest details.

  harvest() {
    this.paymentStatus();
    this.valueToShow = this.harvestReady.nativeElement.innerHTML;
    this.harvestReady.nativeElement.style.color = "#232334";
    this.harvestReady.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('harvestDiv');
    completedProcess.classList.remove('completed');
  }
  // Function Name : Order Pre-Book Graded
  // Description: This function shows order is graded and grade info tab timeline is filled.
  gradedStatus() {
    this.harvest();
    this.valueToShow = this.graded.nativeElement.innerHTML;
    this.graded.nativeElement.style.color = "#232334";
    this.graded.nativeElement.style.fontWeight = "bold";
    const completedProcess = document.getElementById('gradedDiv');
    completedProcess.classList.remove('completed');
    // this.pillsContact[0].nativeElement.click();
    $("#pills-contact-tab")[0].click();

    setTimeout(() => {
      this.orderTimeline = false;
      this.confirmOrderShow = true;
    }, 2000)

    // Calling the Grade info component by creating object of the component and accessing its methods

    let callGradeInfo = new PrebookGradeInfoComponent(this.prebookService,this.globals);
    callGradeInfo.gradeComplete();



  }

  //shows Harvest div
  showHarvest() {
    this.harvestInfo = !this.harvestInfo;
  }

  // Function Name : Order Pre-Book Cancel Button
  // Description: This function helps to cancel the order.
  cancelOrder() {
    this.orderTimeline = false;
    this.cancelShow = true;
    this.confirmOrderShow = false;
  }
  // Function Name : Order Pre-Book Buy the order
  // Description: This function helps to buy the order and redirects to order-confirm page.
  // buyIt() {
  //   this.orderTimeline = true;
  //   this.cancelShow = false;
  // }

  //Click on harvest button scrolls to harvest div

  ngAfterViewInit() {
    $(".havestShow").click(function () {
      $('html,body').animate({
        scrollTop: $(".harvest-content").offset().top
      },
        500);
    });

    //Click on cancel button scrolls to cancel div

    $(".cancel-order-btn").click(function () {
      $('html,body').animate({
        scrollTop: $(".cancel-predisplay").offset().top
      },
        500);
    });

    //chat 

		const toggleChatboxBtn = document.querySelector(".js-chatbox-toggle");
    const chatbox = document.querySelector(".js-chatbox");
    const chatboxMsgDisplay = document.querySelector(".js-chatbox-display");
    const chatboxForm = document.querySelector(".js-chatbox-form");
    
    // Use to create chat bubble when user submits text
    // Appends to display
    const createChatBubble = input => {
      const chatSection = document.createElement("p");
      chatSection.textContent = input;
      chatSection.classList.add("chatbox__display-chat");
    
      chatboxMsgDisplay.appendChild(chatSection);
    };
    
    // Toggle the visibility of the chatbox element when clicked
    // And change the icon depending on visibility
    toggleChatboxBtn.addEventListener("click", () => {
      chatbox.classList.toggle("chatbox--is-visible");
    
      if (chatbox.classList.contains("chatbox--is-visible")) {
        toggleChatboxBtn.innerHTML = '<i class="pi pi-angle-down" style="float:right; margin-top:-11px;"></i>';
      } else {
        toggleChatboxBtn.innerHTML = '<i class="pi pi-angle-up" style="float:right; margin-top:-11px;"></i>';
      }
    });
    
    // Form input using method createChatBubble
    // To append any user message to display
    chatboxForm.addEventListener("submit", e => {
    //   const chatInput = document.querySelector(".js-chatbox-input");
      const chatInput=(document.getElementById("js-chatbox-input") as HTMLInputElement).value;
    //   console.log("chat text coming"+chatInput);
    
      createChatBubble(chatInput);
    
      e.preventDefault();
      this.myForm.nativeElement.reset();
    });
    
      }
      // onRate($event:{ newValue:number}) {
    
      //   this.newvalue=$event.newValue;
      //  console.log(this.newvalue);
      // }

      GetCountry(data:any){
        // console.log(data.toUpperCase());
        if(data){
          this.countryValue=this.profileservice.countryList.find(con =>con.isoCode == data.toUpperCase());
          if(this.countryValue){
          return this.countryValue.name;
          }
        }
      }
    
  }


