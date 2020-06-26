// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Sample.
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderSampleService } from './order-sample.service';
import { ActivatedRoute } from '@angular/router';
import { GradeInfoComponent } from '../order-sample/grade-info/grade-info.component';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { OrderDetailsComponent } from '../order-sample/order-details/order-details.component';

@Component({
	selector: 'app-order-sample',
	templateUrl: './order-sample.component.html',
	styleUrls: ['./order-sample.component.css']
})
export class OrderSampleComponent implements OnInit {
	@ViewChild('orderPlacedSample', { static: false }) private orderPlacedSample: ElementRef<HTMLElement>;
	@ViewChild('orderConfirmedSample', { static: false }) private orderConfirmedSample: ElementRef<HTMLElement>;
	@ViewChild('paymentSample', { static: false }) private payment: ElementRef<HTMLElement>;
	@ViewChild('shippmentSample', { static: false }) private shippmentSample: ElementRef<HTMLElement>;
	@ViewChild('receivedSample', { static: false }) private receivedSample: ElementRef<HTMLElement>;
	@ViewChild('gradedSample', { static: false }) private gradedSample: ElementRef<HTMLElement>;
	@ViewChild('myForm') myForm;
	sampleValueToShow: string = "Order Placed";
	orderSampleTimeline: boolean = true;
	confirmShow: boolean = false;
	confirmReport: boolean = false;
	shippmentReport: boolean = false;
	receivedReport: boolean = false;
	gradedReportSample: boolean = false;
	uploadReportSample: boolean = true;

	dataFromTable: any;

	cancelShow: boolean = false;
	totalstar = 5;
	newvalue: any = 2;

	constructor(private sampleService: OrderSampleService, private route: ActivatedRoute,
		public router: Router,public cookieService : CookieService) { }

	ngOnInit(): void {
		//Auth checking
		if (this.cookieService.get("Auth") == "") {
			this.router.navigate(["/auth/login"]);
		  }
		//Fills the time line based on the status selected in estate order.
		this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams['data']);
		console.log("the data from table trigger is  : " + this.dataFromTable);
		if (this.dataFromTable == "Order Confirmed") {
			this.sampleValueToShow = "Order Confirmed";
			setTimeout(() => {
				this.orderConfirmSample();
			}, 500);
		}
		else if (this.dataFromTable == "Payment") {
			this.sampleValueToShow = "Payment";
			setTimeout(() => {
				this.paySample();
			}, 500);

		}
		else if (this.dataFromTable == "Shipped") {
			this.sampleValueToShow = "Shipped";
			setTimeout(() => {
				this.shipmentStatusSample();
			}, 500);

		}
		else if (this.dataFromTable == "Received") {
			this.sampleValueToShow = "Received";
			setTimeout(() => {
				this.receivedStatusSample();
			}, 500);
		}
		else if (this.dataFromTable == "Graded") {
			this.sampleValueToShow = "Graded";
			setTimeout(() => {
				this.gradedStatusSample();
			}, 500);
		}
	}

	// Function Name : Order Placed
	// Description: This function fills order placed timeline .
	orderPlaceSample() {
		this.sampleValueToShow = this.orderPlacedSample.nativeElement.innerHTML;
	}
	// Function Name : Order Confirmed
	// Description: This function fills order Confirmed timeline and payment status is pending.
	orderConfirmSample() {
		this.sampleValueToShow = this.orderConfirmedSample.nativeElement.innerHTML;
		this.orderConfirmedSample.nativeElement.style.color = "#232334";
		this.orderConfirmedSample.nativeElement.style.fontWeight = "bold";
		const completedProcess = document.getElementById('confirmDivSample');
		completedProcess.classList.remove('completed');
		this.confirmReport = true;

	}
	// Function Name :Payment
	// Description: This function fills order Payment timeline and payment status will change to paid.
	paySample() {
		this.orderConfirmSample();
		this.sampleValueToShow = this.payment.nativeElement.innerHTML;
		this.payment.nativeElement.style.color = "#232334";
		this.payment.nativeElement.style.fontWeight = "bold";
		const completedProcess = document.getElementById('paymentDivSample');
		completedProcess.classList.remove('completed');
		this.sampleService.paymentStatus();
	}
	// Function Name : Order Sample Shippment
	// Description: This function shows Tracking Id and Shippment Id in order details tab once shippment is done.
	shipmentStatusSample() {
		this.paySample();
		this.sampleValueToShow = this.shippmentSample.nativeElement.innerHTML;
		this.shippmentSample.nativeElement.style.color = "#232334";
		this.shippmentSample.nativeElement.style.fontWeight = "bold";
		const completedProcess = document.getElementById('shippmentDivSample');
		completedProcess.classList.remove('completed');
		this.shippmentReport = true;
		this.sampleService.shipmentDone = true;

		// Calling the Order Details component by creating object of the component and accessing its methods

		let uploadReceipt = new OrderDetailsComponent(this.sampleService);
		setTimeout(()=>{
			uploadReceipt.uploadReceipt();
		},500);
	}
	// Function Name : Order Sample Received
	// Description: This function fills timeline of order received.
	receivedStatusSample() {
		this.shipmentStatusSample();
		this.sampleValueToShow = this.receivedSample.nativeElement.innerHTML;
		this.receivedSample.nativeElement.style.color = "#232334";
		this.receivedSample.nativeElement.style.fontWeight = "bold";
		const completedProcess = document.getElementById('receivedDivSample');
		completedProcess.classList.remove('completed');
		this.receivedReport = true;
	}
	// Function Name : Order Booked Graded
	// Description: This function shows order is graded and grade info tab timeline is filled.
	gradedStatusSample() {
		this.receivedStatusSample();
		this.sampleValueToShow = this.gradedSample.nativeElement.innerHTML;
		this.gradedSample.nativeElement.style.color = "#232334";
		this.gradedSample.nativeElement.style.fontWeight = "bold";
		const completedProcess = document.getElementById('gradedDivSample');
		completedProcess.classList.remove('completed');
		this.uploadReportSample = false;
		this.gradedReportSample = true;
		$('#pills-contact-tab')[0].click();
		setTimeout(() => {
			this.orderSampleTimeline = false;
			this.confirmShow = true;
		}, 2000);

		// Calling the Grade info component by creating object of the component and accessing its methods

		let callGradeInfo = new GradeInfoComponent(this.sampleService);
		callGradeInfo.gradeComplete();


	}

	// Function Name : Order Sample Cancel Button
	// Description: This function helps to cancel the order.
	cancelOrder() {
		this.orderSampleTimeline = false;
		this.confirmShow = false;
		this.cancelShow = true;
	}

	//Click on cancel button scrolls to cancel div
	ngAfterViewInit() {
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

}
