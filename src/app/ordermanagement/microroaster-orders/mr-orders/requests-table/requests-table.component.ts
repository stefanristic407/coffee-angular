import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardserviceService } from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';

@Component({
	selector: 'app-requests-table',
	templateUrl: './requests-table.component.html',
	styleUrls: ['./requests-table.component.css']
})
export class RequestsTableComponent implements OnInit {

	roasterterm: any;
	roastertermStatus: any;
	roastertermType: any;
	roastertermOrigin: any;
	displayNumbers: any;
	selected: Date[];
	rangeDates: any;
	showOrigin: boolean = true;
	showType: boolean = true;
	showStatus: boolean = true;
	showDisplay: boolean = true;
	appLanguage: any;

	estatetermOriginMob: any;
	showOriginMob: boolean = true;
	showTypeMob: boolean = true;
	showStatusMob: boolean = true;
	estatetermStatusMob: string;
	estatetermTypeMob: string;
	searchTerm: any;

	@ViewChild(DataTableDirective, { static: false })
	datatableElement: DataTableDirective;
	showDateRange: any;

	@ViewChild('calendar')
	calendar: any;
	//dtInstance:DataTables.Api;

	// Static roaster Orders Data List
	public data: any;
	public mainData: any[];
	title = 'angulardatatables';
	dtOptions: DataTables.Settings = {
		language: { "search": '' }
	};
	roasterId: any;
	requestData: any;

	constructor(public router: Router,
		public cookieService: CookieService,
		public dashboard: DashboardserviceService,
		public globals: GlobalsService, public roasterService: RoasterserviceService,
		private toastrService: ToastrService, public roasteryProfileService: RoasteryProfileService) {
		this.roasterId = this.cookieService.get('roaster_id');

		// this.data = {};
		// this.data =
		// 	[{
		// 		"requestedby": "Third wave coffee r..",
		// 		"daterequested": "24 Jan 2020",
		// 		"origin": "Colombia",
		// 		"estate": "Gesha",
		// 		"varierty": "Bourbon"
		// 	},
		// 	{  requestedby: 'Home brew coffee', daterequested: '21 Jan 2020', origin: 'Ethopia', estate: 'Finca la pampa', varierty: 'Bourbon'},
		// 	{  requestedby: 'Blue Tokai roasters', daterequested: '22 Apr 2020', origin: 'Ethopia', estate: 'Gesha', varierty: 'Bourbon'},
		// 	{  requestedby: 'Third wave coffee r..', daterequested: '24 Apr 2020', origin: 'Ethopia', estate: 'Finca la toboba',  varierty: 'Bourbon'},
		// 	{  requestedby: 'La Barista', daterequested: '25 May 2020', origin: 'Colombia', estate: 'Finca la pampa', varierty: 'Bourbon'},
		// 	{  requestedby: 'Home brew coffee', daterequested: '26 May 2020', origin: 'Colombia', estate: 'Asoproaaa', varierty: 'Bourbon'},
		// 	{  requestedby: 'Third wave coffee r..', daterequested: '13 Oct 2020', origin: 'Colombia', estate: 'Cafe directo', varierty: 'Bourbon' },
		// 	{  requestedby: 'Cafe Directo', daterequested: '13 Dec 2020', origin: 'Ethopia', estate: 'Finca la toboba', varierty: 'Bourbon'},
		// 	{  requestedby: 'La Barista', daterequested: '13 Jan 2019', origin: 'Colombia', estate: 'Finca la pampa', varierty: 'Bourbon'},
		// 	{  requestedby: 'Blue Tokai roasters', daterequested: '14 Feb 2019', origin: 'Colombia', estate: 'Asoproaaa',  varierty: 'Bourbon'},
		// 	{  requestedby: 'Third wave coffee r..', daterequested: '14 Jun 2019', origin: 'Ethopia', estate: 'Cafe directo', varierty: 'Bourbon'},
		// 	{  requestedby: 'Home brew coffee', daterequested: '13 Jul 2019', origin: 'Ethopia', estate: 'Finca la toboba', varierty: 'Bourbon'},
		// 	{  requestedby: 'La Barista', daterequested: '13 Mar 2018', origin: 'Colombia', estate: 'Cafe directo',  varierty: 'Bourbon'},
		// 	{  requestedby: 'Gesha', daterequested: '13 May 2018', origin: 'Colombia', estate: 'Asoproaaa', varierty: 'Bourbon'},
		// 	{  requestedby: 'Home brew coffee', daterequested: '17 Aug 2018', origin: 'Ethopia', estate: 'Finca la pampa', varierty: 'Bourbon'},
		// 	{  requestedby: 'Asoproaaa', daterequested: '13 Oct 2018', origin: 'Ethopia', estate: 'Asoproaaa', varierty: 'Bourbon'},
		// 	{  requestedby: 'Blue Tokai roasters', daterequested: '19 Oct 2018', origin: 'Colombia', estate: 'Finca la toboba', varierty: 'Bourbon'},
		// 	{  requestedby: 'La Barista', daterequested: '23 Nov 2018', origin: 'Colombia', estate: 'Finca la pampa', varierty: 'Bourbon'},
		// 	];
		this.mainData = this.data;
	}

