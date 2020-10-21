// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
  estateterm: any;
	estatetermStatus: any;
	estatetermType: any;
	estatetermOrigin: any;
	displayNumbers: any;
	selected: Date[];
	rangeDates: any;
	showOrigin: boolean = true;
  showType:boolean = true;
  showStatus:boolean = true;
  showDisplay:boolean =true;
  customerMob:any;
  showCustomerMob:boolean = true;
  customer_id:any = "";
  searchTerm:any ;
  notify : boolean 
	agreementsActive:any=0;
	@ViewChild(DataTableDirective, {static: false})
	datatableElement: DataTableDirective;
	showDateRange: any;

	@ViewChild('calendar')
  	calendar: any;
	//dtInstance:DataTables.Api;

	// Static Estate Orders Data List
	public data: any;

	public mainData: any[] = [
		{  name: 'The Steam Hotel', origin:'Västerås',date: '19/12/19', orderid:'#129979',file:'The Steam Hotel agreeme…' },
		{  name: 'Gothenburg',origin:'Candela',date: '12/01/20', orderid:'#221669',file:'Candela agreement pap' },
		{  name: 'Finca Nápoles', origin:'Stockholm',date: '02/10/19', orderid:'#879082',file:'Finca Nápoles agreement' },
		{  name: 'Santa Rosa',origin:'Karlstad',date: '10/01/20', orderid:'#127908',file:'Santa Rosa agreement' },
		{  name: 'The Steam Hotel', origin:'Västerås',date: '12/04/20', orderid:'#124160',file:'The Steam Hotel agreeme…' },
		{  name: 'The Steam Hotel',origin:'Västerås',date: '19/09/19', orderid:'#717167',file:'Santa Rosa agreement' },
  ];
	roasterId: string;
	appLanguage: any;
	customer_type: string;
	files: any;
	fileEvent: any;
	fileNameValue: any;
	customerIdError: string;
	fileName: string | Blob;


  constructor(public router: Router,
		public cookieService: CookieService,
		public dashboard: DashboardserviceService,
		public roasterService : RoasterserviceService,
		public toastrService : ToastrService,
		private globals: GlobalsService) {
		this.roasterId = this.cookieService.get('roaster_id');
	}


     ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }
	  this.language();
	//   this.appLanguage = this.globals.languageJson;
		// rowCallback: (row: Node, data: any, index: number) => {
		// 	const self = this;
		// 	$('td', row).click(function(){
		// 		self.router.navigate(["/ordermanagement/select-order"]);
		// 	})
		// }
	  this.customer_type = "hrc";
      this.estatetermStatus = '';
      this.estatetermOrigin = '';
      this.estatetermType = '';
	  this.displayNumbers = '10';
	  this.customerMob = '';
	  this.getAgreements();
  
    }
 	language(){
        this.appLanguage = this.globals.languageJson;
        this.agreementsActive++;
	}
	
	getAgreements(){
		this.roasterService.getAgreements(this.roasterId, this.customer_type).subscribe(
			data => {
				if(data['success']==true){
					// this.mainData = data['result'];
				}
				// else{
				// 	this.toastrService.error("Error while getting the agreement list!");
				// }
			}
		)
	}

    //  Function Name : Check box function.
	//  Description   : This function helps to Check all the rows of the Users list.
	checkAll(ev) {
		this.mainData.forEach(x => (x.state = ev.target.checked));
	}

	//  Function Name : Single Check box function.
	//  Description   : This function helps to Check that single row isChecked.
	isAllChecked() {
		// return this.data.every(_ => _.state);
	}
	setStatus(term: any) {
		this.estatetermStatus = term;
		this.datatableElement.dtInstance.then(table => {
			table.column(9).search(this.estatetermStatus).draw();
		});
	}

	setOrigin(origindata: any) {
		this.estatetermOrigin = origindata;
		this.datatableElement.dtInstance.then(table => {
			table.column(4).search(origindata).draw();
		});
	}
	setType(data: any) {
		this.estatetermType = data;
		this.datatableElement.dtInstance.then(table => {
			table.column(8).search(data).draw();
		});
	}
	setDisplay(data: any) {
		this.displayNumbers = data;
		$("select").val(data).trigger('change');

	}
	setUser(data:any){
		this.customerMob = data;
	}

	toggleOrigin() {
		this.showOrigin = !this.showOrigin;
		if(this.showOrigin==false){
			document.getElementById('origin_id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('origin_id').style.border="1px solid #d6d6d6";
		
		}
	 }
	 toggleType() {
	  this.showType = !this.showType;
	  if(this.showType==false){
		document.getElementById('type_id').style.border="1px solid #30855c";
	}
	else{
		document.getElementById('type_id').style.border="1px solid #d6d6d6";
	
	}
	}
	toggleStatus() {
		this.showStatus = !this.showStatus;
		if(this.showStatus==false){
		  document.getElementById('status_id').style.border="1px solid #30855c";
	  }
	  else{
		  document.getElementById('status_id').style.border="1px solid #d6d6d6";
	  
	  }
	  }
	  toggleDisplay(){
		this.showDisplay = !this.showDisplay;
		if(this.showDisplay==false){
		  document.getElementById('display_id').style.border="1px solid #30855c";
	  }
	  else{
		  document.getElementById('display_id').style.border="1px solid #d6d6d6";
	  
	  }
	  }

	  toggleCustomerMob(){
		this.showCustomerMob = !this.showCustomerMob;
		if(this.showCustomerMob==false){
		  document.getElementById('orgin-mob-id').style.border="1px solid #30855c";
	  }
	  else{
		  document.getElementById('orgin-mob-id').style.border="1px solid #d6d6d6";
	  
	  }
	  }

	  reUploadFile(event:any){
		this.files = event.target.files;
		this.fileEvent = this.files;
		console.log(this.fileEvent);
		this.fileNameValue = this.files[0].name;
	  }
	

	  uploadAgreement(){
		if (
			this.customer_id == "" ||
			this.customer_id == null ||
			this.customer_id == undefined
		  ) {
			this.customerIdError = "Please Select Customer Id";
			document.getElementById("customer_id").style.border =
			  "1px solid #D50000 ";
			setTimeout(() => {
			  this.customerIdError = "";
			}, 3000);
		  } 
		  else{
			let fileList: FileList = this.fileEvent;
			// var parent_id = 0;
			if (fileList.length > 0) {
			  let file: File = fileList[0];
			  let formData: FormData = new FormData();
			  formData.append("file", file, file.name);
			  formData.append('name',this.fileName);
			  formData.append('file_module','Agreements');
			  this.roasterId = this.cookieService.get("roaster_id");
			  formData.append(
				"api_call",
				"/ro/" + this.roasterId + "/file-manager/files"
			  );
			  formData.append("token", this.cookieService.get("Auth"));
			  this.roasterService.uploadFiles(formData).subscribe(
				result =>{
				  if(result['success']==true){
					  
					this.toastrService.success("The file "+this.fileName+" uploaded successfully");
					var data = {
						'customer_id' : this.customer_id,
						'notify_customer' : this.notify,
						'file_id' : result['result']['file_id']
					}
					this.roasterService.uploadAgreements(this.roasterId,this.customer_type,data).subscribe(
						res => {
							if(res['success'] == true){
								this.toastrService.success('The Agreement has been uploaded successfully');
							// this.fileService.getFilesandFolders();
							}
							else{
								this.toastrService.error("Error while uploading Agreegement");
							}
						}
					)
				  }else{
					this.toastrService.error("Error while uploading the file");
				  }
				}
			  )
			}
		  }
	  }

	  deleteAgreement(item : any){
		  this.roasterService.deleteAgreement(this.roasterId, this.customer_type,item.id).subscribe(
			  res => {
				  if(res['success'] == true){
					  this.toastrService.success("The Selected agreement deleted successfully!");
					//   this.getAgreements();
				  }
				  else{
					  this.toastrService.error("Error while deleting the agreement");
				  }
			  }
		  )
	  }
}
