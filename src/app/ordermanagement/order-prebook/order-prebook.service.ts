// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Payment Status for pre-book type order.
import { Injectable } from '@angular/core';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { OrderBookedService } from '../order-booked/order-booked.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPrebookService {
	statusPending: boolean = true;
	statusPaid: boolean = false;
	beforeGradeComplete: boolean = true;
	afterGradeComplete: boolean = false;
	roasterId: string;
	orderPreId: any;
	preId: any;
	created_at: any;
	origin: any;
	variety: any;
	price: any;
	quantity_type: any;
	quantity: any;
	harvestId: any;
	estate_id: any;
	estate_thumbnail_url: any;
	estate_owner: any;
	roaster_thumbnail_url: any;
	roaster_owner: any;
	roaster_name: any;
	company_image_thumbnail_url: any;
	owner_name: any;
	address_line1: any;
	address_line2: any;
	zipcode: any;
	estate_name: any;
	shipping_address: any;
	lot_id: any;
	city: any;
	rating: any;
	flavours: any;
	soil_footprint: any;
	species: any;
	avg_cup_score: any;
	water_analysis: any;
	annual_production: any;
	crop: any;
	recentactivityarray:any=[];
	orderId: any;
  
  constructor(private roasterService: RoasterserviceService,public router: Router,public cookieService : CookieService,private userService : UserserviceService,public bookedService: OrderBookedService) { 
    this.roasterId = this.cookieService.get('roaster_id');
  }

  // Function Name : Payment Status
  // Description: This function helps to store status of payment.
  changePaymentStatus() {
    this.statusPaid = true;
    this.statusPending = false;
  }
  viewPrebookOrderDetails(){
		this.roasterService.getViewOrderDetails(this.roasterId,this.orderPreId).subscribe(
			res=>{
				if(res['success'] == true){
					this.preId=res['result']['id'];
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
					this.lot_id=res['result']['lot_id'];
					// this.viewAvailability();
					this.viewpreEstateDetails();
					this.bookedService.getEstateReviews(this.estate_id);
					this.bookedService.getEstateSummary(this.estate_id);
				}	
			}
		)
	}
  viewpreEstateDetails(){
		this.userService.getAvailableEstateList(this.roasterId,this.estate_id).subscribe(
			res=>{
				if(res['success'] == true){
					this.company_image_thumbnail_url=res['result']['company_image_thumbnail_url'];
					this.owner_name=res['result']['owner_name'];
					this.address_line1=res['result']['address_line1'];
					this.address_line2=res['result']['address_line2'];
					this.city=res['result']['city'];
					this.zipcode=res['result']['zipcode'];
					this.rating=res['result']['rating'];
				}	
			}
		)
	}

	viewpreLotDetails(){
		this.userService.getRoasterLotDetails(this.roasterId,this.estate_id,this.lot_id).subscribe(
			res=>{
				if(res['success'] == true){
					this.flavours=res['result']['flavours'];
					this.soil_footprint=res['result']['soil_footprint'];
					this.species=res['result']['species'];
					this.avg_cup_score=res['result']['avg_cup_score'];
					this.water_analysis=res['result']['water_analysis'];
					this.crop=res['result']['crop'];
					this.annual_production=res['result']['annual_production'];
				}
			}
		)
	}

	ViewRecentActivity(){
		this.userService.getRecentActivity(this.roasterId,this.orderPreId).subscribe(
			res=>{
				if(res['success'] == true){
					console.log(res);
					this.recentactivityarray=res['result'];
				}

			}
		)
	}
}
