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
	// tslint:disable: indent
	roasterId: string;
	savemode = true;
	editmode = false;

	saveB2Bmode = true;
	editB2Bmode = false;

	mrList: any;
	b2bEcommerceList: any;
	mrCountry: any = '';
	ecommerceCountry: any = '';
	public showadddatadiv = false;

  constructor(public userService: UserserviceService,
              public cookieService: CookieService,
              public roasterService: RoasterserviceService,
              public toastrService: ToastrService,
              public router: Router) {
	  this.roasterId = this.cookieService.get('roaster_id');
	  this.getVatDetails();
	 }
	getVatDetails(){
		this.userService.getRoasterVatDetails(this.roasterId, 'mr').subscribe(
			data => {
				this.mrList = data.result;
				this.firstMrLoadMode();
				// this.showadddatadiv=true;
				console.log('mr'+ this.mrList);
			}
		);
	}
	getB2bDetails(){
		this.userService.getRoasterVatDetails(this.roasterId, 'b2b_ecommerce').subscribe(
			result => {
				this.b2bEcommerceList = result.result;
				this.firstB2BLoadMode();
				console.log('b2b'+ this.b2bEcommerceList);
			}
		);
	}
	firstMrLoadMode(){
		if (this.mrList.length){
			this.editmode = true;
			this.savemode = false;
		}
		else{
			this.editmode = false;
			this.savemode = true;
		}
	}
	firstB2BLoadMode(){
		if (this.b2bEcommerceList.length != 0){
			this.editB2Bmode = true;
			this.saveB2Bmode = false;
		}
		else{
			this.editB2Bmode = false;
			this.saveB2Bmode = true;
		}
	}
}
