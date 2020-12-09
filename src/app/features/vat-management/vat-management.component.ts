import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VatserviceService } from './vatservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-vat-management',
  templateUrl: './vat-management.component.html',
  styleUrls: ['./vat-management.component.css']
})
export class VatManagementComponent implements OnInit {
  saveshippingmode : boolean = true;
	editshippingmode : boolean = false;
  roasterId: any;
  shippingName:any;
  dayMin:any;
  dayMax:any;
  shippingPrice:any;
	shipId: any;

  constructor(private router : Router, 
    private toastrService: ToastrService,
    public vatService:VatserviceService,
    public userService : UserserviceService,
    public cookieService : CookieService
    ) { 
      this.roasterId = this.cookieService.get('roaster_id');
    }

  ngOnInit(): void {
	  this.getShippingInfo();
  }
  saveShippingInfo(){
	  
    var body = {
			"name" : this.shippingName,
			"day_min" : parseInt(this.dayMin),
			"day_max" : parseInt(this.dayMax),
			"price": parseInt(this.shippingPrice)
      }
      console.log(body);
    this.userService.addRoasterShippingDetails(this.roasterId,body).subscribe(
      response=>{
        if(response['success']==true){
		  this.toastrService.success("Shipping Type Details saved successfully");
		  this.getShippingInfo();

          this.editshippingmode=true;
          this.saveshippingmode=false;
        }
        else{
          this.toastrService.error("Error while saving shipping type details");
        }
      }
    )
   
  }
  getShippingInfo(){
	  this.userService.getRoasterShippingTypes(this.roasterId).subscribe(
		result=>{

			if(result['success']== true){
				this.shipId= result['result'][0]['id'];
				this.shippingName = result['result'][0]['name'];
				this.dayMin = result['result'][0]['day_min'];
				this.dayMax = result['result'][0]['day_max'];
				this.shippingPrice = result['result'][0]['price'];
				console.log(this.dayMin);
				console.log(this.dayMax);
				console.log(this.shippingPrice);
			
		  }
		}
	  )
	}
	editShippingInfo(){
		this.editshippingmode=false;
				this.saveshippingmode=true;
	}
}
