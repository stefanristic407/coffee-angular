import { Component, OnInit } from '@angular/core';
import {GlobalsService} from 'src/services/globals.service';
import { SourcingService } from '../../sourcing.service';

@Component({
  selector: 'app-land-lots',
  templateUrl: './land-lots.component.html',
  styleUrls: ['./land-lots.component.css']
})
export class LandLotsComponent implements OnInit {
  appLanguage?: any;
  landLotsActive:any=0;
	flavourName: any;

  // public lots: any[] = [
	// 	{  lotname: 'Dilema', lotsize: '14 acres',score:'84', altitude: '1,966-2,019m', variety: 'Arabica',species:'Bourbon, Castillo',flavourprofile:'' },
	// 	{  lotname: 'Shaya', lotsize: '27.7 acres',score:'82.5',altitude: '1,956-1,998m', variety: 'Robusta',species:'Catimor, Typica',flavourprofile:''},
	// 	{  lotname: 'Gayni', lotsize: '39 acres',score:'86', altitude: '1,963-2,038m', variety: 'Robusta',species:'Catimor, Typica',flavourprofile:'' },
	// 	{  lotname: 'Agatha', lotsize: '5.4 acres', score:'79.4',altitude: '1,914-1,942m', variety: 'Arabica',species:'Bourbon, Castillo',flavourprofile:''}
  // ];
  constructor(public globals: GlobalsService,public sourcing : SourcingService) { }

  ngOnInit(): void {
    this.language();  
    this.sourcing.lotsList();
	this.sourcing.flavourprofileList();

  }

    language(){
      this.appLanguage = this.globals.languageJson;
      this.landLotsActive++;
    }
    getFlavourName(flavourid:any){
		if(this.sourcing.flavourList){
			this.flavourName = this.sourcing.flavourList.find(flavour => flavour.id == flavourid).name;
			return this.flavourName;
		}
		//  this.sourcing.flavourList.forEach(element=>{
		// 	 element.id == flavourid;
		// 	return element.name;
		//   } );
	}
	
}
