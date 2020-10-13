// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  Orders List,Search and Filters.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { GlobalsService } from 'src/services/globals.service';

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

  coffeetermOriginMob:any;
  showOriginMob:boolean = true;
  termSearch:any;

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


	public gridData: any[] = [
		{  name: 'Finca La Pampa', origin:'Colombia',date: '19/12/19', orderid:'#56076' },
		{  name: 'Gesha',origin:'Ethiopia',date: '12/01/20', orderid:'#81671' },
		{  name: 'Finca La toboba', origin:'Brazil',date: '02/10/19', orderid:'#76076' },
		{  name: 'Cafe Directo',origin:'Colombia',date: '10/01/20', orderid:'#46930' },
		{  name: 'La Isabela', origin:'Ethiopia',date: '12/04/20', orderid:'#12416' },
		{  name: 'Gesha',origin:'Colombia',date: '19/09/19', orderid:'#71716' },
		
  ];
	appLanguage: any;
	coffeeExpActive:any = 0;

  constructor(public router: Router,
		public cookieService: CookieService,
		public dashboard: DashboardserviceService,
		private globals: GlobalsService) {
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
		this.language();
		// this.appLanguage = this.globals.languageJson;
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
	  this.coffeetermOriginMob = '';

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
	  



/* pagination start */
let listCount = 0;
let elLen;
let newliLen;

$(document).ready(function () {
  var pLen = $('.pagination-content').length;
  console.log(pLen)
  for (var x = 0; x < pLen; x++) {
	var elements = $('.pagination-content').eq(x).find(".pagination-content-list .pagination-content-list__item");
	var index = 0;
	elLen = elements.length;
	newliLen = Math.floor(elLen / 4) + 1;
	var showNextFour = function (index) {
	  if (index >= elements.length) {
		index = 0;
	  }


	  elements.hide().slice(index, index + 4).show();

	}
	showNextFour(listCount);

	 // $('.responsive-pagination-list')
	 if(newliLen >5) {
	  for (var i = 1; i <= 5; i++) {
		var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
		$('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
		$('.pagination-content').eq(x).find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').addClass('active');
	  }

	 }

	 else {
	  for (var i = 1; i <= newliLen; i++) {
		var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
		$('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
		$('.pagination-content').eq(x).find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').addClass('active');
	  }
	 }

  }

});


//Next page
$('body').on('click', '.responsive-pagination__next', function () {
  var step = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active');
  var steps = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item');
  var stepNext = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active').next('.responsive-pagination-list__item');
  var stepLastVal = parseInt($(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:last-child').text());
  $(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
  var pageNew = parseInt($('.page-new').text());
  var pagefind = stepLastVal - pageNew;



  var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
  elLen = elements.length;
  newliLen = Math.floor(elLen / 4) + 1;
  var index = 0;
  var showNextFour = function (index) {
	if (index >= elements.length) {
	  index = 0;
	}

	elements.hide().slice(index, index + 4).show();

  }


  listCount = listCount + 4;
  showNextFour(listCount);

  var stepValue = stepNext.text();
  if (stepLastVal < newliLen) {
	stepNext.removeClass('active');
	stepNext.prev('.responsive-pagination-list__item').addClass('active');

	if(newliLen > 5) {
	  for (var i = 0; i <= 4; i++) {
		var newStep = parseInt(steps.eq(i).text());

		if (pageNew == (stepLastVal - 1)) {
		  return false;
		}

		else {
		  steps.eq(i).text(newStep + 1);
		}
	  }
	}

	else {
	  for (var i = 0; i <= newliLen; i++) {
		var newStep = parseInt(steps.eq(i).text());

		if (pageNew == (stepLastVal - 1)) {
		  return false;
		}

		else {
		  steps.eq(i).text(newStep + 1);
		}
	  }
	}
	
  }


  else {
	step.removeClass('active');
	stepNext.addClass('active')


	if (stepNext.is(':last-child')) {
	  $(this).addClass('disable');

	}

  }


  

});



//Prev page
$('body').on('click', '.responsive-pagination__prev', function () {
  var step = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active:last');
  var steps = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item');
  var stepPrev = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item.active').prev('.responsive-pagination-list__item');
  var stepFirst = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child');
  var stepLastVal = parseInt($(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:last-child').text());
  var activeFirst = $(this).parents('.responsive-pagination').find('.responsive-pagination-list').find('.responsive-pagination-list__item:first-child').hasClass('active');


 
  listCount = listCount - 4;

  var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
  elLen = elements.length;
  newliLen = Math.floor(elLen / 4) + 1;
  var index = 0;
  var showNextFour = function (index) {
	if (index >= elements.length) {
	  index = 0;
	}

	elements.hide().slice(index, index + 4).show();

  }


  showNextFour(listCount);

  if(newliLen > 5) {
 
	for (var i = 0; i <= 4; i++) {
	  var newStep = parseInt(steps.eq(i).text());



	  if (stepLastVal <= 5) {
		stepPrev.addClass('active');
		step.removeClass('active');
	  }

	  else {
		steps.eq(i).text(newStep - 1);
	  }
	}
  }

  else {
	for (var i = 0; i <= newliLen; i++) {
	  var newStep = parseInt(steps.eq(i).text());



	  if (stepLastVal <= newliLen) {
		stepPrev.addClass('active');
		step.removeClass('active');
	  }

	  else {
		steps.eq(i).text(newStep - 1);
	  }
	}
  }

  

  if (stepFirst.text() == '1' && stepFirst.hasClass('active')) {
	$(this).addClass('disable');
	$(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
  }


});




$('body').on('click', '.responsive-pagination-list__item', function () {
  $(this).parents('.pagination-content').find('.responsive-pagination-list__item').not(this).removeClass('active');
  $(this).addClass('active');
  var liStep = parseInt($(this).text());
  listCount = 4;
  if (liStep == 1) {
	$(this).parents('.pagination-content').find('.responsive-pagination__prev').addClass('disable');
	$(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
	liStep = 0;
	listCount = 0;
	console.log(listCount)

	var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
	elLen = elements.length;
	newliLen = Math.floor(elLen / 4) + 1;
	var index = 0;
	var showNextFour = function (index) {
	  if (index >= elements.length) {
		index = 0;
	  }

	  elements.hide().slice(index, index + 4).show();

	}


	showNextFour(listCount);
  }

  else {
	$(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
	$(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
	listCount = (liStep * listCount) - 4;
	console.log(listCount)

	var elements = $(this).parents('.pagination-content').find(".pagination-content-list .pagination-content-list__item");
	elLen = elements.length;
	newliLen = Math.floor(elLen / 4) + 1;
	var index = 0;
	var showNextFour = function (index) {
	  if (index >= elements.length) {
		index = 0;
	  }

	  elements.hide().slice(index, index + 4).show();

	}


	showNextFour(listCount);
  }


  if (liStep == newliLen) {
	$(this).parents('.pagination-content').find('.responsive-pagination__next').addClass('disable');
  }


});

/* pagination ends */

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
			table.column(3).search(origindata).draw();
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
	  setOriginMob(term:any){
		this.coffeetermOriginMob = term;

	}
	toggleOriginMob() {
		this.showOriginMob = !this.showOriginMob;
		if(this.showOriginMob==false){
			document.getElementById('OrginMob-id').style.border="1px solid #30855c";
		}
		else{
			document.getElementById('OrginMob-id').style.border="1px solid #d6d6d6";
		
		}
	 }
	 language(){
		this.appLanguage = this.globals.languageJson;
		this.coffeeExpActive++;
	}
}
