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
  constructor() { }

  ngOnInit(): void {
  }

}
