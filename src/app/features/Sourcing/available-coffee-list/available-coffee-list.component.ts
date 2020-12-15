import { Component, OnInit } from '@angular/core';
import { SourcingService } from '../sourcing.service';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';
import {GlobalsService} from 'src/services/globals.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
  selector: 'app-available-coffee-list',
  templateUrl: './available-coffee-list.component.html',
  styleUrls: ['./available-coffee-list.component.css']
})
export class AvailableCoffeeListComponent implements OnInit {
	items: GalleryItem[];
	appLanguage?: any;
	availableCoffeeActive:any=0;
	brandProfileEstateWeb: string= "https://qa-brand-profile.sewnstaging.com/estatebrandprofile/green-coffee";


	public data = [
		{
		  srcUrl: 'assets/images/galleria-1.jpg',
		  previewUrl: 'assets/images/thumbnail-4.jpg'
		},
		{
		  srcUrl: 'assets/images/galleria-2.png',
		  previewUrl: 'assets/images/thumbnail-2.jpg'
		},
		{
		  srcUrl: 'assets/images/galleria-3.png',
		  previewUrl: 'assets/images/thumbnail-3.jpg'
		}
	  ];
	  imageData = this.data;
	public coffeedata: any[] = [
		{  estatename: 'Finca La Pampa', name: 'Organic washed Micro-lot',origin:'Colombia', species: 'Bourbon', price: '$7.4 USD / kg',quantity:'287 bags','image':'/assets/images/sourcing-image1.jpg',score:'84.5' },
		{  estatename: 'Gesha', name: 'Blend washed',origin:'Colombia',species: 'Bourbon', price: '$5.53USD / kg',quantity:'297 bags','image':'/assets/images/sourcing-image3.jpg',score:'88' },
		{  estatename: 'Finca La Toboba', name: 'FTO blend',origin:'Ethopia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'567 bags','image':'/assets/images/sourcing-image7.jpg',score:'81.5' },
		// {  estatename: 'Asoproaaa', name: 'Mebratu', origin:'Brazil',species: 'Bourbon', price: '$7.4 USD / kg',quantity:'953 bags','image':'/assets/images/sourcing-image5.jpg',score:'85.4' },
		// {  estatename: 'Cafe Directo', name: 'FTO Semi washed', origin:'Ethopia',species: 'Bourbon', price: '$5.6 USD / kg',quantity:'110 bags','image':'/assets/images/sourcing-image4.jpg',score:'82' },
		// {  estatename: 'La Isabela', name: 'Blend1',origin:'Colombia', species: 'Bourbon', price: '$8.92 USD /kg',quantity:'450 bags','image':'/assets/images/sourcing-image8.jpg',score:'84' }
  ];

  
  public multi = [
		{
			"name": "Legend1",
			"series": [
			  {
				  "name": "27",
				  "value": 10
				},
				{
				  "name": "28",
				  "value": 8
				},
				{
				  "name": "1",
				  "value": 12
				},
				{
				  "name": "2",
				  "value": 19
				},
				{
				  "name": "3",
				  "value": 16
				},
				{
				  "name": "4",
				  "value": 11
				},
				{
				  "name": "5",
				  "value": 13
				},{
				  "name": "6",
				  "value": 23
				},{
				  "name": "7",
				  "value": 18
				},
				{
				  "name": "8",
				  "value": 18
				},
				{
					"name": "9",
					"value": 17
				  },{
					"name": "10",
					"value": 18
				  },{
					"name": "11",
					"value": 13
				  },
				  {
					"name": "12",
					"value": 17
				  },
				  {
					"name": "13",
					"value": 12
				  },
				  {
					"name": "14",
					"value": 10
				  }
			]
		  },
		{
		  "name": "Legend2",
		  "series": [
			{
			  "name": "27",
			  "value": 7
			},
			{
			  "name": "28",
			  "value": 2
			},
			{
			  "name": "1",
			  "value": 4
			},
			{
			  "name": "2",
			  "value": 9
			},
			{
			  "name": "3",
			  "value": 7
			},
			{
			  "name": "4",
			  "value": 3
			},
			{
			  "name": "5",
			  "value": 20
			},{
			  "name": "6",
			  "value": 15
			},{
			  "name": "7",
			  "value": 10
			},
			{
			  "name": "8",
			  "value": 15
			}
			,
			{
				"name": "9",
				"value": 13
			  },{
				"name": "10",
				"value": 13
			  },{
				"name": "11",
				"value": 10
			  },
			  {
				"name": "12",
				"value": 8
			  },
			  {
				"name": "13",
				"value": 7
			  },
			  {
				"name": "14",
				"value": 9
			  }
		  ]
		}];
	  
	  

    view: any[] = [1080, 340];

    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = 'Temperature (°C)';
    timeline = true;
    roundDomains = true;
  
    colorScheme = {
      domain: ['#f19634','#7c6be8']
    };
  
    // line chart
    autoScale = true;
	availableCertify: any;
	certiImage: any;
	certify: any;
	countryValue: any;
	flavourName: any;
	temperature:any;
	showTemperature: boolean = true;
	hourly:any;
	showHourly: boolean = true;


  constructor(
	public gallery: Gallery, 
	public lightbox: Lightbox,
	public globals: GlobalsService,
	private route : ActivatedRoute,
	public sourcing:SourcingService,
	private router : Router,
	public userService : UserserviceService,
	public profile:RoasteryProfileService,
	private roasterService: RoasterserviceService) {
	this.route.params.subscribe(params => {
		this.sourcing.harvestData = params['harvestId'];
		this.sourcing.estateNumber = params['estateId'];
		this.brandProfileEstateWeb = `https://qa-brand-profile.sewnstaging.com/estate/estate-${params['estateId']}/estatebrandprofile/green-coffee`;
		this.sourcing.availableDetailList();
		this.sourcing.otherAvailableCoffee();
		this.sourcing.getEachGreenCertify();
	  });
   }

  ngOnInit(): void {
	this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
	const lightboxRef = this.gallery.ref('lightbox');
	lightboxRef.setConfig({
		imageSize: ImageSize.Cover,
		thumbPosition: ThumbnailsPosition.Top
	  });
	  lightboxRef.load(this.items);

	  this.language();  
	  this.temperature = '';
	  this.hourly = '';

  }
  language(){
	this.appLanguage = this.globals.languageJson;
	this.availableCoffeeActive++;
  }


orderPlace(id : any){
	let navigationExtras: NavigationExtras = {
		queryParams: {
		  "gc_id": encodeURIComponent(id),
		}
	  }
  
	  this.router.navigate(['/features/available-confirm-order'], navigationExtras);
}
GetCountry(data:any){
    // console.log(data.toUpperCase());
    this.countryValue=this.profile.countryList.find(con =>con.isoCode == data.toUpperCase());
    // console.log(this.countryValue);
    return this.countryValue.name;
    // console.log(this.countryValue.name);
  }
  getFlavourName(flavourid:any){
	if(this.sourcing.flavourList){
	this.flavourName = this.sourcing.flavourList.find(flavour => flavour.id == flavourid).name;
	return this.flavourName;
	}
  }
  brandProfileSite(){
	const redirectUrl = this.brandProfileEstateWeb;
	this.roasterService.navigate(redirectUrl, true);
  }
  lotDetails(item){
	  this.router.navigate([`/features/available-coffee-list/${this.sourcing.estateNumber}/${item.harvest_id}`])
  }
	toggleTemperature(){
		this.showTemperature=!this.showTemperature;
		if(this.showTemperature==false){
				document.getElementById('temperature_id').style.border="1px solid #30855c";
			}
			else{
				document.getElementById('temperature_id').style.border="1px solid #d6d6d6";
			}
	  }
	  setTemperature(data:any){
		this.temperature=data;
	  }
	  toggleHourly(){
		this.showHourly=!this.showHourly;
		if(this.showHourly==false){
				document.getElementById('hourly_id').style.border="1px solid #30855c";
			}
			else{
				document.getElementById('hourly_id').style.border="1px solid #d6d6d6";
			}
		}
		setHourly(data:any){
		this.hourly=data;
		}
		getCertificateData(data:any){
			//   console.log(data);
			if(data.certificate_type_id > 0){
				this.certiImage=this.sourcing.finalCertify.filter(certify=>certify.id == data.certificate_type_id);
				if(this.certiImage !=''){
					return this.certiImage[0].image_url;
				}
			}
		}
	
}
