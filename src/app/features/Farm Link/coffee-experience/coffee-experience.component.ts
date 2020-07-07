// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';

@Component({
  selector: 'app-coffee-experience',
  templateUrl: './coffee-experience.component.html',
  styleUrls: ['./coffee-experience.component.css']
})
export class CoffeeExperienceComponent implements OnInit {
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
					"id": "1000", 
					"estatename": "Finca La Pampa", 
					"origin": "Colombia", 
					"dataordered": "24 Jan 2020", 
					"datarecieved": "02 Feb 2020",
					"species": "Bourbon",
					"quantity": "-", 
					"cuppingscore": "82.5" 
				},
				{ id: '1001', estatename: 'Gesha', origin: 'Ethopia', dataordered: '21 Jan 2020', datarecieved: '21 Feb 2020',species: 'Bourbon', quantity: '297kg', cuppingscore: '84.5' },
				{ id: '1002', estatename: 'Finca La Toboba', origin: 'Ethopia',  dataordered: '22 Apr 2020', datarecieved: '26 Apr 2020', species: 'Bourbon', quantity: '29kg', cuppingscore: '82'  },
				{ id: '1003', estatename: 'Asoproaaa', origin: 'Ethopia', dataordered: '24 Apr 2020', datarecieved: '28 Apr 2020', species: 'Bourbon', quantity: '-', cuppingscore: '88'  },
				{ id: '1004', estatename: 'Cafe Directo', origin: 'Colombia', dataordered: '25 May 2020', datarecieved: '26 May 2020', species: 'Bourbon', quantity: '-', cuppingscore: '81'  },
				{ id: '1005', estatename: 'La Isabela', origin: 'Colombia', dataordered: '26 May 2020', datarecieved: '30 May 2020', species: 'Bourbon', quantity: '-', cuppingscore: '83'  },
				{ id: '1006', estatename: 'La Isabela', origin: 'Colombia', dataordered: '13 Oct 2020', datarecieved: '26 Oct 2020', species: 'Bourbon', quantity: '397kg', cuppingscore: '86.5' },
				{ id: '1007', estatename: 'Cafe Directo', origin: 'Ethopia', dataordered: '13 Dec 2020', datarecieved: '29 Dec 2020', species: 'Bourbon', quantity: '297kg', cuppingscore: '88'  },
				{ id: '1008', estatename: 'Asoproaaa', origin: 'Colombia', dataordered: '13 Jan 2019', datarecieved: '20 Jan 2019', species: 'Bourbon', quantity: '-', cuppingscore: '87'  },
			];
			this.mainData = this.data;
		 }


     ngOnInit(): void {

      //Toggle Esstate active
	  $('.btn-switch').click(function() {
		var $group = $(this).closest('.cardpanel-detail');
		$('.btn-switch', $group).removeClass("active");
		$(this).addClass("active");
	  });
	  $(".activate-toggle").click(function() {
		$(".cardpanel-detail").fadeIn();
		 $(".table-details").fadeOut();
		  $(".remove-toggle").removeClass('active');
	   // $(".cardpanel-detail").addClass('active')
	  });
	  $(".remove-toggle").click(function() {
		$(".table-details").fadeIn();
		 $(".cardpanel-detail").fadeOut();
		$(".activate-toggle").removeClass('active');
		
	  });


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
            title: 'Order ID',
            data: 'id'
          }, {
            title: 'Estate name',
            data: 'estatename'
          }, 
          {
            title: 'Origin',
            data: 'origin',
            
          }, 
          {
            title: 'Date ordered',
            data: 'dataordered'
          },

          {
            title: 'Date Recieved',
            data: 'datarecieved'
          },
          {
            title: 'Species',
            data: 'species',
            
          }, 
          {
            title: 'Quantity',
            data: 'quantity'
          },
          {
            title: 'Cupping score',
            data: 'cuppingscore'
          },
        
          {
            title: "Action",
			defaultContent: "Update details",
            className: "view-order"
          }
		],
		

		rowCallback: (row: Node, data: any, index: number) => {
			const self = this;
			$('td', row).click(function(){
				self.router.navigate(["/features/coffee-details"]);
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
          $("input[type='search']").attr("placeholder", "Search by order id, estate name");
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
