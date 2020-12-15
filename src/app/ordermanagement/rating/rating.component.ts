import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderBookedService } from '../order-booked/order-booked.service';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  totalstar = 5;
  newvalue: any = 4;
  val: number = 5;
  val3:any;
  review:any="";
  reviewUser:any="";
  communication:any=0;
  experience:any=0;
  communicationUser:any=0;
  experienceuser:any=0;

  experienceError:any;
  communicationError:any;
  reviewError:any;
  experienceUserError:any;
  communicationUserError:any;
  reviewUserError:any;
	appLanguage?: any;
	roasterId: any;
	greenCoffee: any;
	resetButtonValue: string ='Submit';
	countryValue: any;

  constructor(public globals: GlobalsService,public userService : UserserviceService,public cookieService : CookieService,public bookedService : OrderBookedService,private toastrService: ToastrService,public profile:RoasteryProfileService) {
    this.experienceError = "";
    this.communicationError = ""; 
    this.reviewError = "";
    this.experienceUserError = ""; 
    this.communicationUserError = "";
	this.reviewUserError = ""; 
	this.roasterId = this.cookieService.get('roaster_id');
   }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
    //Ratings
    $('.rating__item input[type="checkbox"]').on('change', function () {
      var $this = $(this);
      var $prev = $(this).parents('.rating__item').index();
      var $next = $(this).parents('.rating').find('.rating__item').length;
      $(this).parents('.rating__item').addClass('checked');
      $(this).parents('.rating').find('.rating__item').find('input[type="checkbox"]').prop('checked', true)
  
      for(var i=$prev+1; i<=$next; i++) {
        $(this).parents('.rating').find('.rating__item').eq(i).removeClass('checked');
        $(this).parents('.rating').find('.rating__item').eq(i).find('input[type="checkbox"]').prop('checked', false)
      }
      if ($this.is(':checked')) {
        console.log($(this).val());
        $(this).parents('.rating').removeClass('rating-required');
        for(var x=0; x<$prev;x++) {
          $(this).parents('.rating').find('.rating__item').eq(x).addClass('checked');
          $(this).parents('.rating').find('.rating__item').eq(x).find('input[type="checkbox"]').prop('checked', true)
        }
      }
  
  });
  }

//   onRate(event){
//     this.experience=event.newValue;
//     console.log(this.experience)
//   }
//   onCommunication(event){
//     this.communication=event.newValue;
//     console.log(this.communication)
//   }
//   onRateUser(event){
//     this.experienceuser=event.newValue
//   }
//   onCommunicationUser(event){
//     this.communicationUser=event.newValue
//   }
  onCheckboxChange(e){
	  console.log("star"+ e.target.value);
	  this.greenCoffee=e.target.value;
  }
  onCheckboxChangeFirst(data)
  {
	console.log("star"+ data.target.value);
	this.experience=data.target.value;
  }
  onCheckboxChangeSecond(item){
	console.log("star"+ item.target.value);
	this.communication=item.target.value;
  }
  submitRating(){
    var $rating=$('.rating').find('.checked');

    if((this.review == "")  && ($rating)){
      this.reviewError = "please write your review";
      this.reviewUserError = "please write your review";
      $('.rating').addClass('rating-required');
      $('.rating__item.checked').parents('.rating').removeClass('rating-required');
      document.getElementById('reviewId').style.border = "1px solid #D50000";
      document.getElementById('reviewUserId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.reviewError = "";
      }, 7000);
    }
    else if (this.review == "" || this.review == null || this.review == undefined) {
      this.reviewError = "please write your review";
      document.getElementById('reviewId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.reviewError = "";
      }, 3000);
    }
    else{
		this.resetButtonValue = "Submitting";
		var data={
			"overall_experience" : parseInt(this.experience),
			"communication" : parseInt(this.communication),
			"green_coffee" : parseInt(this.greenCoffee),
			"review": this.review
		}
		this.userService.addReviewOrder(this.roasterId,this.bookedService.orderId,data).subscribe(
			res=>{
				if(res['success']==true){
					this.resetButtonValue = "Submit"
					this.toastrService.success("Rate and Review of order submitted successfully");
				}
				// else if(res['success']==false){

				// }	
				else{
					this.toastrService.error("Error while submitting details");
					this.resetButtonValue = "Submit"

				}
			}
		)
    }
  }
  submitMobRating(){
    var $rating=$('.rating').find('.checked');

    if($rating){
      $('.rating').addClass('rating-required');
      $('.rating__item.checked').parents('.rating').removeClass('rating-required');
    }
    else{
      
    }

  }
  onKeyPress(event: any) {
    if (event.target.value != "") {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  }
	GetCountry(data:any){
		// console.log(data.toUpperCase());
		if(data){
		this.countryValue=this.profile.countryList.find(con =>con.isoCode == data.toUpperCase());
		if(this.countryValue)
			return this.countryValue.name;
		}
	}
	changeDecimal(val:any){
		if(val){
			return parseFloat(val).toFixed(1);
		}
	}
}
