import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-brand-profile',
  templateUrl: './brand-profile.component.html',
  styleUrls: ['./brand-profile.component.css']
})
export class BrandProfileComponent implements OnInit {
  homeval: number = 5 ;
  aboutval: number = 15 ;
  learnval:  number = 5 ;
  sustainval: number = 5 ;
  visitval: number = 15 ;

  constructor() { }

  ngOnInit(): void {
  }

}
