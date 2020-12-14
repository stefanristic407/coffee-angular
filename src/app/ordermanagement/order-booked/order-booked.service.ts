// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Payment Status for booked type order.
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class OrderBookedService {
	statusPaid: boolean = false;
	statusPending: boolean = true;
	beforeGradeComplete: boolean = true;
	afterGradeComplete: boolean = false;
	shipmentDone: boolean = false;
	uploadShow: boolean = true;
	receiptShow: boolean = false;
	roasterId: any;
	orderId: any;
	orderDetails: any;
	bookId: any;
	created_at: any;
	origin: any;
	variety: any;
	price: any;
	quantity_type: any;
	quantity: any;
	harvestId: any;
	flavours: any;
	listing_status: any;
	packaging: any;
	processing_types: any;
	type: any;
	species: any;
	water_activity: any;
	ico_number: any;
	estate_name: any;
	shipping_address: any;
	estate_id: any;
	estate_thumbnail_url: any;
	estate_owner: any;
	roaster_thumbnail_url: any;
	roaster_owner: any;
	roaster_name: any;

  constructor(private roasterService: RoasterserviceService,public router: Router,public cookieService : CookieService,private userService : UserserviceService) {
	this.roasterId = this.cookieService.get('roaster_id');
	// this.viewOrderDetails();
   }
  // Function Name : Payment Status
  // Description: This function helps to store status of payment.
  paymentStatus() {
    this.statusPending = false;
    this.statusPaid = true;
  }
  viewOrderDetails(){
		this.roasterService.getViewOrderDetails(this.roasterId,this.orderId).subscribe(
			res=>{
				if(res['success'] == true){
					this.orderDetails=res['result'];
					this.bookId=res['result']['id'];
					this.created_at=res['result']['created_at'];
					this.origin=res['result']['origin'];
					this.variety=res['result']['variety'];
					this.price=res['result']['price'];
					this.quantity_type=res['result']['quantity_type'];
					this.quantity=res['result']['quantity'];
					this.harvestId=res['result']['harvest_id'];
					this.estate_name=res['result']['estate_name'];
					this.estate_thumbnail_url= res['result']['estate_profile_image_thumbnail_url'];
					this.estate_owner=res['result']['estate_owner'];
					this.roaster_owner=res['result']['roaster_owner'];
					this.roaster_name=res['result']['roaster_name'];
					this.roaster_thumbnail_url=res['result']['roaster_profile_image_thumbnail_url'];
					this.shipping_address=res['result']['shipping_address'];
					this.estate_id=res['result']['estate_id'];
					this.viewAvailability();
					this.viewEstateDetails();
				}	
			}
		)
	}
	viewAvailability(){
		this.userService.getGreenCoffeeDetails(this.roasterId,this.harvestId).subscribe(
			res=>{
				if(res['success'] == true){
					console.log(res);
					this.flavours=res['result']['flavours'];
					this.listing_status=res['result']['listing_status'];
					this.packaging=res['result']['packaging'];
					this.processing_types=res['result']['processing_types'];
					this.type=res['result']['type'];
					this.species=res['result']['species'];
					this.water_activity= res['result']['dry_milling']['water_activity'];
					this.ico_number=res['result']['ico_number'];
				}
			}
		)
	}

	viewEstateDetails(){
		this.userService.getAvailableEstateList(this.roasterId,this.estate_id).subscribe(
			res=>{
				if(res['success'] == true){
					console.log(res);
				}	
			}
		)
	}

}