	ngOnInit(): void {
		//Auth checking
		if (this.cookieService.get("Auth") == "") {
			this.router.navigate(["/auth/login"]);
		}
		this.getMrRequestsData();
		this.appLanguage = this.globals.languageJson;

		this.roastertermStatus = '';
		this.roastertermOrigin = '';
		this.roastertermType = '';
		this.displayNumbers = '10';
		this.estatetermOriginMob = '';
		this.estatetermStatusMob = '';
		this.estatetermTypeMob = '';

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
				if (newliLen > 5) {
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

				if (newliLen > 5) {
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

			if (newliLen > 5) {

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


	setStatus(term: any) {
		this.roastertermStatus = term;
		this.datatableElement.dtInstance.then(table => {
			table.column(9).search(this.roastertermStatus).draw();
		});
	}

	setOrigin(origindata: any) {
		this.roastertermOrigin = origindata;
		this.datatableElement.dtInstance.then(table => {
			table.column(4).search(origindata).draw();
		});
	}
	setType(data: any) {
		this.roastertermType = data;
		this.datatableElement.dtInstance.then(table => {
			table.column(8).search(data).draw();
		});
	}
	setDisplay(data: any) {
		this.displayNumbers = data;
		$("select").val(data).trigger('change');

	}

	openCalendar(event: any) {
		this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
		event.stopPropagation();
	}

	filterDate(event: any) {
		if (this.rangeDates[0] != null && this.rangeDates[1] != null) {
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var fDate = new Date(this.rangeDates[0]);
			var fromDate = JSON.stringify(fDate);
			fromDate = fromDate.slice(1, 11);
			var fSplit = fromDate.split("-");

			var fDateString = fSplit[2] + " " + months[parseInt(fSplit[1]) - 1] + " " + fSplit[0];
			var tDate = new Date(this.rangeDates[1]);
			var toDate = JSON.stringify(tDate);
			toDate = toDate.slice(1, 11);
			var tSplit = toDate.split("-");
			var tDateString = tSplit[2] + " " + months[parseInt(tSplit[1]) - 1] + " " + tSplit[0];
			console.log(tDate.getTime());
			console.log(fDate.getTime());
			this.showDateRange = fDateString + " - " + tDateString;
			this.calendar.overlayVisible = false;


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
		if (this.showOrigin == false) {
			document.getElementById('origin_id').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('origin_id').style.border = "1px solid #d6d6d6";

		}
	}
	toggleType() {
		this.showType = !this.showType;
		if (this.showType == false) {
			document.getElementById('type_id').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('type_id').style.border = "1px solid #d6d6d6";

		}
	}
	toggleStatus() {
		this.showStatus = !this.showStatus;
		if (this.showStatus == false) {
			document.getElementById('status_id').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('status_id').style.border = "1px solid #d6d6d6";

		}
	}
	toggleDisplay() {
		this.showDisplay = !this.showDisplay;
		if (this.showDisplay == false) {
			document.getElementById('display_id').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('display_id').style.border = "1px solid #d6d6d6";

		}
	}
	getMrRequestsData() {
		this.roasterService.getMrAvailabilityRequests(this.roasterId).subscribe(
			data => {
				console.log(data);
				if (data['success'] == true) {
					this.requestData = data['result'];
				}
				else {
					this.toastrService.error(this.globals.languageJson.error_message);
				}
			}
		)
	}
	OrderDetails($event, group) {
		// console.log("the incoming data  are " + group.typeoforder + "..." + group.status);


		let navigationExtras: NavigationExtras = {
			queryParams: {
				"data": encodeURIComponent(group.status),
			}
		}
		this.router.navigate(["/ordermanagement/mr-request-details"], navigationExtras);

	}
	setOriginMob(term: any) {
		this.estatetermOriginMob = term;

	}
	setTypeMob(term: any) {
		this.estatetermTypeMob = term;

	}
	setStatusMob(term: any) {
		this.estatetermStatusMob = term;

	}
	toggleOriginMob() {
		this.showOriginMob = !this.showOriginMob;
		if (this.showOriginMob == false) {
			document.getElementById('OrginMob-id').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('OrginMob-id').style.border = "1px solid #d6d6d6";

		}
	}
	toggleTypeMob() {
		this.showTypeMob = !this.showTypeMob;
		if (this.showTypeMob == false) {
			document.getElementById('type_id_Mob').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('type_id_Mob').style.border = "1px solid #d6d6d6";

		}
	}
	toggleStatusMob() {
		this.showStatusMob = !this.showStatusMob;
		if (this.showStatusMob == false) {
			document.getElementById('status_id_Mob').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('status_id_Mob').style.border = "1px solid #d6d6d6";

		}
	}
	//  Function Name : Check box function.
	//  Description   : This function helps to Check all the rows of the Users list.
	checkAllEstate(ev) {
		if (ev) {
			this.data.forEach(x => (x.state = ev.target.checked));
		}
	}

	//  Function Name : Single Check box function.
	//  Description   : This function helps to Check that single row isChecked.
	isAllCheckedEstate() {
		if (data) {
			// return this.data.every(_ => _.state);
		}
	}
	getCountryName(data: any) {
		if (data) {
			return this.roasteryProfileService.countryList.find(con => con.isoCode == data).name;
		}
	}
}
