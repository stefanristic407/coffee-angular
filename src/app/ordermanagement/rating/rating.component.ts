import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

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

  constructor(public globals: GlobalsService) {
    this.experienceError = "";
    this.communicationError = ""; 
    this.reviewError = "";
    this.experienceUserError = ""; 
    this.communicationUserError = "";
    this.reviewUserError = ""; 
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

  onRate(event){
    this.experience=event.newValue;
    console.log(this.experience)
  }
  onCommunication(event){
    this.communication=event.newValue;
    console.log(this.communication)
  }
  onRateUser(event){
    this.experienceuser=event.newValue
  }
  onCommunicationUser(event){
    this.communicationUser=event.newValue
  }

  submitRating(){
    var $rating=$('.rating').find('.checked');

    if((this.review == "") &&  (this.reviewUser == "") && ($rating)){
      this.reviewError = "please write your review";
      this.reviewUserError = "please write your review";
      $('.rating').addClass('rating-required');
      $('.rating__item.checked').parents('.rating').removeClass('rating-required');
      document.getElementById('reviewId').style.border = "1px solid #D50000";
      document.getElementById('reviewUserId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.reviewError = "";
        this.reviewUserError = "";
      }, 7000);
    }
    else if (this.review == "" || this.review == null || this.review == undefined) {
      this.reviewError = "please write your review";
      document.getElementById('reviewId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.reviewError = "";
      }, 3000);
    }
    else if (this.reviewUser == "" || this.reviewUser == null || this.reviewUser == undefined) {
      this.reviewUserError = "please write your review";
      document.getElementById('reviewUserId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.reviewUserError = "";
      }, 3000);
    }
    else{

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
}
