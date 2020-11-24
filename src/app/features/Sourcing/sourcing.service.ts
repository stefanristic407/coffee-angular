import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from '../roastery-profile/roastery-profile.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SourcingService {
  currentView : string = "search";
  roaster_id: string;
  name: any;
  description: any;
  total_area: any;
  altitude_start: any;
  altitude_end: any;
  crop_year_start: any;
  crop_year_end: any;
  location: any;
  processing_types: any;
  soil_footprint: any;
  temperature_range: any;
  packaging: any;
  other_crops: any;
  wild_animals: any;
  gps_coordinates: any;
  founded_on: any;
  annual_prod: any;
  coffee_production: any;
  country: any;
  coordinates: any;
  latitude: number;
  longitude: number;
  emptyCoord: any;
  countryName: any;
  detailList: any;
  owner_name: any;
  grade_range: any;
  rating: any;
  agronomist_access: any;
  number_of_trees: any;
  city: any;
	lots: any;
  flavourList: any;
  activeLandlots:any;
	greenList: any;
  
	harvestData: any;

	available_name: any;
  available_estate_name: any;
  lot_id: any;
  region: any;
  about: any;
  price: any;
  price_unit: any;
  quantity_count: any;
  quantity_type: any;
  quantity: any;
  quantity_unit: any;
  cup_score: any;
  cupped_at: any;
  evaluator_dp_thumb: any;
  evaluator_name: any;
  harvest_date: any;
  flavours: any;
  max_altitude_coffee: any;
  min_altitude_coffee: any;
  shipping_to: any;
	availabilty_variety: any;
	availability_species: any;
	ico_number: any;
	initial_quantity: any;
	state: any;
	type: any;
	listing_status: any;
	wet_fermentation: any;
	wet_process: any;
	dry_period: any;
	dry_process: any;
	dry_water_activity: any;
	dry_moisture_content: any;
  date_cupped: string;
	estate_rating: any;
  estateContacts:any =[];
  images: any;
	estateCertificates: any;
	resultArray: any;
	mapped: { type: string; value: any; }[];
	valueList: any;
	finalCertify: any=[];
	overviewCertify:any;


  			constructor(private http: HttpClient, public userService : UserserviceService, private cookieService : CookieService,
              private toastrService : ToastrService,public profileservice:RoasteryProfileService) {
				this.roaster_id = this.cookieService.get('roaster_id');
				this.certificateList();
   }

   estateDetailList(){
    this.userService.getAvailableEstateList(this.roaster_id,this.detailList).subscribe(
      result=>{
      if(result['success']==true){
        this.name=result['result']['name'];
        this.description=result['result']['description'];
        this.total_area=result['result']['total_area'];
        this.altitude_start=result['result']['altitude_start'];
        this.altitude_end=result['result']['altitude_end'];
        this.crop_year_start=result['result']['crop_year_start'];
        this.crop_year_end=result['result']['crop_year_end'];
        this.location=result['result']['location'];
        this.processing_types=result['result']['processing_types'];
        this.soil_footprint=result['result']['soil_footprint'];
        this.temperature_range=result['result']['temperature_range'];
        this.packaging=result['result']['packaging'];
        this.other_crops=result['result']['other_crops'];
        this.wild_animals=result['result']['wild_animals'];
        this.gps_coordinates=result['result']['gps_coordinates'];
		this.founded_on=result['result']['founded_on'];
    	this.annual_prod=result['result']['total_production'];
    this.coffee_production=result['result']['coffee_production'];
    this.owner_name=result['result']['owner_name'];
	this.grade_range=result['result']['grade_range'];
	this.rating=result['result']['rating'];
	this.agronomist_access=result['result']['agronomist_access'];
	this.number_of_trees=result['result']['number_of_trees'];
	this.city=result['result']['state'];
    this.country=result['result']['country'];
    if(this.gps_coordinates!=''){
      this.coordinates=this.gps_coordinates.split(',');
      this.latitude=parseFloat(this.coordinates[0].slice(0,-3));
      this.longitude=parseFloat(this.coordinates[1].slice(0,-3));
    //  this.latCoord=this.coordinates[0].split(' ')[0];
    //  this.longCoord=this.coordinates[1].split(' ')[1];
    //   this.latitude=parseFloat(this.latCoord.slice(0,-1));
    //   this.longitude=parseFloat(this.longCoord.slice(0,-1));
    //   console.log(this.latitude);
    //   console.log(this.longitude);
      }
      else{
        this.emptyCoord = this.gps_coordinates;
      }
		this.countryName = this.profileservice.countryList.find(con => con.isoCode == this.country.toUpperCase()).name;
		console.log(this.countryName);
		
        }
      }
    )
  }

  availableDetailList(){
    this.userService.getGreenCoffeeDetails(this.roaster_id,this.harvestData).subscribe(
      result=>{
        console.log(result);
      if(result['success']==true){
        this.available_name=result['result']['name'];
		  this.available_estate_name=result['result']['estate_name'];
		  this.lot_id=result['result']['lot_id'];
		  this.region=result['result']['region'];
		  this.about=result['result']['about'];
		  this.price=result['result']['price'];
		  this.price_unit=result['result']['price_unit'];
		  this.quantity_count=result['result']['quantity_count'];
		  this.quantity_type=result['result']['quantity_type'];
		  this.quantity=result['result']['quantity'];
		  this.quantity_unit=result['result']['quantity_unit'];
		  this.cup_score=result['result']['cupping']['cup_score'];
		  this.cupped_at=result['result']['cupping']['cupped_at'];
		  this.date_cupped = new DatePipe('en-Us').transform(this.cupped_at, 'MMM d, y', 'GMT+5:30');
	
		  this.evaluator_dp_thumb=result['result']['cupping']['evaluator_dp_thumb'];
		  this.availabilty_variety=result['result']['variety'];
		  this.availability_species=result['result']['species'];
		  this.evaluator_name=result['result']['cupping']['evaluator_name'];
		  this.harvest_date=result['result']['harvest_date'];
		  this.flavours=result['result']['flavours'];
		  this.max_altitude_coffee=result['result']['max_altitude'];
		  this.min_altitude_coffee=result['result']['min_altitude'];
		  this.shipping_to=result['result']['shipping_to'];
		  this.ico_number=result['result']['incoterm'];
		  this.initial_quantity=result['result']['initial_quantity'];
		  this.state=result['result']['state'];
		  this.type=result['result']['type'];
		  this.listing_status=result['result']['listing_status'];	  
		  this.wet_process=result['result']['wet_milling']['process'];
		  this.wet_fermentation=result['result']['wet_milling']['fermentation'];
		  this.dry_period=result['result']['dry_milling']['drying_period'];
		  this.dry_process=result['result']['dry_milling']['process'];
		  this.dry_water_activity=result['result']['dry_milling']['water_activity'];
		  this.dry_moisture_content=result['result']['dry_milling']['moisture_content'];	
		  this.packaging=result['result']['packaging'];
      this.estate_rating=result['result']['estate_rating'];
      this.images=result['result']['images'];
      }
    })
	}
	
