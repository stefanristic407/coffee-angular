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
  
     
      this.appLanguage = this.globals.languageJson;

		// rowCallback: (row: Node, data: any, index: number) => {
		// 	const self = this;
		// 	$('td', row).click(function(){
		// 		self.router.navigate(["/ordermanagement/select-order"]);
		// 	})
		// }
	
      this.estatetermStatus = '';
      this.estatetermOrigin = '';
      this.estatetermType = '';
	  this.displayNumbers = '10';
	  this.customerMob = '';
	  
	  this.getAgreements();
  
    }

	getAgreements(){
		this.roasterService.getAgreements(this.roasterId).subscribe(
			data => {
				if(data['success']==true){
					// this.mainData = data['result'];
				}else{
					this.toastrService.error("Error while getting the agreement list!");
				}
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

}
