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
  styleUrls: ['./vat-management.component.scss']
})
export class VatManagementComponent implements OnInit {
	// tslint:disable: indent
	saveshippingmode: boolean;
	editshippingmode: boolean;
	roasterId: any;
	shippingName: any;
	dayMin: any;
	dayMax: any;
	shippingPrice: any;
	shipId: any;
	shippData: any;
	resetButtonValue = 'Save';
	breadItems: any[];
	options: any;
	selectedTab = {name: 'Vat Management', code: '', index: 0};
	selectedIndex = 0;

	constructor(private router: Router,
		           private toastrService: ToastrService,
		           public vatService: VatserviceService,
		           public userService: UserserviceService,
		           public cookieService: CookieService
		) {
		this.roasterId = this.cookieService.get('roaster_id');
	}

	ngOnInit(): void {
		this.getShippingInfo();
		this.breadItems = [
            { label: 'Home', routerLink: '/features/welcome-aboard' },
            { label: 'Product Settings' },
        ];
		this.options = [
			{name: 'Vat Management', code: '', index: 0},
			{name: 'Shipping Details', code: '', index: 1}
		];
	}
	getShippingInfo(){
		this.userService.getRoasterShippingTypes(this.roasterId).subscribe(
			result => {
				if (result.success){
					this.shippData = result.result;
					this.firstLoadMode();
					if (this.shippData.length !== 0){
						this.shipId = result.result[0].id;
						this.shippingName = result.result[0].name;
						this.dayMin = result.result[0].day_min;
						this.dayMax = result.result[0].day_max;
						this.shippingPrice = result.result[0].price;
					}
				}
			}
		);
	}
	firstLoadMode(){
		if (this.shippData.length !== 0){
			this.editshippingmode = true;
			this.saveshippingmode = false;
		}
		else{
			this.saveshippingmode = true;
			this.editshippingmode = false;
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
		const flag = this.validateInput();
		if (flag){
			if (this.shippData.length === 0){
				this.resetButtonValue = 'Saving';
				const body = {
					name : this.shippingName,
					day_min : Number(this.dayMin),
					day_max : Number(this.dayMax),
					price: Number(this.shippingPrice)
				};
				this.userService.addRoasterShippingDetails(this.roasterId, body).subscribe(
				response => {
					if (response.success){
						this.resetButtonValue = 'Save';
						this.toastrService.success('Shipping  Details saved successfully');
						this.getShippingInfo();
						this.editshippingmode = true;
						this.saveshippingmode = false;
					}
					else{
						this.toastrService.error('Error while saving shipping  details');
						this.resetButtonValue = 'Save';
					}
				}
				);
			}
			else{
				if (this.shipId){
					this.resetButtonValue = 'Saving';
					const data = {
						name : this.shippingName,
						day_min : Number(this.dayMin),
						day_max : Number(this.dayMax),
						price: Number(this.shippingPrice)
					};
					this.userService.updateRoasterShippingTypes(this.roasterId, this.shipId, data).subscribe(
					res => {
						if (res.success){
							this.resetButtonValue = 'Save';
							this.toastrService.success('Shipping Details Updated successfully');
							this.editshippingmode = true;
							this.saveshippingmode = false;
						}
						else{
							this.toastrService.error('Error while updating shipping  details');
							this.resetButtonValue = 'Save';
						}
					}
					);
				}
			}
		}
		else{
			this.toastrService.error('Fields should not be empty.');
			this.resetButtonValue = 'Save';
		}
	}

	editShippingInfo(){
		this.saveshippingmode = true;
		this.editshippingmode = false;
	}
	selectTabs(){

	}
}
