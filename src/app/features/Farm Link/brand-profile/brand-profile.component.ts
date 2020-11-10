import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';


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
  appLanguage?: any;
	brandProfileActive:any=0;
  constructor(
		private globals: GlobalsService) { }

ngOnInit(): void {
    this.language();
    $('.nav-links__item').removeClass('active');
    $('.nav-links__item').eq(1).addClass('active');
}
language(){
	this.appLanguage = this.globals.languageJson;
	this.brandProfileActive++;
}

}
