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
  styleUrls: ['./vat-micro-roaster.component.css']
})
export class VatMicroRoasterComponent implements OnInit {
	country:any='';
	transaction_type:any;
	vat_percentage:any;
	mraddtranscation:boolean = false;
	mradd : boolean =true;
	editTableRow :boolean =false;
	updateVatmode:boolean =false;
	addMr = [
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
		this.vatService.getVatDetails();
	}
	public addNewTranscation(){
		
		this.addMr.push({ 
			country : '',
			transaction_type : '',
			vat_percentage: ''
		});
		this.vatService.editmode= true;
		this.vatService.savemode =true;
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
	saveMrVat(){
		let flag = true;
		var input = this.addMr;
	  	console.log(input);
		flag = this.validateInput(input);
		console.log("flag"+ flag);
		if (flag){
			this.resetButtonValue = "Saving";
			this.addMr.forEach(element => {

			var body = {
			"country" : element.country,
			"transaction_type" : element.transaction_type,
			"vat_percentage" : element.vat_percentage,
			"vat_type": "mr"
			}
			this.userService.addVatDetails(this.roasterId,body).subscribe(
			result=>{
				if(result['success']==true){
					this.resetButtonValue = "Save"
					this.toastrService.success("Micro roaster VAT Details added successfully");
					this.vatService.getVatDetails();
					this.addMr=[];
					
					this.vatService.editmode= true;
					this.vatService.savemode =false;
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
	updateEachVat(vatItem:any){
		this.updateVatmode=false;
		this.editTableRow=true;
		this.eachCountry=vatItem.country;
		this.eachTransactionType=vatItem.transaction_type;
		this.eachVatPercentage=vatItem.vat_percentage;
		this.eachId=vatItem.id;
	}

	saveEachMrVat(val:any){
		var updateData = {
			"country" : this.eachCountry,
			"transaction_type" : this.eachTransactionType,
			"vat_percentage" : this.eachVatPercentage,
			"vat_type": "mr"
		}
		this.userService.updateMrVat(this.roasterId,updateData,val).subscribe(
			result=>{
				if(result['success']==true){
					this.toastrService.success("Micro roaster VAT Details updated successfully");
					this.vatService.getVatDetails();
					this.updateVatmode=true;
					this.editTableRow=false;
				}
				else{
					this.toastrService.error("Error while adding VAT details");
				}
			}
		);			
	}
	deleteEachVat(deleteId:any){
		this.userService.deleteMrVat(this.roasterId,deleteId).subscribe(
			result=>{
				if(result['success']==true){
					this.toastrService.success("Micro roaster VAT deleted successfully");
					setTimeout(()=>{
						this.vatService.getVatDetails();
					},2000)
					this.vatService.editmode=true;
				}
				else{
					this.toastrService.error("Error while deleting VAT details");
				}
			}
		);			
	}
}
