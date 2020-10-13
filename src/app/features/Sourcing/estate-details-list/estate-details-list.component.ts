import { Component, OnInit} from '@angular/core';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-estate-details-list',
  templateUrl: './estate-details-list.component.html',
  styleUrls: ['./estate-details-list.component.css']
})
export class EstateDetailsListComponent implements OnInit {
  appLanguage: any;
  estateDetailsActive:any=0;

  public coffeedata: any[] = [
		{  estatename: 'Finca La Pampa', name: 'Organic washed Micro-lot',origin:'Colombia', species: 'Bourbon', price: '$7.4 USD / kg',quantity:'287 bags','image':'/assets/images/sourcing-image1.jpg',score:'84.5' },
		{  estatename: 'Gesha', name: 'Blend washed',origin:'Colombia',species: 'Bourbon', price: '$5.53USD / kg',quantity:'297 bags','image':'/assets/images/sourcing-image3.jpg',score:'88.0' },
		{  estatename: 'Finca La Toboba', name: 'FTO blend',origin:'Ethopia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'567 bags','image':'/assets/images/sourcing-image7.jpg',score:'81.5' },
		// {  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Bourbon', price: '$7.4 USD / kg',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
		// {  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '$5.6 USD / kg',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82' },
		// {  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84' }
  ];
  constructor(private globals: GlobalsService) { }
  
  ngOnInit(): void {
    this.language();
  }
  language(){
    this.appLanguage = this.globals.languageJson;
    this.estateDetailsActive++;
	}
}
