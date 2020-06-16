import { Component, OnInit } from '@angular/core';

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
  review:any;
  reviewUser:any;
  communication:any=0;
  experience:any=0;
  communicationUser:any=0;
  experienceuser:any=0;

  experienceError:string;
  communicationError:string;
  reviewError:string;
  experienceUserError:string;
  communicationUserError:string;
  reviewUserError:string;

  constructor() {
    this.experienceError = '';
    this.communicationError = ''; 
    this.reviewError = '';
    this.experienceUserError = ''; 
    this.communicationUserError = '';
    this.reviewUserError = ''; 
   }

  ngOnInit(): void {
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
    // console.log(this.experience);
    if ( this.experience == "0") {
      this.experienceError = "Tap the stars to rate";
      // document.getElementById('experienceId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.experienceError = "";
      }, 3000);
    }else if (this.communication == "0") {
      this.communicationError = "Tap the stars to rate";
      // document.getElementById('communicationId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.communicationError = "";
      }, 3000);
    }
    else if (this.review == "" || this.review == null || this.review == undefined) {
      this.reviewError = "please write your review";
      document.getElementById('reviewId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.reviewError = "";
      }, 3000);
    }
    else if (this.experienceuser == "0") {
      this.experienceUserError = "Tap the stars to rate";
      // document.getElementById('reviewId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.experienceUserError = "";
      }, 3000);
    }
    else if (this.communicationUser == "0") {
      this.communicationUserError = "Tap the stars to rate";
      // document.getElementById('reviewId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.communicationUserError = "";
      }, 3000);
    }
    else if (this.reviewUser == "" || this.reviewUser == null || this.reviewUser == undefined) {
      this.reviewUserError = "please write your review";
      document.getElementById('reviewUserId').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.reviewUserError = "";
      }, 3000);
    }

  }

  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #E8E8E8";
    }
  }
}
