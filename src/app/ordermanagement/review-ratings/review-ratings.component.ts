import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-ratings',
  templateUrl: './review-ratings.component.html',
  styleUrls: ['./review-ratings.component.css']
})
export class ReviewRatingsComponent implements OnInit {
  totalstar = 5;
  newvalue: any = 2;
  reviewvalue: any = 4;
  termStatus: any;
 

  constructor() { 

    this.termStatus = '';
    
  }

  ngOnInit(): void {
  }

  setStatus(term: any) {
    this.termStatus = term;
  }
}
