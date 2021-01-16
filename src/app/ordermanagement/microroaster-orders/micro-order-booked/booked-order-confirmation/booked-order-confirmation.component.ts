import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MicroOrderBookedService } from '../micro-order-booked.service';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-booked-order-confirmation',
	templateUrl: './booked-order-confirmation.component.html',
	styleUrls: ['./booked-order-confirmation.component.css']
})
export class BookedOrderConfirmationComponent implements OnInit {
	bookId: any;
	roasterId: any;
	sampleMode: boolean = false;
	orderType: string = '';

	constructor(private route: ActivatedRoute,
		public router: Router, public cookieService: CookieService,
		public bookDetailService: MicroOrderBookedService,
		public globals: GlobalsService, public roasterService: RoasterserviceService, private toastrService: ToastrService) {
		this.bookId = decodeURIComponent(this.route.snapshot.queryParams['id']);
		this.bookDetailService.bookOrderId = this.bookId;
		this.bookDetailService.viewMrOrderDetails();
		this.roasterId = this.cookieService.get('roaster_id');
	}

	ngOnInit(): void {
		this.orderType = decodeURIComponent(this.route.snapshot.queryParams["type"]);
		this.sampleMode = this.orderType == 'GC_ORDER_SAMPLE' ? true : false;
	}

	acceptOrder() {
		var details = {
			'notes': 'Confirm Order'
		}
		this.roasterService.acceptMrConfirmOrder(this.bookDetailService.roasterId, this.bookId, details).subscribe(
			res => {
				if (res['success'] == true) {
					this.toastrService.success("Order Accepted");
					this.bookDetailService.acceptStatus = res['status'];
					this.bookDetailService.acceptInvoiceUrl = res['invoice_url'];
					this.bookDetailService.acceptNotes = res['notes'];
					this.router.navigate(["/ordermanagement/estate-orders"]);
				}
				else {
					this.toastrService.error("error while Accepting order");
				}
			}
		)
	}
	rejectOrder() {
		var data = {
			'notes': 'Order rejeted'
		}
		this.roasterService.rejectBookedOrder(this.bookDetailService.roasterId, this.bookId, data).subscribe(
			res => {
				if (res['success'] == true) {
					this.toastrService.success("Order rejectd");
					this.bookDetailService.rejectStatus = res['status'];
					this.bookDetailService.rejectNotes = res['notes'];
				}
				else {
					this.toastrService.error("error while rejecting order");
				}
			}
		)
	}
}
