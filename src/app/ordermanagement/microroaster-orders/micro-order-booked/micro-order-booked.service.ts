import { Injectable } from '@angular/core';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Injectable({
	providedIn: 'root'
})
export class MicroOrderBookedService {
	uploadShow: boolean = true;
	statusPending: boolean = true;
	statusPaid: boolean = false;
	receiptShow: boolean = false;
	beforeGradeComplete: boolean = true;
	afterGradeComplete: boolean = false;
	shipment_status: boolean = false;
	roasterId: any;
	bookOrderId: any;
	mrDetails: any;
	acceptStatus: any;
	acceptInvoiceUrl: any;
	acceptNotes: any;
	rejectStatus: any;
	rejectNotes: any;
	delivery_address: any;
	countryValue: any;
	created_date: any;
	quantity_count: any;
	total_price: any;
	mrProfileDetails: any;
	status: any;

	constructor(public roasterService: RoasterserviceService, public router: Router,
		public cookieService: CookieService, public profileservice: RoasteryProfileService,
		public userService: UserserviceService) {
		this.statusPending = true;
		this.roasterId = this.cookieService.get('roaster_id');
	}

	viewMrOrderDetails() {
		this.roasterService.getMrGcOrderDetails(this.roasterId, this.bookOrderId).subscribe(
			res => {
				if (res['success'] == true) {
					this.mrDetails = res['result'];
					this.roasterId = this.mrDetails.roaster_id;
					this.delivery_address = this.mrDetails.delivery_address;
					this.created_date = this.mrDetails.created_at;
					this.quantity_count = this.mrDetails.quantity_count;
					this.total_price = this.mrDetails.total_price;
					this.getMrDetails();
				}
			}
		)
	}
	getCountry(data: any) {
		// console.log(data.toUpperCase());
		if (data) {
			this.countryValue = this.profileservice.countryList.find(con => con.isoCode == data.toUpperCase());
			if (this.countryValue) {
				return this.countryValue.name;
			}
		}
	}

	getMrDetails() {
		this.userService.getMicroDetails(this.roasterId, this.mrDetails.micro_roaster_id).subscribe(
			res => {
				if (res['success'] == true) {
					this.mrProfileDetails = res['result'];
				}
			}
		)
	}

}
