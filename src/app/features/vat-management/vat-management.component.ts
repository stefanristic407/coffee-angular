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
	saveshippingmode : boolean;
	editshippingmode : boolean;
	roasterId: any;
	shippingName:any;
	dayMin:any;
	dayMax:any;
	shippingPrice:any;
	shipId: any;
	shippData: any;
	resetButtonValue: string ='Save';

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
	getShippingInfo(){
		this.userService.getRoasterShippingTypes(this.roasterId).subscribe(
			result=>{
				if(result['success']== true){
					this.shippData=result['result'];
					this.firstLoadMode();
					console.log(this.shippData)
					if(this.shippData.length != 0){
						this.shipId= result['result'][0]['id'];
						this.shippingName = result['result'][0]['name'];
						this.dayMin = result['result'][0]['day_min'];
						this.dayMax = result['result'][0]['day_max'];
						this.shippingPrice = result['result'][0]['price'];
					}
					console.log(this.dayMin);
					console.log(this.dayMax);
					console.log(this.shippingPrice);
				}
			}
		)
	}
	firstLoadMode(){
		if(this.shippData.length != 0){
			this.editshippingmode=true;
			this.saveshippingmode=false;
		}
		else{
			this.saveshippingmode=true;
			this.editshippingmode=false;
		}
	}
	private validateInput(){
		let flag = true;
		if (this.shippingName === '' || this.dayMin === '' || this.dayMax === '' || this.shippingPrice === ''){
			flag = false;
		}
		return flag;
	}

	saveShippingInfo(){
		let flag = this.validateInput();
		if (flag){
			if(this.shippData.length == 0){
				this.resetButtonValue = "Saving";
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
						this.resetButtonValue = "Save"
						this.toastrService.success("Shipping  Details saved successfully");
						this.getShippingInfo();
						this.editshippingmode=true;
						this.saveshippingmode=false;
					}
					else{
						this.toastrService.error("Error while saving shipping  details");
						this.resetButtonValue = "Save"
					}
				}
				)
			}
			else{
				if(this.shipId){
					this.resetButtonValue = "Saving";
					var data = {
						"name" : this.shippingName,
						"day_min" : parseInt(this.dayMin),
						"day_max" : parseInt(this.dayMax),
						"price": parseInt(this.shippingPrice)
					}
					this.userService.updateRoasterShippingTypes(this.roasterId,this.shipId,data).subscribe(
					res=>{
						if(res['success'] == true){
							this.resetButtonValue = "Save";
							this.toastrService.success("Shipping Details Updated successfully");
							this.editshippingmode=true;
							this.saveshippingmode=false;
						}
						else{
							this.toastrService.error("Error while updating shipping  details");
							this.resetButtonValue = "Save";
						}
					}			
					)
				}
			}	
		}
		else{
			this.toastrService.error("Fields should not be empty.");
			this.resetButtonValue = "Save";
		}
	}
	
	editShippingInfo(){
		this.saveshippingmode=true;
		this.editshippingmode=false; 
	}
}
