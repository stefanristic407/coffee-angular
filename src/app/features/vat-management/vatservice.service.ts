import { Injectable } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ThumbnailsPosition } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class VatserviceService {
	roasterId: string;
	savemode : boolean = false;
	editmode : boolean = true;
	mrList: any;
	b2bEcommerceList: any;
	mrCountry: any='';
	ecommerceCountry:any ='';
	public showadddatadiv: boolean = false;

  constructor(public userService : UserserviceService,
    public cookieService : CookieService,
    public roasterService : RoasterserviceService,
    public toastrService : ToastrService,
    public router: Router) {
	  this.roasterId = this.cookieService.get('roaster_id');
	  this.getVatDetails();
	 }
	 
	saveVatData() {
		this.savemode = false;
		this.editmode = true;
	}
	editVatData(){
		this.savemode = true;
		this.editmode = false;
	}
	getVatDetails(){
		this.userService.getRoasterVatDetails(this.roasterId,'mr').subscribe(
			data=>{
				this.mrList=data['result'];
				this.showadddatadiv=true;
				console.log("mr"+this.mrList);
			}
		)
		this.userService.getRoasterVatDetails(this.roasterId,'b2b_ecommerce').subscribe(
			result=>{
				this.b2bEcommerceList=result['result'];
				console.log("b2b"+this.b2bEcommerceList);
			}
		)
	}
}
