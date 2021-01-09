import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from '../roastery-profile/roastery-profile.service';
import { SourcingService } from '../Sourcing/sourcing.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
	selector: 'app-confirm-preorder-lot',
	templateUrl: './confirm-preorder-lot.component.html',
	styleUrls: ['./confirm-preorder-lot.component.css']
})
export class ConfirmPreorderLotComponent implements OnInit {

	quantity: any;
	quantity1: any;
	price: number = 0;
	confirmOrderError: any;
	modalRef: BsModalRef;
	appLanguage?: any;
	country: any = "";
	state: any;
	address1: string;
	address2: string;
	zipcode: string;
	city: string;
	countryError: string;
	addressError: string;
	zipError: string;
	cityError: string;
	service: string = "Import & Delivery service";
	serviceAmount: number = 0;
	available_bags: number;
	terms: boolean = false;
	termError: string;
	availableConfirmActive: any = 0;
	gc_id: any;
	roaster_id: string;
	shippingAddress_id: any;
	billingAddress_id: any;
	estate_id: any;
	addressArray: any;
	ship_unit_price: any;
	min_quantity: any;
	flagData: any;
	addressId: any;
	countryData: any;
	countryName: any;
	lotData: any;
	EstateData: any;
	lotDetails: any;
	countryValue: any;
	estate_name: any;
	estate_country: any;
	estate_species: any;
	estate_varieties: any;
	estate_grade_range: any;
	total_production: any;
	batchList: any;
	batchId: any;

