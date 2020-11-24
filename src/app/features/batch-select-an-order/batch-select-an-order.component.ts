import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';

import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-batch-select-an-order',
  templateUrl: './batch-select-an-order.component.html',
  styleUrls: ['./batch-select-an-order.component.css']
})
export class BatchSelectAnOrderComponent implements OnInit {

  roasterId: string;
  /* table  */
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


  @ViewChild(DataTableDirective, {static: false})
	datatableElement: DataTableDirective;
	showDateRange: any;

	@ViewChild('calendar')
  	calendar: any;
	//dtInstance:DataTables.Api;

	// Static Estate Orders Data List
	public data: any;
	public mainData: any[];
	title = 'angulardatatables';
	dtOptions: DataTables.Settings = {
		language: { "search": '' }
  };
  
  constructor(public router: Router,	
    public cookieService: CookieService,
    private roasterService: RoasterserviceService,
    public dashboard: DashboardserviceService,
		private toastrService: ToastrService,) {

      this.roasterId = this.cookieService.get('roaster_id');
      /* table */
      this.data = {};
			this.data = 
				[
        { orderid: '81671', estatename: 'Finca La Pampa', dataordered: '24 Jan 2020', origin: 'Colombia',variety:'Bourbon', quantity: '-', cuppingscore:'84.5' },
        { orderid: '56076', estatename: 'Gesha', dataordered: '21 Jan 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '297kg', cuppingscore:'88' },
        { orderid: '46930', estatename: 'Finca La Toboba', dataordered: '22 Apr 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '29kg', cuppingscore:'81.5' },
        { orderid: '9019', estatename: 'Asoproaaa', dataordered: '24 Apr 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '-', cuppingscore:'84.5' }
			];
			this.mainData = this.data;

     }
  

    ngOnInit(): void {
		//Auth checking
    if (this.cookieService.get("Auth") == "") {
			this.router.navigate(["/auth/login"]);
		}

		this.dtOptions = {
			//ajax: this.data,
			data: this.data,
			pagingType: 'full_numbers',
			pageLength: 10,
			lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
			processing: true,
			language: { search: "" },
			columns:[
				{title: '' , 
				 className: "select-checkbox", 
				defaultContent:'<input type="radio" name="optradio" class="radio-box">'},
				{
					title: 'Order ID',
					data: 'orderid'
				}, {
					title: 'Estate name',
					data: 'estatename'
				}, {
					title: 'Date ordered',
					data: 'dataordered'
				},
				{
					title: 'Origin',
					data: 'origin',
					
				}, 
				{
					title: 'Variety',
					data: 'variety',
					
				}, 
				{
					title: 'Quantity',
					data: 'quantity'
				},
				{
					title: "Cupping score",
					data: "cuppingscore",
				}
			],
		
			
		};
		this.estatetermStatus = '';
		this.estatetermOrigin = '';
		this.estatetermType = '';
		this.displayNumbers = '10';
		$(document).ready(function () {
			$(".dataTables_length").ready(function () {
				$(".dataTables_length").hide()
				$(".dataTables_info").hide();
				$('#DataTables_Table_0_processing').hide();
			});
		});
  }
  

  //  Function Name : Check box function.
	//  Description   : This function helps to Check all the rows of the Users list.
	checkAllEstate(ev) {
		this.data.forEach(x => (x.state = ev.target.checked));
	}

	//  Function Name : Single Check box function.
	//  Description   : This function helps to Check that single row isChecked.
	isAllCheckedEstate() {
		return this.data.every(_ => _.state);
	}


	setOrigin(origindata: any) {
		this.estatetermOrigin = origindata;
		this.datatableElement.dtInstance.then(table => {
			table.column(4).search(origindata).draw();
		});
	}

	setDisplay(data: any) {
		this.displayNumbers = data;
		$("select").val(data).trigger('change');

	}

	openCalendar(event: any){
		this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
  		event.stopPropagation();
	}

	filterDate(event: any){
		if(this.rangeDates[0] != null && this.rangeDates[1] != null){
			var months = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var fDate = new Date(this.rangeDates[0]);
			var fromDate = JSON.stringify(fDate);
			fromDate = fromDate.slice(1,11);
			var fSplit = fromDate.split("-");
			
			var fDateString = fSplit[2] + " " + months[parseInt(fSplit[1])-1] + " " + fSplit[0];
			var tDate = new Date(this.rangeDates[1]);
			var toDate = JSON.stringify(tDate);
			toDate = toDate.slice(1,11);
			var tSplit = toDate.split("-");
			var tDateString = tSplit[2] + " " + months[parseInt(tSplit[1])-1] + " " + tSplit[0];
			console.log(tDate.getTime());
			console.log(fDate.getTime());
			this.showDateRange = fDateString + " - " + tDateString;
			this.calendar.overlayVisible=false;


			$.fn.dataTable.ext.search.push(
				function (settings, data, dataIndex) {
					var min = new Date(fDateString).getTime();
					var max = new Date(tDateString).getTime();
					var startDate = new Date(data[3]).getTime();
					console.log(startDate);
					if (min == null && max == null) return true;
					if (min == null && startDate <= max) return true;
					if (max == null && startDate >= min) return true;
					if (startDate <= max && startDate >= min) return true;
					return false;
				}
			);
			this.datatableElement.dtInstance.then(table => {
				table.draw();
			});

		}
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


}
