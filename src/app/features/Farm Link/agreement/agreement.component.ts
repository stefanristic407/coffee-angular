// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';

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
		public dashboard: DashboardserviceService) {
			this.data = {};
			this.data = 
				[{ 
					"files": '<img class="dwnd-img pr-1" src="assets/images/pdf-img.PNG" alt="upload-icon">' + "SEWN service offerings",
					"orderid": "#129979", 
					"addedon": "24/09/2019  3:06 pm", 
					"customername": "The Steam Hotel", 
					"origin": "Origin"
				},
				{ files: '<img class="dwnd-img pr-1" src="assets/images/pdf-img.PNG" alt="upload-icon">' + 'Candela agreement pap..', orderid: '#221669', addedon: '18/12/2019  1:00pm', customername: 'Candela', origin: 'Gothenburg'},
				{ files: '<img class="dwnd-img pr-1" src="assets/images/pdf-img.PNG" alt="upload-icon">' + 'Finca Nápoles agreement..', orderid: '#879082', addedon: '01/10/2019  07:24 am',  customername: 'Finca', origin: 'Stockholm'},
				{ files: '<img class="dwnd-img pr-1" src="assets/images/pdf-img.PNG" alt="upload-icon">' + 'Santa Rosa agreement pap..', orderid: '#127908', addedon: '24/01/2020  11:05pm', customername: 'Santa', origin: 'Karlstad' },
				{ files: '<img class="dwnd-img pr-1" src="assets/images/pdf-img.PNG" alt="upload-icon">' + 'Hacienda Sonora agreement..', orderid: '#273528', addedon: '27/02/2020  4:17pm', customername: 'Hacienda', origin: 'Karlstad'},
				{ files: '<img class="dwnd-img pr-1" src="assets/images/pdf-img.PNG" alt="upload-icon">' + 'Vijay Simha agreement..', orderid: '#727520', addedon: '17/03/2020  7:17am', customername: 'Vijay', origin: 'Stockholm' }
			
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
        processing: false,
        language: { search: "" },
        columns:[
          // {title: '<input type="checkbox" value="">' , data: null, className: "select-checkbox", defaultContent:'<input type="checkbox" value="">'},
          {
            title:'<label class="bestate-check "><input type="checkbox"  name="estate_all" [checked]="isAllCheckedEstate()" (change)="checkAllEstate($event)"><span class="estatecheckmark"></span></label>',
  
            defaultContent:'<label class="bestate-check"><input type="checkbox" name="sizecb[]" value="data.id" [(ngModel)]="data.state"  /><span class="estatecheckmark"></span>' , 
          },
          {
            title: 'Files',
            data: 'files'
          }, {
            title: 'Order ID',
            data: 'orderid'
          }, 
          {
            title: 'Added on',
            data: 'addedon',
            
          }, 
          {
            title: 'Customer Name',
            data: 'customername'
          },

          {
            title: 'Origin',
            data: 'origin'
          },
        
          {
            title: "",
            defaultContent: "",
            className: "more-options"
          }
		],
		

		rowCallback: (row: Node, data: any, index: number) => {
			const self = this;
			$('td', row).click(function(){
				self.router.navigate(["/ordermanagement/select-order"]);
			})
		}
		
      };
      this.estatetermStatus = '';
      this.estatetermOrigin = '';
      this.estatetermType = '';
      this.displayNumbers = '10';
      $(document).ready(function () {
        $(".dataTables_length").ready(function () {
          $(".dataTables_length").hide()
          $(".dataTables_info").hide();
          
        });
        $("input[type='search']").ready(function () {
          // $(".dataTables_filter>label").css("color","#FFF");
          $("input[type='search']").attr("placeholder", "Search Files");
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
