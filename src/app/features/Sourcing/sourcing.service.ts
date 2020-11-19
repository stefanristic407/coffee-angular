import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from '../roastery-profile/roastery-profile.service';

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
  
  constructor(private http: HttpClient, public userService : UserserviceService, private cookieService : CookieService,
              private toastrService : ToastrService,public profileservice:RoasteryProfileService) {
                this.roaster_id = this.cookieService.get('roaster_id');
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
        this.location=result['result']['location'];
  
      }
    })
    }
  harvestData(roaster_id: string, harvestData: any) {
    throw new Error("Method not implemented.");
  }

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
				// console.log("Lots:"+ this.lots);
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
		  }
		)
	  }	    
}
