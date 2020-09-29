import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardserviceService } from 'src/services/dashboard/dashboardservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-select-order-table',
  templateUrl: './select-order-table.component.html',
  styleUrls: ['./select-order-table.component.css']
})
export class SelectOrderTableComponent implements OnInit {

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
	roasterId :any ;
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
		public dashboard: DashboardserviceService,
		private roasterService: RoasterserviceService,
		private toastrService: ToastrService,) {
			this.roasterId = this.cookieService.get('roaster_id');
			this.data = {};
			// this.data = 
			// 	[
        //   { orderid: '1000', estatename: 'Finca La Pampa', dataordered: '24 Jan 2020', origin: 'Colombia',variety:'Bourbon', quantity: '-',cuppingscore:'84.5' },
        // { orderid: '1001', estatename: 'Gesha', dataordered: '21 Jan 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '297kg',cuppingscore:'88' },
        // { orderid: '1002', estatename: 'Finca La Toboba', dataordered: '22 Apr 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '29kg',cuppingscore:'81.5' },
        // { orderid: '1003', estatename: 'Asoproaaa', dataordered: '24 Apr 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '-', cuppingscore:'84.5' },
        // { orderid: '1004', estatename: 'Cafe Directo', dataordered: '25 May 2020', origin: 'Colombia',variety:'Bourbon', quantity: '-',cuppingscore:'85.5' },
		// { orderid: '1005', estatename: 'La Isabela', dataordered: '26 May 2020', origin: 'Colombia',variety:'Bourbon', quantity: '-',cuppingscore:'86' },
		// { orderid: '1006', estatename: 'Finca La Pampa', dataordered: '24 Jan 2020', origin: 'Colombia',variety:'Bourbon', quantity: '-', cuppingscore:'84.5' },
    //     { orderid: '1007', estatename: 'Gesha', dataordered: '21 Jan 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '297kg',cuppingscore:'88' },
    //     { orderid: '1008', estatename: 'Finca La Toboba', dataordered: '22 Apr 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '29kg',cuppingscore:'81.5' },
    //     { orderid: '1009', estatename: 'Asoproaaa', dataordered: '24 Apr 2020', origin: 'Ethopia',variety:'Bourbon', quantity: '-',cuppingscore:'84.5' },
    //     { orderid: '1010', estatename: 'Cafe Directo', dataordered: '25 May 2020', origin: 'Colombia',variety:'Bourbon', quantity: '-',cuppingscore:'85.5' },
    //     { orderid: '1011', estatename: 'La Isabela', dataordered: '26 May 2020', origin: 'Colombia',variety:'Bourbon', quantity: '-',cuppingscore:'86' },
			// ];
			// this.mainData = this.data;
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
					data: 'id'
				}, {
					title: 'Estate name',
					data: 'estate_name'
				}, {
					title: 'Date ordered',
					data: 'created_at'
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
					data: "quantity_count",
				}
			],
			// createdRow: (row: Node, data: any, index: number) => {
			// 	const self = this;
			// 	if($(row).children('td.typeoforderclass').html() == "Booked"){
			// 		$(row).children('td.typeoforderclass').html('<span class="typeoforder-Booked">&#9679; Booked</span>');
					
			// 	}
			// 	if($(row).children('td.typeoforderclass').html() == "Sample"){
			// 		$(row).children('td.typeoforderclass').html('<span class="typeoforder-Sample">&#9679; Sample</span>');
					
			// 	}
			// 	if($(row).children('td.typeoforderclass').html() == "Pre-Booked"){
			// 		$(row).children('td.typeoforderclass').html('<span class="typeoforder-Pre-Booked">&#9679; Pre-Booked</span>');
					
			// 	}
			// },
			
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

		this.estateSelectAnOrderTableData(); //calling estate table data onload 
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
	// setStatus(term: any) {
	// 	this.estatetermStatus = term;
	// 	this.datatableElement.dtInstance.then(table => {
	// 		table.column(9).search(this.estatetermStatus).draw();
	// 	});
	// }

	setOrigin(origindata: any) {
		this.estatetermOrigin = origindata;
		this.datatableElement.dtInstance.then(table => {
			table.column(4).search(origindata).draw();
		});
	}
	// setType(data: any) {
	// 	this.estatetermType = data;
	// 	this.datatableElement.dtInstance.then(table => {
	// 		table.column(8).search(data).draw();
	// 	});
	// }
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
	//  toggleType() {
	//   this.showType = !this.showType;
	//   if(this.showType==false){
	// 	document.getElementById('type_id').style.border="1px solid #30855c";
	// }
	// else{
	// 	document.getElementById('type_id').style.border="1px solid #d6d6d6";
	
	// }
	// }
	// toggleStatus() {
	// 	this.showStatus = !this.showStatus;
	// 	if(this.showStatus==false){
	// 	  document.getElementById('status_id').style.border="1px solid #30855c";
	//   }
	//   else{
	// 	  document.getElementById('status_id').style.border="1px solid #d6d6d6";
	  
	//   }
	//   }
	  toggleDisplay(){
		this.showDisplay = !this.showDisplay;
		if(this.showDisplay==false){
		  document.getElementById('display_id').style.border="1px solid #30855c";
	  }
	  else{
		  document.getElementById('display_id').style.border="1px solid #d6d6d6";
	  
	  }
	  }

	  //select order table data 
	  estateSelectAnOrderTableData() {
		this.roasterService.getEstateOrders(this.roasterId).subscribe(
		  data => {
			if ( data['success'] == true ) {
			  if ( data['result'] == null || data['result'].length == 0) {
				this.toastrService.error("Table Data is empty");
			  }
			  else {
				this.data = data['result'];
			  }
			} 
			else {
			  
			  this.toastrService.error("Error while getting the agreement list!");
			}
		  }
		)
	  }
}
