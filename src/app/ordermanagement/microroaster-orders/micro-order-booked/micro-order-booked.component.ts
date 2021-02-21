import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import { MicroOrderBookedService } from '../micro-order-booked/micro-order-booked.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { OrgType } from '@models';
@Component({
    selector: 'app-micro-order-booked',
    templateUrl: './micro-order-booked.component.html',
    styleUrls: ['./micro-order-booked.component.css'],
})
export class MicroOrderBookedComponent implements OnInit {
    @ViewChild('orderPlacedSample', { static: false })
    private orderPlacedSample: ElementRef<HTMLElement>;
    @ViewChild('orderConfirmedSample', { static: false })
    private orderConfirmedSample: ElementRef<HTMLElement>;
    @ViewChild('paymentSample', { static: false })
    private payment: ElementRef<HTMLElement>;
    @ViewChild('shippmentSample', { static: false })
    private shippmentSample: ElementRef<HTMLElement>;
    @ViewChild('receivedSample', { static: false })
    private receivedSample: ElementRef<HTMLElement>;
    @ViewChild('gradedSample', { static: false })
    private gradedSample: ElementRef<HTMLElement>;
    @ViewChild('myForm') myForm;

    orgType: OrgType.MICRO_ROASTER;
    sampleValueToShow: string = 'Order Placed';
    orderSampleTimeline: boolean = true;
    confirmShow: boolean = false;
    confirmReport: boolean = false;
    shippmentReport: boolean = false;
    receivedReport: boolean = false;
    gradedReportSample: boolean = false;
    uploadReportSample: boolean = true;
    cancelShow: boolean = false;
    receivedOrderShow: boolean = false;
    paymentStatusDiv: boolean = true;
    paymentCompletedDiv: boolean = false;
    waitingConfirmShow: boolean = false;
    //   date6: Date;
    savemode: boolean = true;
    editmode: boolean = false;
    dataFromTable: string;
    roasterId: any;
    bookId: any;
    addNotes: any;
    noteList: any;
    sampleMode: boolean = false;
    orderType: string = '';
    orgType = OrgType.MICRO_ROASTER;

