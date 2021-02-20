import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
	addMr = [];

	roasterId: any;
	showpostdiv = true;
	resetButtonValue = 'Save';
	eachId: any;
	mrList: any;
	editmode = true;
	savemode = false;
	editIndex = null;
	transaction: FormGroup;

	@Input() mobile = false;

  constructor(
	private router: Router,
	private toastrService: ToastrService,
	public cookieService: CookieService,
	public roasteryProfileService: RoasteryProfileService,
	public userService: UserserviceService,
	private fb: FormBuilder
    ) {
		this.roasterId = this.cookieService.get('roaster_id');
		this.getVatDetails();
	}

	ngOnInit(): void {
		this.transaction = this.fb.group({
			country: ['', Validators.compose([Validators.required])],
			transaction_type: [null, Validators.compose([Validators.required])],
			vat_percentage: [null, Validators.compose([Validators.required])],
			vat_type: ['mr']
		});
	}
	getVatDetails(){
		this.userService.getRoasterVatDetails(this.roasterId, 'mr').subscribe(
			data => {
				this.mrList = data.result;
			}
		);
	}
	public addNewTranscation(){

		if (this.mobile){
			if (!this.editIndex){
				this.editIndex = this.mrList.length;
				this.mrList.push({
					country: '',
					transaction_type: '',
					vat_percentage: '',
				});
				this.transaction = this.fb.group({
					country: ['', Validators.compose([Validators.required])],
					transaction_type: [null, Validators.compose([Validators.required])],
					vat_percentage: [null, Validators.compose([Validators.required])],
					vat_type: ['mr']
				});
			} else {
				this.toastrService.error('Please save the unsaved changes.');
			}
		} else {
			this.addMr.push({
			country : '',
			transaction_type : '',
			vat_percentage: ''
			});
			this.editmode = true;
			this.savemode = true;
		}
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
	public deleteRow(index){
		if (this.mobile){
			this.mrList.splice(index, 1);
			this.editIndex = null;
		} else {
			this.addMr.splice(index, 1);
		}
	}
	cancelItem(item, index){
		if (item.id){
			this.editIndex = null;
		} else {
			this.deleteRow(index);
		}
	}

	getCountryName(code: any){
		const country = this.roasteryProfileService.countryList.find(con => con.isoCode === code);
		return country ? country.name : '';
	}
	changeCountry() {
		this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
	}
	saveMrVat(){
		let flag = true;
		const input = this.addMr;
		flag = this.validateInput(input);
		if (flag){
			this.resetButtonValue = 'Saving';
			this.addMr.forEach(element => {
				const body = {
					country : element.country,
					transaction_type : element.transaction_type,
					vat_percentage : element.vat_percentage,
					vat_type: 'mr'
				};
				this.addNewVatItem(body);
		    });
		}
		else {
			this.resetButtonValue = 'Save';
			this.toastrService.error('Fields should not be empty.');
		  }
	}
	addNewVatItem(body){
		this.userService.addVatDetails(this.roasterId, body).subscribe(
			result => {
				if (result.success){
					this.resetButtonValue = 'Save';
					this.toastrService.success('Micro roaster VAT Details added successfully');
					this.getVatDetails();
					this.editIndex = null;
					this.addMr = [];
					this.editmode = true;
					this.savemode = false;
				}
				else{
					this.toastrService.error('Error while adding VAT details');
					this. resetButtonValue = 'Save';
				}
			}
			);
	}
	updateEachVat(vatItem: any, index = null){
		this.eachId = vatItem.id;
		if (this.mobile){
			if (this.editIndex === null){
				this.editIndex = index;
				this.transaction = this.fb.group({
					country: [vatItem.country.toUpperCase(), Validators.compose([Validators.required])],
					transaction_type: [vatItem.transaction_type, Validators.compose([Validators.required])],
					vat_percentage: [vatItem.vat_percentage, Validators.compose([Validators.required])],
					vat_type: ['mr']
				});
			} else {
				this.toastrService.error('Please save the unsaved changes.');
			}
		} else {
			this.updateVatmode = false;
			this.editTableRow = true;
			vatItem.country = vatItem.country.toUpperCase();
		}
	}

	saveEachMrVat(vatId: any, data = null, tab = false){
		let updateData = {
			country : data.country,
			transaction_type : data.transaction_type,
			vat_percentage : data.vat_percentage,
			vat_type: 'mr'
		};
		if (this.mobile){
			if (vatId){
				updateData = tab ? updateData : data;
			} else {
				updateData = tab ? updateData : data;
				this.addNewVatItem(updateData);
				return;
			}
		}
		this.userService.updateMrVat(this.roasterId, updateData, vatId).subscribe(
			result => {
				if (result.success){
					this.toastrService.success('Micro roaster VAT Details updated successfully');
					this.getVatDetails();
					this.editIndex = null;
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
						this.getVatDetails();
					}, 1000);
					this.editIndex = null;
					this.editmode = true;
				}
				else{
					this.toastrService.error('Error while deleting VAT details');
				}
			}
		);
	}
	get detailsFormControl() {
		return this.transaction.controls;
	}
}