//   harvestData(roaster_id: string, harvestData: any) {
//     throw new Error("Method not implemented.");
//   }

   getImages() {
    return this.http.get<any>('assets/photos.json')
      .toPromise()
      .then(res => res.data)
      .then(data => { return data; });
	}
	
	lotsList(){
		this.userService.getavailableLots(this.roaster_id,this.detailList).subscribe(
		  resultList=>{
			if(resultList['success']==true){
				this.lots=resultList['result'];
			}
		  }
		);
	}

	flavourprofileList(){
		this.userService.getFlavourProfile().subscribe(
			result=>{
				if(result['success']==true){
					this.flavourList=result['result'];
				}
			}
		)
	}	
	greenCoffee(){
		this.userService.getGreenCoffee(this.roaster_id,this.detailList).subscribe(
		  result=>{
			if(result['success']==true){
			  this.greenList=result['result'];
			  console.log("Green Coffee"+this.greenList);
			}
		})
  }	    
  estateEmployees(){
    this.userService.getEstateContacts(this.detailList).subscribe(res =>{
      if(res['success']==true){
        this.estateContacts = res['result'];
        console.log(this.estateContacts)
      }
    })
  }
  certificateList(){
	this.userService.getEstateCertificates().subscribe(res =>{
		if(res['success']==true){
		  this.estateCertificates = res['result'];
		   this.mapped = Object.keys(this.estateCertificates).map(key => ({type: key, value: this.estateCertificates[key]}));
		   console.log(this.mapped);
		   this.mapped.forEach(item=>{
			//    this.finalCertify=[]
			   this.valueList=item.value;
			   this.finalCertify.push(this.valueList);
		   });
		  console.log(this.finalCertify);
		}
	})
  }
}
