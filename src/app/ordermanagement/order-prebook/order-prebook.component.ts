import { ServiceChatTypes } from './../../../models/service-chat';
// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Pre-Book.
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { OrderPrebookService } from './order-prebook.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { PrebookGradeInfoComponent } from './prebook-grade-info/prebook-grade-info.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { OrderBookedService } from '../order-booked/order-booked.service';
declare var $: any;

@Component({
    selector: 'app-order-prebook',
    templateUrl: './order-prebook.component.html',
    styleUrls: ['./order-prebook.component.css'],
})
export class OrderPrebookComponent implements OnInit, AfterContentInit, AfterViewInit {
    @ViewChild('orderPlaced', { static: false }) private orderPlaced: ElementRef<HTMLElement>;
    @ViewChild('orderConfirmed', { static: false }) private orderConfirmed: ElementRef<HTMLElement>;
    @ViewChild('payment', { static: false }) private payment: ElementRef<HTMLElement>;
    @ViewChild('harvestReady', { static: false }) private harvestReady: ElementRef<HTMLElement>;
    @ViewChild('graded', { static: false }) private graded: ElementRef<HTMLElement>;
    @ViewChild(PrebookGradeInfoComponent, { static: false }) private gradeInforTab: PrebookGradeInfoComponent;
    @ViewChild('myForm') myForm;

    // @ViewChild('pills-contact-tab',{static: false}) private pillsContact : ElementRef<HTMLElement>;
    valueToShow = 'Order Placed';

    harvestInfo = false;
    orderTimeline = true;
    cancelShow = false;
    confirmOrderShow = false;
    greenIconShow = false;

    dataFromTable: any;
    totalstar = 5;
    newvalue: any = 4;

    appLanguage?: any;
    orderPreBookId: any;
    countryValue: any;
    SERVICE_TYPE = ServiceChatTypes.RO_ES;