    //   shipmentLink: any;
    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public cookieService: CookieService,
        public bookDetailService: MicroOrderBookedService,
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        private userService: UserserviceService,
        private toastrService: ToastrService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.bookId = decodeURIComponent(this.route.snapshot.queryParams['id']);
        this.bookDetailService.bookOrderId = this.bookId;
        this.viewMrOrderDetails();
        this.bookDetailService.viewMrOrderDetails();
        this.getNotes();
    }

    ngOnInit(): void {
        this.orderType = decodeURIComponent(this.route.snapshot.queryParams['type']);
        this.sampleMode = this.orderType == 'GC_ORDER_SAMPLE' ? true : false;
        //Auth checking
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        // this.sampleValueToShow = "Order Placed";
        // this.paymentStatusDiv = true;
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
        this.orderConfirmedSample.nativeElement.style.color = '#232334';
        this.orderConfirmedSample.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('confirmDivSample');
        completedProcess.classList.remove('completed');
        this.confirmReport = true;
    }
    // Function Name :Payment
    // Description: This function fills order Payment timeline and payment status will change to paid.
    paySample() {
        this.orderConfirmSample();
        this.sampleValueToShow = this.payment.nativeElement.innerHTML;
        this.payment.nativeElement.style.color = '#232334';
        this.payment.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('paymentDivSample');
        completedProcess.classList.remove('completed');
        // this.sampleService.paymentStatus();
        this.paymentCompletedDiv = true;
        this.paymentStatusDiv = false;
        this.bookDetailService.receiptShow = true;
        this.bookDetailService.statusPaid = true;
        this.bookDetailService.statusPending = false;
        console.log(this.bookDetailService.statusPaid);
    }
    // Function Name : Order Sample Shippment
    // Description: This function shows Tracking Id and Shippment Id in order details tab once shippment is done.
    shipmentStatusSample() {
        this.paySample();
        this.sampleValueToShow = this.shippmentSample.nativeElement.innerHTML;
        this.shippmentSample.nativeElement.style.color = '#232334';
        this.shippmentSample.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('shippmentDivSample');
        completedProcess.classList.remove('completed');
        this.shippmentReport = true;
        setTimeout(() => {
            this.orderSampleTimeline = false;
            this.waitingConfirmShow = true;
        }, 500);

        this.paymentCompletedDiv = true;
        this.paymentStatusDiv = false;
        this.bookDetailService.receiptShow = true;
        this.bookDetailService.statusPaid = true;
        this.bookDetailService.statusPending = false;
        this.bookDetailService.shipment_status = true;
        // this.sampleService.shipmentDone = true;

        // Calling the Order Details component by creating object of the component and accessing its methods

        // let uploadReceipt = new OrderDetailsComponent(this.sampleService);
        // setTimeout(()=>{
        // 	uploadReceipt.uploadReceipt();
        // },500);
    }
    // Function Name : Order Sample Received
    // Description: This function fills timeline of order received.
    receivedStatusSample() {
        this.shipmentStatusSample();
        this.sampleValueToShow = this.receivedSample.nativeElement.innerHTML;
        this.receivedSample.nativeElement.style.color = '#232334';
        this.receivedSample.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('receivedDivSample');
        completedProcess.classList.remove('completed');
        this.receivedReport = true;
        setTimeout(() => {
            this.orderSampleTimeline = false;
            this.waitingConfirmShow = false;
            this.receivedOrderShow = true;
        }, 500);
        this.paymentStatusDiv = false;
        this.paymentCompletedDiv = false;

        this.bookDetailService.receiptShow = true;
        this.bookDetailService.statusPaid = true;
        this.bookDetailService.statusPending = false;
    }
    // Function Name : Order Booked Graded
    // Description: This function shows order is graded and grade info tab timeline is filled.
    gradedStatusSample() {
        this.receivedStatusSample();
        this.sampleValueToShow = this.gradedSample.nativeElement.innerHTML;
        this.gradedSample.nativeElement.style.color = '#232334';
        this.gradedSample.nativeElement.style.fontWeight = 'bold';
        const completedProcess = document.getElementById('gradedDivSample');
        completedProcess.classList.remove('completed');
        this.uploadReportSample = false;
        this.gradedReportSample = true;
        $('#pills-contact-tab')[0].click();
        setTimeout(() => {
            this.orderSampleTimeline = true;
            this.waitingConfirmShow = false;
            this.receivedOrderShow = false;
        }, 500);

        // Calling the Grade info component by creating object of the component and accessing its methods

        // let callGradeInfo = new GradeInfoComponent(this.sampleService);
        // callGradeInfo.gradeComplete();
    }

    save() {
        const input = new Date(this.bookDetailService.date6);
        // console.log(date);

        const format = (d) => (d < 10 ? '0' : '') + d;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // parse date string (lazy since time parts not used)
        let [day, m, d, yyyy, ...time] = input.toString().split(' ');

        // two digit format for month and date
        let mm = format(months.indexOf(m) + 1);
        let dd = format(d);

        // format date as yyyy-mm-dd
        let date = yyyy + '-' + mm + '-' + dd;
        console.log(date);
        var data = {
            tracking_link: this.bookDetailService.shipmentLink,
            shipment_date: date,
        };
        this.userService.updateShipmentDetails(this.roasterId, this.bookId, data).subscribe((data) => {
            if (data['success'] == true) {
                this.toastrService.success('Shipment link updated');
                this.savemode = false;
                this.editmode = true;
                $('#track-link').prop('disabled', true);
                $('#navigators').prop('disabled', true);
            } else {
                this.toastrService.error('Error while Updating the shipment link');
            }
        });
    }
    edit() {
        this.savemode = true;
        this.editmode = false;
        $('#track-link').prop('disabled', false);
        $('#navigators').prop('disabled', false);
    }

    showInvoice() {
        const a = document.createElement('a');
        a.href = this.bookDetailService['mrDetails']['invoice_file'];
        a.download = `#${this.bookDetailService.bookOrderId}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    verifyPayment() {
        this.userService.updatePaymentVerify(this.roasterId, this.bookId).subscribe((data) => {
            if (data['success'] == true) {
                this.toastrService.success('Payment has been verified!');
                this.bookDetailService.payment_status = 'VERIFIED';
                this.bookDetailService.statusPaid = true;
                this.bookDetailService.statusPending = false;
                this.bookDetailService.receiptShow = true;
            } else {
                this.toastrService.error('Error while verifying the payment');
            }
        });
    }
    verifyPaymentAfterDelivery() {
        this.userService.updatePaymentAfterDelivery(this.roasterId, this.bookId).subscribe((data) => {
            if (data['success'] == true) {
                this.toastrService.success('Payment after delivering the order!');
                this.bookDetailService.payment_after_delivery = true;
            } else {
                this.toastrService.error('Error while verifying the payment after delivery');
            }
        });
    }

    viewMrOrderDetails() {
        this.roasterService.getMrGcOrderDetails(this.roasterId, this.bookId).subscribe((res) => {
            if (res['success'] == true) {
                this.bookDetailService.mrDetails = res['result'];
                this.bookDetailService.roasterId = this.bookDetailService.mrDetails.roaster_id;
                this.bookDetailService.delivery_address = this.bookDetailService.mrDetails.delivery_address;
                this.bookDetailService.created_date = this.bookDetailService.mrDetails.created_at;
                this.bookDetailService.quantity_count = this.bookDetailService.mrDetails.quantity_count;
                this.bookDetailService.total_price = this.bookDetailService.mrDetails.total_price;
                this.bookDetailService.status = this.bookDetailService.mrDetails.status;
                this.bookDetailService.payment_status = this.bookDetailService.mrDetails.payment_status;
                this.bookDetailService.receipt_url = this.bookDetailService.mrDetails.receipt_url;
                this.bookDetailService.shipmentLink = this.bookDetailService.mrDetails.tracking_link;
                this.bookDetailService.date6 = this.bookDetailService.mrDetails.shipment_date;
                if (this.bookDetailService.payment_status == 'VERIFIED') {
                    this.bookDetailService.uploadShow = false;
                    this.bookDetailService.receiptShow = true;
                    this.bookDetailService.statusPaid = true;
                    this.bookDetailService.statusPending = false;
                    this.bookDetailService.paymentVerification = true;
                }

                this.timelineData();
            }
        });
    }
    timelineData() {
        //Fills the time line based on the status selected in estate order.
        if (this.bookDetailService.status == 'CONFIRMED') {
            this.sampleValueToShow = 'Order Confirmed';
            setTimeout(() => {
                this.orderConfirmSample();
            }, 500);
        } else if (this.bookDetailService.status == 'PAYMENT') {
            this.sampleValueToShow = 'Payment';
            setTimeout(() => {
                this.paySample();
            }, 500);
        } else if (this.bookDetailService.status == 'SHIPPED') {
            this.sampleValueToShow = 'Shipped';
            this.savemode = false;
            this.editmode = true;
            setTimeout(() => {
                this.shipmentStatusSample();
            }, 500);
        } else if (this.bookDetailService.status == 'RECEIVED') {
            this.sampleValueToShow = 'Received';
            this.savemode = false;
            this.editmode = false;
            setTimeout(() => {
                this.receivedStatusSample();
            }, 500);
        } else if (this.bookDetailService.status == 'GRADED') {
            this.sampleValueToShow = 'Graded';
            this.savemode = false;
            this.editmode = false;
            setTimeout(() => {
                this.gradedStatusSample();
            }, 500);
        }

        if (this.bookDetailService.paymentVerification == true && this.bookDetailService.status == 'CONFIRMED') {
            setTimeout(() => {
                this.sampleValueToShow = 'Payment';
                this.paySample();
            }, 500);
        }
    }
    addNote() {
        var body = {
            notes: this.addNotes,
        };
        this.roasterService.addOrderNotes(this.roasterId, this.bookId, body).subscribe((res) => {
            if (res['success'] == true) {
                this.getNotes();
                this.toastrService.success('Added Order Notes Successfully');
            }
        });
    }
    getNotes() {
        this.roasterService.getOrderNotes(this.roasterId, this.bookId).subscribe((res) => {
            if (res['success'] == true) {
                this.noteList = res['result'];
            }
        });
    }
}
