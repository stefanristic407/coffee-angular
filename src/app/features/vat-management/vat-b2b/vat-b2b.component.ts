import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VatserviceService } from '../vatservice.service';
import { RoasteryProfileService } from '../../roastery-profile/roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-vat-b2b',
  templateUrl: './vat-b2b.component.html',
  styleUrls: ['./vat-b2b.component.css']
})
export class VatB2bComponent implements OnInit {
	country:any='';
	transaction_type:any;
	vat_percentage:any;
	mraddtranscation:boolean = false;
	mradd : boolean =true;
	editTableRow :boolean =false;
	updateVatmode:boolean =false;
	addEcommerce = [
		{
			country : '',
			transaction_type : '',
			vat_percentage: ''
		}
	]
	
	roasterId: any;
	showpostdiv:boolean=true;
	resetButtonValue: string ='Save';
	eachCountry: any;
	eachTransactionType: any;
	eachVatPercentage: any;
	eachId: any;

  constructor(private router : Router, 
	private toastrService: ToastrService,
	public cookieService : CookieService,
    public vatService:VatserviceService,
	public roasteryProfileService : RoasteryProfileService,
	public userService : UserserviceService
    ) { 
		this.roasterId = this.cookieService.get('roaster_id');
	}

	ngOnInit(): void {
		// this.vatService.showadddatadiv = false;
		this.vatService.getB2bDetails();
	}
	public addNewB2bTranscation(){
		this.addEcommerce.push({ 
			country : '',
			transaction_type : '',
			vat_percentage: ''
		});
		this.vatService.editB2Bmode= true;
		this.vatService.saveB2Bmode =true;
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
	public deleteB2BRow( index){
		this.addEcommerce.splice(index, 1);
	}

	getCountryName(code : any){
		return this.roasteryProfileService.countryList.find(con => con.isoCode == code).name;	
	}
	changeCountry() {
		// console.log("the selected country is : " + this.country);
		this.roasteryProfileService.changeCountry(this.roasteryProfileService.country);
	}
	onKeyPress(event: any) {
		if (event.target.value == "") {
		document.getElementById(event.target.id).style.border = "1px solid #D50000";
		} else {
		document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
		}
	}
	saveB2BVat(){
		let flag = true;
		var input = this.addEcommerce;
	  	console.log(input);
		flag = this.validateInput(input);
		console.log("flag"+ flag);
		if (flag){
			this.resetButtonValue = "Saving";
			this.addEcommerce.forEach(element => {

			var body = {
			"country" : element.country,
			"transaction_type" : element.transaction_type,
			"vat_percentage" : element.vat_percentage,
			"vat_type": "b2b_ecommerce"
			}
			this.userService.addVatDetails(this.roasterId,body).subscribe(
			result=>{
				if(result['success']==true){
					this.resetButtonValue = "Save"
					this.toastrService.success("B2B VAT Details added successfully");
					this.vatService.getB2bDetails();
					this.addEcommerce=[];
					
					this.vatService.editB2Bmode= true;
					this.vatService.saveB2Bmode =false;
				}
				else{
					this.toastrService.error("Error while adding VAT details");
					this. resetButtonValue = "Save"
				}
			}
			)
		});
		}
		else {
			this.resetButtonValue = "Save";
			this.toastrService.error('Fields should not be empty.');
		  }
	}
	updateEachB2bVat(vatItem:any){
		this.updateVatmode=false;
		this.editTableRow=true;
		this.eachCountry=vatItem.country;
		this.eachTransactionType=vatItem.transaction_type;
		this.eachVatPercentage=vatItem.vat_percentage;
		this.eachId=vatItem.id;
	}

	saveEachB2bVat(val:any){
		var updateData = {
			"country" : this.eachCountry,
			"transaction_type" : this.eachTransactionType,
			"vat_percentage" : this.eachVatPercentage,
			"vat_type": "b2b_ecommerce"
		}
		this.userService.updateMrVat(this.roasterId,updateData,val).subscribe(
			result=>{
				if(result['success']==true){
					this.toastrService.success("B2B VAT Details updated successfully");
					this.vatService.getB2bDetails();
					this.updateVatmode=true;
					this.editTableRow=false;
				}
				else{
					this.toastrService.error("Error while adding VAT details");
				}
			}
		);			
	}
	deleteEachB2bVat(deleteId:any){
		this.userService.deleteMrVat(this.roasterId,deleteId).subscribe(
			result=>{
				if(result['success']==true){
					this.toastrService.success("B2B VAT deleted successfully");
					setTimeout(()=>{
						this.vatService.getB2bDetails();
					},2000)
					this.vatService.editB2Bmode=true;
				}
				else{
					this.toastrService.error("Error while deleting VAT details");
				}
			}
		);			
	}
}
