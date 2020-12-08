import { Injectable } from '@angular/core';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  estateId: string;
  roasterId: string;
  microRoasterWeb : string = 'https://qa-micro-roaster.sewnstaging.com';
  
  horecaWeb:string =  'https://qa-client-horeca.sewnstaging.com';
  microId:any;
  horecaId:any;
	name: any;
	company_name: any;
	owner_name: any;
	company_image_url: any;
	country: any;
	description: any;
	company_type: any;
	status: any;
	founded_on: any;
	discount_percentage: any;
	admin_id: any;
	website: any;
	email: any;
	btnToggle = true;
	statusChange: string;
	total_employees: any;
	capacity: any;
	capacity_unit: any;
	emailId:any;
	pendingList: any;
	pendingHorecaList: any;
	admin_name: any;
	pendingCompany: any;
	pendingEmail: any;
	pendingStatus: any;
	headerValue:any;
	pendingType: any;

  constructor( private roasterService: RoasterserviceService,
	public cookieService: CookieService,
	private userService:UserserviceService,
	private toastrService : ToastrService,
	private router : Router) { 
    this.estateId = this.cookieService.get('estate_id');
    this.roasterId = this.cookieService.get('roaster_id');
  }

	stimulatedLogin(item:any) {
		console.log(item);
		var itemId = item;
		this.roasterService.getMicroRoasterStimulatedLogin(itemId, this.roasterId).subscribe(res => {
		if (res['success']) {
			const data = res['result'];
			data['micro_roaster_id'] = itemId;
			const encryptedCode = this.roasterService.encryptData(data);
			const redirectUrl = this.microRoasterWeb + '/auth/login?simulated_token=' + encodeURIComponent(encryptedCode);
			this.roasterService.navigate(redirectUrl, true);
		}
		}, err => {
		console.log(err);
		});
	}

	horecaStimulatedLogin(item) {
		var itemId = item;
		this.roasterService.getHorecaStimulatedLogin(itemId, this.roasterId).subscribe(res => {
		  if (res['success']) {
			const data = res['result'];
			data['horeca_id'] = itemId;
			const encryptedCode = this.roasterService.encryptData(data);
			// const decryptedCode = this.roasterService.decryptData(encryptedCode);
			// console.log(decryptedCode);
			const redirectUrl = this.horecaWeb + '/auth/login?simulated_token=' + encodeURIComponent(encryptedCode);
			this.roasterService.navigate(redirectUrl, true);
		  }
		}, err => {
		  console.log(err);
		});
	  }
	

	mrCustomerDetails(){
		this.userService.getMicroDetails(this.roasterId,this.microId).subscribe(
			result=>{
				console.log(result);
				if(result['success']==true){
					this.name = result['result'].name;
					this.company_name = result['result'].company_name;
					this.admin_name=result['result'].admin_name;
					this.owner_name = result['result'].owner_name;
					this.company_image_url = result['result'].company_image_url;
					this.country = result['result'].country;
					this.description = result['result'].description;
					this.status = result['result'].status;
					this.btnToggle = this.status == "ACTIVE" ? true : false;
					this.company_type = result['result'].company_type;
					this.founded_on = result['result'].founded_on;
					this.admin_id = result['result'].admin_id;
					this.discount_percentage = result['result'].discount_percentage;
					this.email = result['result'].email;
					this.website = result['result'].website;
					this.total_employees = result['result'].total_employees;
					this.capacity = result['result'].capacity;
					this.capacity_unit = result['result'].capacity_unit;
				}
				else{
					this.toastrService.error(" Error while getting the details");
					this.router.navigate(['/features/customer-management']);
				}
			}
		);
	}
	hrcCustomerDetails(){
		this.userService.getHorecaDetails(this.roasterId,this.horecaId).subscribe(
			result=>{
				if(result['success']==true){
					this.name = result['result'].name;
					this.company_name = result['result'].company_name;
					this.owner_name = result['result'].owner_name;
					this.admin_name=result['result'].admin_name;
					this.company_image_url = result['result'].company_image_url;
					this.country = result['result'].country;
					this.description = result['result'].description;
					this.status = result['result'].status;
					this.btnToggle = this.status == "ACTIVE" ? true : false;
					this.company_type = result['result'].company_type;
					this.founded_on = result['result'].founded_on;
					this.admin_id = result['result'].admin_id;
					this.discount_percentage = result['result'].discount_percentage;
					this.email = result['result'].email;
					this.website = result['result'].website;
				}
				else{
					this.toastrService.error(" Error while getting the details");
					this.router.navigate(['/features/customer-management']);
				}
			}
		);
	}

	activeStatus(value : any) {
		if(value == "horeca"){
			this.btnToggle = !this.btnToggle;
			if(this.btnToggle == true){
			  this.statusChange = "ACTIVE";
			  this.userService.updateHorecaEnable(this.roasterId,this.horecaId).subscribe(
				res => {
					if(res['success'] == true){
						this.hrcCustomerDetails();
						this.toastrService.success("Company Account has been Enabled");
					}
					else{
						this.toastrService.error("Error while enabling the company account");
					}
				}
			  )
			}
			else{
			  this.statusChange = "INACTIVE";
			  this.userService.updateHorecaDisable(this.roasterId,this.horecaId).subscribe(
				res => {
					if(res['success'] == true){
						this.hrcCustomerDetails();
						this.toastrService.success("Company Account has been Disabled");
					}
					else{
						this.toastrService.error("Error while disabling the company account");
					}
				}
			)}
		}
		else{
			this.btnToggle = !this.btnToggle;
			if(this.btnToggle == true){
			  this.statusChange = "ACTIVE";
			  this.userService.updateMicroRoasterEnable(this.roasterId,this.microId).subscribe(
				res => {
					if(res['success'] == true){
						this.mrCustomerDetails();
						this.toastrService.success("Company Account has been Enabled");
					}
					else{
						this.toastrService.error("Error while enabling the company account");
					}
				}
			  )
			}
			else{
			  this.statusChange = "INACTIVE";
			  this.userService.updateMicroRoasterDisable(this.roasterId,this.microId).subscribe(
				res => {
					if(res['success'] == true){
						this.mrCustomerDetails();
						this.toastrService.success("Company Account has been Disabled");
					}
					else{
						this.toastrService.error("Error while disabling the company account");
					}
				}
			  )
			}
		}
		
	  }
	// activeStatus() {
	// 	this.btnToggle = !this.btnToggle;
	// 	if(this.btnToggle == true){
	// 	  this.statusChange = "ACTIVE";
	// 	  console.log(this.statusChange)
	// 	}
	// 	else{
	// 	  this.statusChange = "INACTIVE";
	// 	  console.log(this.statusChange)
	// 	}
	//   }
	
	pendingMrDetails(){
		this.userService.getMrCustomerPendingDetails(this.roasterId,this.emailId).subscribe(
			res => {
				if(res['success'] == true){
					this.pendingList=res['result'][0];
					this.pendingCompany=this.pendingList.name;
					this.pendingEmail=this.pendingList.email;
					this.pendingStatus=this.pendingList.status;
					this.headerValue="Micro-Roaster";
					console.log(this.pendingList);
			}			
		});			
	}
	pendingHorecaDetails(){
		this.userService.getCustomerPendingDetails(this.roasterId,this.emailId).subscribe(
			res => {
				if(res['success'] == true){
					this.pendingHorecaList=res['result'][0];
					this.pendingCompany=this.pendingHorecaList.name;
					this.pendingEmail=this.pendingHorecaList.email;
					this.pendingStatus=this.pendingHorecaList.status;
					this.pendingType=this.pendingHorecaList.type;
					this.headerValue="HoReCa";
					console.log(this.pendingHorecaList);
				}			
			}
		);			
	}
}
