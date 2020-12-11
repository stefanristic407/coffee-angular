import { Component, OnInit, ViewChild } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {GlobalsService} from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
  selector: 'sewn-about-roastery',
  templateUrl: './about-roastery.component.html',
  styleUrls: ['./about-roastery.component.css']
})
export class AboutRoasteryComponent implements OnInit {

  owner_name : string;
  founded_in : any;
  summary : string;
  kgs:any = '';
  capacity:string;
  capabilities : string;
  male_num : string;
  female_num : string;
  employee_avg : any;
  employee_nos : any;
  brand_name : string;
  short_descr : string;
  // emp_title : string;
  emp_name : string = ''
  appLanguage?: any;

  ownerNameError : string;
  foundedInError : string;
  employeeNoError : string;
  employeeAvgError : string;
  femaleNumError : string;
  maleNumError : string;
  capacityError : string;
  kilogramsError : string;
  capabilitiesError : string;
  brandNameError : string;
  brandLogoError : string;
  shortDescError : string;
  vatNoError :string;
  cmpyRidError :string;
  // empTitleError : string;
  empNameError : string;
  roasterId: any;
  certificatesArray : any = [];
  userId: any;

  single: any[];
 view: any[] = [300, 200];
 aboutActive:any =0;

 // options
 gradient: boolean = true;
 showLegend: boolean = false;
 showLabels: boolean = false;
 isDoughnut: boolean = false;
 legendPosition: string = 'below';

 colorScheme = {
   domain: ['#747588','#f8f8f8']
 };
 contacts = [
  {
    contactid : ''
  }
]

brandProfile = [
  {
    name : '',
    logo : '',
    short_descr : ""
  }
]
brand = {
  name: '',
  description: ''
}

addBtn : boolean = true;
assignRow : boolean = false;
// showDelete : boolean = false;
assignButtonValue : string = "Add Contact";
  brands: any;
  @ViewChild("roasterImage") roasterImage;

  	constructor(public roasteryProfileService : RoasteryProfileService,
		public userService : UserserviceService,
		private cookieService : CookieService,
		private toastrService : ToastrService,
		public globals: GlobalsService,
		public roasterService : RoasterserviceService) { 
		this.roasterId = this.cookieService.get('roaster_id');
		this.userId = this.cookieService.get('user_id');
	}

  ngOnInit(): void {
    this.getCertificates();
    this.roasteryProfileService.getcontactList();
    this.getBrands();
    this.language();
  }
  language(){
	  this.appLanguage = this.globals.languageJson;
   	this.aboutActive++;
  }

  addNewBrand(file,brand){
    const data: FormData = new FormData();
    data.append('name',brand.name);
    data.append('description',brand.short_descr);
    data.append('file',file);
    data.append('api_call',`/ro/${this.roasterId}/brands`);
    data.append('token',this.cookieService.get('Auth'));
    this.roasterService.addRoasterBrand(data).subscribe( res => {
      this.getBrands();
    });
  }
  getBrands(){
    this.roasterService.getRoasterBrands(this.roasterId).subscribe( res => {
      this.brands = res.success ? res.result: [];
    });
  }
  handleRoasterFile(e,brand) {
    if(!brand.name || !brand.short_descr){
      this.toastrService.error('Please add brand details');
      e.target.file = '';
      return;
    }
    if (e.target.files.length > 0) {
			for (let i = 0; i <= e.target.files.length - 1; i++) {
				const fsize = e.target.files.item(i).size;
				const file = Math.round((fsize / 1024));
				// The size of the file.
        if (file >= 2048) {
          this.toastrService.error("File too big, please select a file smaller than 2mb");
        }else{
          console.log('Coming here');
          this.addNewBrand(e.target.files[0],brand);
        }
      }
    }
  }
	getCertificates(){
		if(this.globals.checkItem('certificate-list') || this.globals.checkItem('certificate-management')){
	this.userService.getCompanyCertificates(this.roasterId).subscribe(
		result => {
			if(result['success'] == true){
			this.certificatesArray = result['result'];
			// this.aboutActive++;
			}else{
			this.toastrService.error("Error in loading Roaster Certificates");
			}
			// this.aboutActive++;
		});
	}
	}

  
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  
}

editCertificate(event , certificates : any){
console.log("button clicked" , certificates.name);
}
deleteCertificate(certificateId : any){
  if (confirm("Please confirm! you want to delete?") == true){
  this.userService.deleteCompanyCertificate(this.roasterId,certificateId).subscribe(
    response => {
      if(response['success']==true){
        this.toastrService.success("The selected Certificate has been successfully deleted");
        this.getCertificates();
      }
      else{
        this.toastrService.error("Something went wrong while deleting the certificate")
      }
    }
  )
  }
}

onSelect(data): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}
addContact(){
	var  contactData = {
		user_id : parseInt(this.roasteryProfileService.emp_name)
	  }
		this.assignButtonValue = "Adding"
		this.roasterService
		  .addRoasterContacts(this.roasterId,contactData)
		  .subscribe((result) => {
			if (result["success"] == true) {
			  this.assignButtonValue = "Add Contact"
			  this.toastrService.success("Contact has been added.");
			  this.roasteryProfileService.getcontactList();
			  this.roasteryProfileService.emp_name = "";
			  this.assignRow = false;
			  this.addBtn = true;
			  this.roasteryProfileService.showDelete = true;
			} else {
			  this.assignButtonValue = "Add Contact"
			  this.toastrService.error("Error while assigning the role");
			}
		  });

}

showContact(){
    this.addBtn = false;
    this.assignRow = true;
    // this.showDelete = true;
  }
  cancelAssign(){
    this.addBtn = true;
    this.assignRow = false;
  }
  removeContact(contactId : any){
    this.roasterService.deleteRoasterContacts(this.roasterId,contactId).subscribe(
      data => {
        if(data['success'] == true ){
          this.toastrService.success("The selected contact has been removed successfully");
          this.roasteryProfileService.getcontactList();
        }
        else{
			this.toastrService.error("Error while deleting the contact");
        }
      }
    )
  }

  public addBrandProfile(){
    this.brandProfile.push({ 
    name : '',
    logo : '',
    short_descr : ""

    });
}

public deleteRow( index){
    this.brandProfile.splice(index, 1);
  }

}