	constructor(private modalService: BsModalService,
		public router: Router,
		public globals: GlobalsService,
		private route: ActivatedRoute,
		public sourcing: SourcingService,
		private cookieService: CookieService,
		private toastrService: ToastrService,
		private roasterService: RoasterserviceService,
		private userService: UserserviceService,
		public profileservice: RoasteryProfileService

	) {
		this.roaster_id = this.cookieService.get('roaster_id');

		this.route.queryParams.subscribe(params => {
			this.lotData = params['lotId'];
			this.EstateData = params['estateId'];
			this.getRoAddress();
			console.log(this.lotData, this.EstateData);

		});
	}
	@ViewChild('confirmtemplate') private confirmtemplate: any;

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);

	}
	ngOnInit(): void {
		this.quantity = "";
		this.quantity1 = "";
		this.confirmOrderError = "";
		this.countryError = "";
		this.addressError = "";
		this.zipError = "";
		this.cityError = "";
		this.termError = "";
		// this.price="$450";
		this.language();
		this.getLotDetails();
		this.getPrebookBatch();
	}
	language() {
		this.appLanguage = this.globals.languageJson;
		this.availableConfirmActive++;
	}

	placeOrder() {
		if (this.terms == false) {
			this.termError = "Please accept the terms and conditions";
			setTimeout(() => {
				this.termError = "";
			}, 3000);
		}
		else {
			this.openModal(this.confirmtemplate);
		}
	}
	placeOrderMob() {
		this.openModal(this.confirmtemplate);
	}
	editAddress() {
		document.getElementById("edit-shipping").style.display = "none";
		document.getElementById("form-address").style.display = "block";

	}
	saveAddress() {
		if (this.country == "" || this.country == null || this.country == undefined) {
			this.countryError = "Please select your country";
			document.getElementById('countryList').style.border = "1px solid #D50000 ";
			setTimeout(() => {
				this.countryError = "";
				document.getElementById('countryList').style.border = "1px solid #d6d6d6 ";
			}, 3000);
		}
		else if (this.address1 == "" || this.address1 == null || this.address1 == undefined) {
			this.addressError = "Please enter address";
			document.getElementById('address1').style.border = "1px solid #D50000 ";
			setTimeout(() => {
				this.addressError = "";
				document.getElementById('address1').style.border = "1px solid #d6d6d6 ";
			}, 3000);
		}
		else if (this.city == "" || this.city == null || this.city == undefined) {
			this.cityError = "Please enter city";
			document.getElementById('city').style.border = "1px solid #D50000 ";
			setTimeout(() => {
				this.cityError = "";
				document.getElementById('city').style.border = "1px solid #d6d6d6 ";
			}, 3000);
		}
		else if (this.zipcode == "" || this.zipcode == null || this.zipcode == undefined) {
			this.zipError = "Please enter zipcode";
			document.getElementById('zipcode').style.border = "1px solid #D50000 ";
			setTimeout(() => {
				this.zipError = "";
				document.getElementById('zipcode').style.border = "1px solid #d6d6d6 ";
			}, 3000);
		}
		else {
			console.log(this.addressId);
			if (this.addressId) {
				var addressData = {
					"type": "shipping",
					"address_line1": this.address1,
					"address_line2": this.address2,
					"city": this.city,
					"state": this.state,
					"country": this.country,
					"zipcode": this.zipcode
				}
				this.userService.editAddress(this.roaster_id, this.addressId, addressData).subscribe(
					response => {
						if (response['success'] == true) {
							this.toastrService.success("Address has been Edited");
							this.getRoAddress();
						}
						else {
							this.toastrService.error("Error while Editing the address")
						}
					}
				)
			}
			else {
				var data = {
					"type": "shipping",
					"address_line1": this.address1,
					"address_line2": this.address2,
					"city": this.city,
					"state": this.state,
					"country": this.country,
					"zipcode": this.zipcode
				}
				this.userService.addAddresses(this.roaster_id, data).subscribe(
					response => {
						if (response['success'] == true) {
							this.shippingAddress_id = response['result'].id;
							this.toastrService.success("Address has been added")
						}
						else {
							this.toastrService.error("Error while adding the address")
						}
					}
				)
			}
			document.getElementById("edit-shipping").style.display = "block";
			document.getElementById("form-address").style.display = "none";
		}
	}

	//  Function Name :Country Selection .
	// Description: To select a country.

	changeCountry() {
		// console.log("the selected country is : " + this.country);
		this.profileservice.changeCountry(this.country);
	}
	onKeyPress(event: any) {
		if (event.target.value == "") {
			document.getElementById(event.target.id).style.border = "1px solid #D50000";
		} else {
			document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
		}
	}


	done() {

		var data = {

			"shipping_address_id": parseInt(this.addressId),
			"billing_address_id": parseInt(this.addressId),

		}
		if (this.batchId) {
			this.userService.addPrebookLots(this.roaster_id, this.batchId, data).subscribe(
				data => {
					if (data['success'] == true) {
						this.toastrService.success("Prebook Order has been placed Successfully");

						this.router.navigate(["/features/order-placed"]);
					}
					else {
						this.toastrService.error("Error while Placing the prebook order");

					}
				}
			)
		}
	}

	getRoAddress() {
		this.userService.getAddresses(this.roaster_id).subscribe(
			response => {
				this.addressArray = response['result'][0];
				console.log(this.addressArray);
				this.addressId = this.addressArray.id;
				this.address1 = this.addressArray.address_line1;
				this.address2 = this.addressArray.address_line2;
				this.city = this.addressArray.city;
				this.state = this.addressArray.state;
				this.country = this.addressArray.country;
				this.countryData = this.profileservice.countryList.find(con => con.isoCode == this.addressArray.country.toUpperCase());
				this.countryName = this.countryData ? this.countryData.name : '';
				this.zipcode = this.addressArray.zipcode;
			}
		)
	}

	getLotDetails() {
		this.userService.getAvailableEstateList(this.roaster_id, this.EstateData).subscribe(
			res => {
				if (res['success'] == true) {
					this.lotDetails = res['result'];
					this.estate_name = this.lotDetails.name;
					this.estate_country = this.lotDetails.country;
					this.estate_species = this.lotDetails.species;
					this.estate_varieties = this.lotDetails.varieties;
					this.estate_grade_range = this.lotDetails.grade_range;
					this.total_production = this.lotDetails.total_production;


				}
			}
		)
	}
	GetCountry(data: any) {
		// console.log(data.toUpperCase());
		if (data) {
			this.countryValue = this.profileservice.countryList.find(con => con.isoCode == data.toUpperCase());
			if (this.countryValue)
				return this.countryValue.name;
		}
	}

	getPrebookBatch() {
		this.userService.getPrebookBatchList(this.roaster_id, this.EstateData, this.lotData).subscribe(
			res => {
				if (res['success'] == true) {
					this.batchList = res['result'][1];
					this.batchId = this.batchList['id'];
				}
			}
		)
	}

}
