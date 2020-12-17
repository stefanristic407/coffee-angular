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
	company_image_thumbnail_url: any;
	owner_name: any;
	address_line1: any;
	address_line2: any;
	zipcode: any;
	city: any;
	rating: any;
	reviewsList: any;
	summaryList: any;
	overall: any;
	communication: any;
	green_coffee: any;
	rate_rating: any;
	total_review: any;
	five_star: any;
	four_star: any;
	three_star: any;
	two_star: any;
	one_star: any;
	rate_rating_star: any;
	countryValue: any;
	country: any;
	invoice_url: any;
	payment_status: any;
	receipt_url: any;
	payment_after_delivery: any;
	order_status: any;
	created_at_time:any;
	recent_status:any;
	recentactivityarray:any=[];

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
					this.invoice_url = res['result']['invoice_url'];
					this.payment_status = res['result']['payment_status'];
					this.receipt_url = res['result']['receipt_url'];
					this.payment_after_delivery = res['result']['payment_after_delivery'];
					this.order_status = res['result']['status'];

					if(this.payment_status == 'VERIFIED'){
						this.uploadShow = false;
						this.receiptShow = true;
						this.statusPaid = true;
						this.statusPending = false;
						
					}

					this.viewAvailability();
					this.viewEstateDetails();
					this.getEstateReviews(this.estate_id);
					this.getEstateSummary(this.estate_id);
					this.ViewRecentActivity();
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
					this.company_image_thumbnail_url=res['result']['company_image_thumbnail_url'];
					this.owner_name=res['result']['owner_name'];
					this.address_line1=res['result']['address_line1'];
					this.address_line2=res['result']['address_line2'];
					this.city=res['result']['city'];
					this.zipcode=res['result']['zipcode'];
					this.rating=res['result']['rating'];
					this.country=res['result']['country']
				}	
			}
		)
	}
	getEstateReviews(data:any){
		this.userService.getEachEsateReviews(data,this.orderId).subscribe(
		res=>{
			if(res['success']==true){
			this.reviewsList=res['result'];
			console.log(this.reviewsList);
			}
		}
		)
	}
	getEstateSummary(data:any){
		this.userService.getEachEsateReviewsSummary(data).subscribe(
		res=>{
			if(res['success']==true){
			this.summaryList=res['result'];
			console.log(this.summaryList);
			this.overall=this.summaryList['average']['overall_experience'];
			this.communication=this.summaryList['average']['communication'];
			this.green_coffee=this.summaryList['average']['green_coffee'];
			this.rate_rating=parseFloat(this.summaryList['summary']['rating']).toFixed(1);
			this.rate_rating_star= this.summaryList['summary']['rating'];
			this.total_review=this.summaryList['summary']['total_review'];
			this.five_star=this.summaryList['summary']['5_star'];
			this.four_star=this.summaryList['summary']['4_star'];
			this.three_star=this.summaryList['summary']['3_star'];
			this.two_star=this.summaryList['summary']['2_star'];
			this.one_star=this.summaryList['summary']['1_star'];
			}
		}
		)
	}	

	ViewRecentActivity(){
		this.userService.getRecentActivity(this.roasterId,this.orderId).subscribe(
			res=>{
				if(res['success'] == true){
					console.log(res);
					this.recentactivityarray=res['result'];
				}

			}
		)
	}


}
