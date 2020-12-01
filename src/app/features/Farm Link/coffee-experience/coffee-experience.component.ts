// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-coffee-experience',
  templateUrl: './coffee-experience.component.html',
  styleUrls: ['./coffee-experience.component.css']
})
export class CoffeeExperienceComponent implements OnInit {
   
  appLanguage?: any ={};
  greenActive:any =0;
  loader:boolean;
  searchTerm: any;
  estatetermStatus ;
  estatetermOrigin ;
  estatetermType ;
  displayNumbers ;
  coffeetermOriginMob ; 
  showOrigin: boolean = true;
  showDisplay:boolean =true;
  showStatus: boolean = true;
  constructor(public globals: GlobalsService) { 
// 	  this.data = 
//     [
//     { id: '65837', availibility_Name: 'Origanic washed Micro-lot', estate_Name: 'Finca La Pampa', origin: 'Brazil', variety: 'Bourborn',quandity: '278 Bags', cup_Score: '84.5', Actions: 'View' },
//     { id: '43284', availibility_Name: 'Blend washed', estate_Name: 'Gesha', origin: 'Guatemala', variety: 'Bourborn',quandity: '297 bags', cup_Score: '88', Actions: 'View' },
//     { id: '45627', availibility_Name: 'FTO blend', estate_Name: 'Finca La Toboba', origin: 'Spain', variety: 'Bourborn',quandity: '567 bags', cup_Score: '81.5', Actions: 'View' },
//     { id: '34638', availibility_Name: 'Mebratu', estate_Name: 'Asopraaaa', origin: 'Brazil', variety: 'Bourborn',quandity: '953 bags', cup_Score: '85.4', Actions: 'View' },
//     { id: '23238', availibility_Name: 'FTO Semi washed', estate_Name: 'Cafe Directo', origin: 'Sweden', variety: 'Bourborn',quandity: '110 bags', cup_Score: '82', Actions: 'View' },
//     { id: '14842', availibility_Name: 'Blend', estate_Name: 'La Isabela', origin: 'Vietnam', variety: 'Bourborn',quandity: '450 bags', cup_Score: '84', Actions: 'View' },

//   ];

}

  ngOnInit(): void {
   
    this.language();

  }
  language(){
   
    this.appLanguage = this.globals.languageJson;
   this.greenActive++;

  }
	toggleOrigin() {
		this.showOrigin = !this.showOrigin;
		if(this.showOrigin==false){
			document.getElementById('origin_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('origin_id').style.border="1px solid #d6d6d6";
		
		}
   }
   toggleStatus() {
		this.showStatus = !this.showStatus;
		if(this.showStatus==false){
			document.getElementById('status_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('status_id').style.border="1px solid #d6d6d6";
		
		}
   }
   toggleDisplay(){
		this.showDisplay = !this.showDisplay;
		if(this.showDisplay==false){
		  document.getElementById('display_id').style.border="1px solid #30855c";
	  }
	  else{
		  document.getElementById('display_id').style.border="1px solid #d6d6d6";
	  
	  }
	  }

}
