import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-micro-roaster-details',
  templateUrl: './micro-roaster-details.component.html',
  styleUrls: ['./micro-roaster-details.component.css']
})
export class MicroRoasterDetailsComponent implements OnInit {
	appLanguage?: any;
	roasterId: string;
	listData: any;
	mrContacts: any;

	constructor(public globals: GlobalsService,private route : ActivatedRoute,public customer:CustomerServiceService,private userService:UserserviceService,
		private toastrService : ToastrService,	public cookieService: CookieService,private router : Router) {
		this.route.queryParams.subscribe(params => {
		this.customer.microId = params['folderId'];
		this.customer.mrCustomerDetails();
		this.getCerificatesList();
		this.estateEmployees();
		});
		this.roasterId = this.cookieService.get('roaster_id');
	}

	ngOnInit(): void {
		$('.btn-toggle').click(function () {
		$(this).find('.btn').toggleClass('active');
		$(this).find('.btn').toggleClass('active_default');
		$(this).find('.btn').toggleClass('disable_default');
		});
		this.appLanguage = this.globals.languageJson;

	}

	editDiscount(){
		document.getElementById("edit-discount").style.display = "none";
		document.getElementById("save-discount").style.display = "block";
	}

	saveDiscount(){
		var  discountData = {
			discount_percentage :parseFloat(this.customer.discount_percentage)
		}
		this.userService.updateMicroDiscount(this.roasterId,this.customer.microId,discountData).subscribe(
			res => {
				if(res['success'] == true){
					// this.customer.mrCustomerDetails();
					this.toastrService.success("Discount data updated sucessfully");
				}	
				else{
					this.toastrService.error("Error while updating discount data");
				}
			}
		);
		document.getElementById("edit-discount").style.display = "block";
		document.getElementById("save-discount").style.display = "none";
	}

	getCerificatesList(){
		this.userService.getMicroroasterCertificates(this.customer.microId).subscribe(
			res => {
				if(res['success'] == true){
					this.listData=res['result'];
					console.log(this.listData);
				}
			}
		);			
	}
	viewCertificate(data:any){
		const a = document.createElement("a"); 
		a.href = data.public_url ;
		a.download = data.name;
		a.target = "_blank";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a); 
	}
	estateEmployees(){
		this.userService.getMicroroasterContacts(this.customer.microId).subscribe(res =>{
		  if(res['success']==true){
			this.mrContacts = res['result'];
			console.log(this.mrContacts);
		  }
		})
	  }

	ngAfterViewInit(){
		document.getElementById("save-discount").style.display = "none";
	}
}
