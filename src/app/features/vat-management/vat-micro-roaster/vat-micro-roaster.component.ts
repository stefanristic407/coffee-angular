import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VatserviceService } from '../vatservice.service';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vat-micro-roaster',
  templateUrl: './vat-micro-roaster.component.html',
  styleUrls: ['./vat-micro-roaster.component.scss']
})
export class VatMicroRoasterComponent implements OnInit {
	// tslint:disable: indent
	// tslint:disable: variable-name
	country: any = '';
	transaction_type: any;
	vat_percentage: any;
	mraddtranscation = false;
	mradd = true;
	editTableRow = false;
	updateVatmode = false;
	addMr = [
		{
			country : '',
			transaction_type : '',
			vat_percentage: ''
		}
	];

	roasterId: any;
	showpostdiv = true;
	resetButtonValue = 'Save';
	eachCountry: any;
	eachtransaction_type: any;
	eachvat_percentage: any;
	eachId: any;

  constructor(private router: Router,
	             private toastrService: ToastrService,
	             public cookieService: CookieService,
              public vatService: VatserviceService,
	             public roasteryProfileService: RoasteryProfileService,
	             public userService: UserserviceService
    ) {
		this.roasterId = this.cookieService.get('roaster_id');
		this.vatService.getVatDetails();
	}

	ngOnInit(): void {
		// this.vatService.showadddatadiv = false;
	}
	public addNewTranscation(){

		this.addMr.push({
			country : '',
			transaction_type : '',
			vat_percentage: ''
		});
		this.vatService.editmode = true;
		this.vatService.savemode = true;
	}
	private validateInput(data){
		let flag = true;
		if (data && data.length){
		  data.forEach( ele => {
			if (ele.country === '' || ele.transaction_type === '' || ele.vat_percentage === '' ){
			  flag = false;
			}
		  });
		}
		return flag;
	}
	public deleteRow( index){
		this.addMr.splice(index, 1);
	}

	getCountryName(code: any){
		const country = this.roasteryProfileService.countryList.find(con => con.isoCode === code);
		return country ? country.name : '';
	}
	changeCountry() {
		this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
	}
	onKeyPress(event: any) {
		if (event.target.value === '') {
		document.getElementById(event.target.id).style.border = '1px solid #D50000';
		} else {
		document.getElementById(event.target.id).style.border = '1px solid #d6d6d6';
		}
	}
	saveMrVat(){
		let flag = true;
		const input = this.addMr;
	 console.log(input);
		flag = this.validateInput(input);
		console.log('flag' + flag);
		if (flag){
			this.resetButtonValue = 'Saving';
			this.addMr.forEach(element => {

			const body = {
			country : element.country,
			transaction_type : element.transaction_type,
			vat_percentage : element.vat_percentage,
			vat_type: 'mr'
			};
			this.userService.addVatDetails(this.roasterId, body).subscribe(
			result => {
				if (result.success){
					this.resetButtonValue = 'Save';
					this.toastrService.success('Micro roaster VAT Details added successfully');
					this.vatService.getVatDetails();
					this.addMr = [];

					this.vatService.editmode = true;
					this.vatService.savemode = false;
				}
				else{
					this.toastrService.error('Error while adding VAT details');
					this. resetButtonValue = 'Save';
				}
			}
			);
		});
		}
		else {
			this.resetButtonValue = 'Save';
			this.toastrService.error('Fields should not be empty.');
		  }
	}
	updateEachVat(vatItem: any){
		this.updateVatmode = false;
		this.editTableRow = true;
		this.eachCountry = vatItem.country;
		this.eachtransaction_type = vatItem.transaction_type;
		this.eachvat_percentage = vatItem.vat_percentage;
		this.eachId = vatItem.id;
	}

	saveEachMrVat(val: any){
		const updateData = {
			country : this.eachCountry,
			transaction_type : this.eachtransaction_type,
			vat_percentage : this.eachvat_percentage,
			vat_type: 'mr'
		};
		this.userService.updateMrVat(this.roasterId, updateData, val).subscribe(
			result => {
				if (result.success){
					this.toastrService.success('Micro roaster VAT Details updated successfully');
					this.vatService.getVatDetails();
					this.updateVatmode = true;
					this.editTableRow = false;
				}
				else{
					this.toastrService.error('Error while adding VAT details');
				}
			}
		);
	}
	deleteEachVat(deleteId: any){
		this.userService.deleteMrVat(this.roasterId, deleteId).subscribe(
			result => {
				if (result.success){
					this.toastrService.success('Micro roaster VAT deleted successfully');
					setTimeout(() => {
						this.vatService.getVatDetails();
					}, 2000);
					this.vatService.editmode = true;
				}
				else{
					this.toastrService.error('Error while deleting VAT details');
				}
			}
		);
	}
}
