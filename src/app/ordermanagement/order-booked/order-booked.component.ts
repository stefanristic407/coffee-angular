import { ServiceChatTypes } from '@models';
// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Booked.
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { OrderBookedService } from './order-booked.service';
import { ActivatedRoute } from '@angular/router';
import { BookedGradeInfoComponent } from '../order-booked/booked-grade-info/booked-grade-info.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BookedOrderDetailsComponent } from './booked-order-details/booked-order-details.component';
declare var $: any;
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { ToastrService } from 'ngx-toastr';
import { OrgType } from '@models';

@Component({
    selector: 'app-order-booked',
    templateUrl: './order-booked.component.html',
    styleUrls: ['./order-booked.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class OrderBookedComponent implements OnInit {
    @ViewChild('orderPlacedBooked', { static: false }) private orderPlacedBooked: ElementRef<HTMLElement>;
    @ViewChild('orderConfirmedBooked', { static: false }) private orderConfirmedBooked: ElementRef<HTMLElement>;
    @ViewChild('paymentBooked', { static: false }) private paymentBooked: ElementRef<HTMLElement>;
    @ViewChild('shippmentBooked', { static: false }) private shipmentBooked: ElementRef<HTMLElement>;
    @ViewChild('receivedBooked', { static: false }) private receivedBooked: ElementRef<HTMLElement>;
    @ViewChild('gradedBooked', { static: false }) private gradedBooked: ElementRef<HTMLElement>;
    @ViewChild(BookedGradeInfoComponent, { static: false }) public gradeInfoTab: BookedGradeInfoComponent;
    @ViewChild('myForm') myForm;

    orgType = OrgType.ESTATE;
    bookedValueToShow: string = 'Order Placed';
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
    appLanguage?: any;
    roasterId: any;
    orderBookId: any;
    countryValue: any;

    SERVICE_TYPE = ServiceChatTypes.RO_ES;
    constructor(
        public bookedService: OrderBookedService,
        private route: ActivatedRoute,
        public router: Router,
        public cookieService: CookieService,
        public globals: GlobalsService,
        private userService: UserserviceService,
        private toastrService: ToastrService,
        private roasterService: RoasterserviceService,
        public profileservice: RoasteryProfileService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        //Fills the time line based on the status selected in estate order.
        this.dataFromTable = decodeURIComponent(this.route.snapshot.queryParams['data']);
        this.orderBookId = decodeURIComponent(this.route.snapshot.queryParams['id']);
        this.bookedService.orderId = this.orderBookId;
        this.bookedService.viewOrderDetails();

        setTimeout(() => {
            if (this.bookedService.paymentVerification == true && this.dataFromTable == 'CONFIRMED') {
                this.bookedValueToShow = 'Payment';
                this.paymentStatusBooked();
            }
        }, 3000);
    }

    ngOnInit(): void {
        //Auth checking
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        this.appLanguage = this.globals.languageJson;

        console.log('the data from table trigger is  : ' + this.bookedService.orderId);
        if (this.dataFromTable == 'CONFIRMED') {
            this.bookedValueToShow = 'Order Confirmed';
            setTimeout(() => {
                this.orderConfirmBooked();
            }, 500);
        } else if (this.dataFromTable == 'PAYMENT') {
            this.bookedValueToShow = 'Payment';
            setTimeout(() => {
                this.paymentStatusBooked();
            }, 500);
        } else if (this.dataFromTable == 'SHIPPED') {
            this.bookedValueToShow = 'Shipped';
            setTimeout(() => {
                this.shipmentStatusBooked();
            }, 500);
        } else if (this.dataFromTable == 'RECEIVED') {
            this.bookedValueToShow = 'Received';
            setTimeout(() => {
                this.receivedStatusBooked();
            }, 500);
        } else if (this.dataFromTable == 'GRADED') {
            this.bookedValueToShow = 'Graded';
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
        this.orderConfirmedBooked.nativeElement.style.color = '#232334';
        this.orderConfirmedBooked.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('confirmDivBooked');
        completedProcess.classList.remove('completed');
        this.confirmReport = true;
    }
    // Function Name :Payment
    // Description: This function fills order Payment timeline and payment status will change to paid.
    paymentStatusBooked() {
        this.orderConfirmBooked();
        this.bookedValueToShow = this.paymentBooked.nativeElement.innerHTML;
        this.paymentBooked.nativeElement.style.color = '#232334';
        this.paymentBooked.nativeElement.style.fontWeight = 'bold';
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
        this.shipmentBooked.nativeElement.style.color = '#232334';
        this.shipmentBooked.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('shippmentDivBooked');
        completedProcess.classList.remove('completed');
        this.shippmentReport = true;
        this.bookedService.shipmentDone = true;
        if (this.dataFromTable == 'SHIPPED') {
            setTimeout(() => {
                this.orderBookedTimeline = false;
                this.shippmentShow = true;
            }, 2000);
        }

        // Calling the Order Details component by creating object of the component and accessing its methods

        let uploadReceipt = new BookedOrderDetailsComponent(
            this.bookedService,
            this.globals,
            this.cookieService,
            this.toastrService,
            this.userService,
            this.roasterService,
            this.profileservice,
        );
        setTimeout(() => {
            uploadReceipt.uploadReceipt();
        }, 500);
    }
    // Function Name : Order Booked Received
    // Description: This function fills timeline of order received.
    receivedStatusBooked() {
        this.shipmentStatusBooked();
        this.bookedValueToShow = this.receivedBooked.nativeElement.innerHTML;
        this.receivedBooked.nativeElement.style.color = '#232334';
        this.receivedBooked.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('receivedDivBooked');
        completedProcess.classList.remove('completed');
        this.receivedReport = true;

        if (this.dataFromTable == 'RECEIVED') {
            setTimeout(() => {
                this.orderBookedTimeline = false;
                this.receivedOrderShow = true;
            }, 2000);
        }
    }

    // Function Name : Order Booked Graded
    // Description: This function shows order is graded and grade info tab timeline is filled.
    gradedStatusBooked() {
        this.receivedStatusBooked();
        this.bookedValueToShow = this.gradedBooked.nativeElement.innerHTML;
        this.gradedBooked.nativeElement.style.color = '#232334';
        this.gradedBooked.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('gradedDivBooked');
        completedProcess.classList.remove('completed');
        this.uploadReport = false;
        this.gradedReport = true;
        $('#pills-contact-tab')[0].click();
        // Calling the Grade info component by creating object of the component and accessing its methods
        this.gradeInfoTab.gradedComplete();
    }

    //Confirm Shippment shows and timeline hides
    receivedShippment() {
        this.roasterService.orderReceived(this.roasterId, this.bookedService.orderId).subscribe((response) => {
            if (response['success'] == true) {
                this.toastrService.success('Order received has been confirmed');
                this.orderBookedTimeline = false;
                this.cancelShow = false;
                this.shippmentShow = false;
                this.receivedOrderShow = true;
                setTimeout(() => {
                    this.orderBookedTimeline = true;
                    this.cancelShow = false;
                    this.shippmentShow = false;
                    this.receivedOrderShow = false;
                    this.receivedStatusBooked();
                }, 2000);
            } else {
                this.toastrService.error('Error while confirmation the Shipment');
            }
        });
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
        $('.cancel-order-btn').click(function () {
            $('html,body').animate(
                {
                    scrollTop: $('.cancel-predisplay').offset().top,
                },
                500,
            );
        });

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

        //  Toggle the visibility of the chatbox element when clicked
        //  And change the icon depending on visibility
        // toggleChatboxBtn.addEventListener('click', () => {
        //     chatbox.classList.toggle('chatbox--is-visible');
        //     if (chatbox.classList.contains('chatbox--is-visible')) {
        //         toggleChatboxBtn.innerHTML = '<i class="pi pi-angle-down" style="float:right; margin-top:-11px;"></i>';
        //     } else {
        //         toggleChatboxBtn.innerHTML = '<i class="pi pi-angle-up" style="float:right; margin-top:-11px;"></i>';
        //     }
        // });

        // Form input using method createChatBubble
        // To append any user message to display
        chatboxForm.addEventListener('submit', (e) => {
            //   const chatInput = document.querySelector(".js-chatbox-input");
            const chatInput = (document.getElementById('js-chatbox-input') as HTMLInputElement).value;
            //   console.log("chat text coming"+chatInput);

            createChatBubble(chatInput);

            e.preventDefault();
            this.myForm.nativeElement.reset();
        });
    }
    GetCountry(data: any) {
        // console.log(data.toUpperCase());
        if (data) {
            this.countryValue = this.profileservice.countryList.find((con) => con.isoCode == data.toUpperCase());
            if (this.countryValue) {
                return this.countryValue.name;
            }
        }
    }

    showInvoice() {
        const a = document.createElement('a');
        a.href = this.bookedService.invoice_url;
        a.download = `#${this.bookedService.orderId}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    onClickGradeInfoTab() {
        this.gradeInfoTab.getHarvestDetails();
    }
}