    constructor(
        public prebookService: OrderPrebookService,
        private route: ActivatedRoute,
        public router: Router,
        public cookieService: CookieService,
        public bookedService: OrderBookedService,
        public globals: GlobalsService,
        public profileservice: RoasteryProfileService,
    ) {
        this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams.data);
        this.orderPreBookId = decodeURIComponent(this.route.snapshot.queryParams.id);
        this.prebookService.orderPreId = this.orderPreBookId;
        this.prebookService.viewPrebookOrderDetails();
    }

    ngOnInit(): void {
        // Auth checking
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        this.appLanguage = this.globals.languageJson;

        // Fills the time line based on the status selected in estate order.
        if (this.dataFromTable === 'CONFIRMED') {
            this.valueToShow = 'Order Confirmed';
            setTimeout(() => {
                this.orderConfirm();
            }, 500);
        } else if (this.dataFromTable === 'PAYMENT') {
            this.valueToShow = 'Payment';
            setTimeout(() => {
                this.paymentStatus();
            }, 500);
        } else if (this.dataFromTable === 'HARVEST_READY') {
            this.valueToShow = 'Harvest Ready';
            setTimeout(() => {
                this.harvest();
            }, 500);
        } else if (this.dataFromTable === 'GRADED') {
            this.valueToShow = 'Graded';
            setTimeout(() => {
                this.gradedStatus();
            }, 500);
        }
    }

    ngAfterContentInit() {
        if (this.prebookService.paymentVerification === true && this.dataFromTable === 'CONFIRMED') {
            setTimeout(() => {
                this.valueToShow = 'Payment';
                this.paymentStatus();
            }, 1000);
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
        this.orderConfirmed.nativeElement.style.color = '#232334';
        this.orderConfirmed.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('confirmDiv');
        completedProcess.classList.remove('completed');
    }

    // Function Name :Payment
    // Description: This function fills order Payment timeline and payment status will change to paid.
    paymentStatus() {
        this.orderConfirm();
        this.valueToShow = this.payment.nativeElement.innerHTML;
        this.payment.nativeElement.style.color = '#232334';
        this.payment.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('paymentDiv');
        completedProcess.classList.remove('completed');
        this.prebookService.changePaymentStatus();
    }

    // Function Name : Order Pre-book harvest Ready
    // Description: This function fills harvest timeline and click on follow your harvest will scroll to harvest details.
    harvest() {
        this.paymentStatus();
        this.valueToShow = this.harvestReady.nativeElement.innerHTML;
        this.harvestReady.nativeElement.style.color = '#232334';
        this.harvestReady.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('harvestDiv');
        completedProcess.classList.remove('completed');
    }

    // Function Name : Order Pre-Book Graded
    // Description: This function shows order is graded and grade info tab timeline is filled.
    gradedStatus() {
        this.harvest();
        this.valueToShow = this.graded.nativeElement.innerHTML;
        this.graded.nativeElement.style.color = '#232334';
        this.graded.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('gradedDiv');
        completedProcess.classList.remove('completed');
        // this.pillsContact[0].nativeElement.click();
        $('#pills-contact-tab')[0].click();

        // if (this.dataFromTable == "GRADED") {
        //   setTimeout(() => {
        //     this.orderTimeline = false;
        //     this.confirmOrderShow = true;
        //   }, 2000);
        // }

        setTimeout(() => {
            this.orderTimeline = false;
            this.confirmOrderShow = true;
        }, 2000);

        // Calling the Grade info component by creating object of the component and accessing its methods
        this.gradeInforTab.gradeComplete();
    }

    // shows Harvest div
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

    // Click on harvest button scrolls to harvest div
    ngAfterViewInit() {
        $('.havestShow').click(function () {
            $('html,body').animate(
                {
                    scrollTop: $('.harvest-content').offset().top,
                },
                500,
            );
        });

        // Click on cancel button scrolls to cancel div
        $('.cancel-order-btn').click(function () {
            $('html,body').animate(
                {
                    scrollTop: $('.cancel-predisplay').offset().top,
                },
                500,
            );
        });

        // chat

        const chatbox = document.querySelector('.js-chatbox');
        const chatboxMsgDisplay = document.querySelector('.js-chatbox-display');
        const chatboxForm = document.querySelector('.js-chatbox-form');

        // Use to create chat bubble when user submits text
        // Appends to display
        const createChatBubble = (input) => {
            const chatSection = document.createElement('p');
            chatSection.textContent = input;
            chatSection.classList.add('chatbox__display-chat');

            chatboxMsgDisplay.appendChild(chatSection);
        };

        // Toggle the visibility of the chatbox element when clicked
        // And change the icon depending on visibility

        // Form input using method createChatBubble
        // To append any user message to display
        // chatboxForm.addEventListener('submit', (e) => {
        //     //   const chatInput = document.querySelector(".js-chatbox-input");
        //     const chatInput = (document.getElementById('js-chatbox-input') as HTMLInputElement).value;
        //     //   console.log("chat text coming"+chatInput);

        //     createChatBubble(chatInput);

        //     e.preventDefault();
        //     this.myForm.nativeElement.reset();
        // });
    }

    // onRate($event: { newValue: number }) {
    //     this.newvalue = $event.newValue;
    //     console.log(this.newvalue);
    // }

    GetCountry(data: any) {
        // console.log(data.toUpperCase());
        if (data) {
            this.countryValue = this.profileservice.countryList.find((con) => con.isoCode == data.toUpperCase());
            if (this.countryValue) {
                return this.countryValue.name;
            }
        }
    }

    buyConfirmOrder() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                harvestId: this.prebookService.harvestId,
                estateId: this.prebookService.estate_id,
                // certificateHarvest:JSON.stringify(this.harvestCertify)
            },
            // skipLocationChange: true
        };
        // this.sourcing.prebook_order_id = this.prebookService.preId;
        // this.sourcing.prebook_flag = true;
        this.router.navigate([
            '/features/available-coffee-list/' + this.prebookService.estate_id + '/' + this.prebookService.harvestId,
        ]);
    }

    showInvoice() {
        const a = document.createElement('a');
        a.href = this.prebookService.invoice_url;
        a.download = `#${this.prebookService.orderPreId}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    onClickGradeInfoTab() {
        this.gradeInforTab.getHarvestDetails();
    }
}
