import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardserviceService } from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';

@Component({
	selector: 'app-micro-roaster',
	templateUrl: './micro-roaster.component.html',
	styleUrls: ['./micro-roaster.component.css'],
})
export class MicroRoasterComponent implements OnInit {
	estateterm: any;
	estatetermStatus: any;
	estatetermType: any;
	estatetermOrigin: any;
	displayNumbers: any;
	selected: Date[];
	rangeDates: any;
	showOrigin: boolean = true;
	showType: boolean = true;
	showStatus: boolean = true;
	showDisplay: boolean = true;
	searchTerm: any;
	odd: boolean = false;
	hideTable: boolean = false;

	@ViewChild(DataTableDirective, { static: false })
	datatableElement: DataTableDirective;
	showDateRange: any;

	@ViewChild('calendar')
	calendar: any;
	appLanguage?: any;

	//dtInstance:DataTables.Api;

	// Static Estate Orders Data List
	public data: any;
	public mainData: any;
	title = 'angulardatatables';
	dtOptions: DataTables.Settings = {
		language: { "search": '' }
	};
	estatetermOriginMob: any;
	showOriginMob: boolean = true;
	showTypeMob: boolean = true;
	showStatusMob: boolean = true;
	estatetermStatusMob: string;
	estatetermTypeMob: string;
	roasterId: any;
	estateOrdersActive: any = 0;
	countryValue: any;
	orderType: string = '';
	showContinueBtn: boolean = false;
	orderBookId: string = "";
	changedID: string = "";

	constructor(public router: Router,
		public cookieService: CookieService,
		public dashboard: DashboardserviceService,
		private roasterService: RoasterserviceService,
		private toastrService: ToastrService,
		public modalService: BsModalService,
		public globals: GlobalsService,
		public route: ActivatedRoute,
		public profileservice: RoasteryProfileService) {
		this.roasterId = this.cookieService.get('roaster_id');
		this.mainData = this.data;
	}

	ngOnInit(): void {
		//Auth checking
		if (this.cookieService.get("Auth") == "") {
			this.router.navigate(["/auth/login"]);
		}
		// this.appLanguage = this.globals.languageJson;
		this.language();
		this.orderBookId = decodeURIComponent(this.route.snapshot.queryParams['id']);
		this.orderType = this.route.snapshot.queryParams['orderType'] ? decodeURIComponent(this.route.snapshot.queryParams['orderType']) : '';

		this.dtOptions = {
			//ajax: this.data,
			data: this.mainData,
			pagingType: 'full_numbers',
			pageLength: 10,
			lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
			processing: false,
			// placeholder: 'search here',
			// searchPlaceholder : this.globals.languageJson.all,
			language: {
				search: "",
				emptyTable: this.globals.languageJson.no_table_data
			},
			columns: [
				// {title: '<input type="checkbox" value="">' , data: null, className: "select-checkbox", defaultContent:'<input type="checkbox" value="">'},
				{
					title: '<label class="bestate-check "><input type="checkbox"  name="estate_all" [checked]="isAllCheckedEstate()" (change)="checkAllEstate($event)"><span class="estatecheckmark"></span></label>',

					defaultContent: '<label class="bestate-check"><input type="checkbox" name="sizecb[]" value="data.id" [(ngModel)]="data.state"  /><span class="estatecheckmark"></span>',
				},
				{
					title: this.globals.languageJson.order_id,
					data: 'id'
				}, {
					title: this.globals.languageJson.estate_name,
					data: 'estate_name'
				},
				{
					title: this.globals.languageJson.date_ordered,
					data: 'created_at'
				},
				{
					title: this.globals.languageJson.origin,
					data: 'origin',

				},
				{
					title: this.globals.languageJson.species,
					data: 'species',

				},
				{
					title: this.globals.languageJson.price,
					data: 'price'
				},
				{
					title: this.globals.languageJson.quantity,
					data: 'quantity' + 'quantity_type'
				}, {
					title: this.globals.languageJson.order_type,
					data: 'type',
					className: 'typeoforderclass'
				}, {
					title: this.globals.languageJson.status,
					data: 'status',
					className: 'status-es'
				},
				{
					title: this.globals.languageJson.action,
					defaultContent: "View order",
					className: "view-order"
				}
			],
			createdRow: (row: Node, data: any, index: number) => {
				const self = this;
				if ($(row).children('td.typeoforderclass').html() == "Booked") {
					$(row).children('td.typeoforderclass').html('<span class="typeoforder-Booked">&#9679; Booked</span>');

				}
				if ($(row).children('td.typeoforderclass').html() == "Sample") {
					$(row).children('td.typeoforderclass').html('<span class="typeoforder-Sample">&#9679; Sample</span>');

				}
				if ($(row).children('td.typeoforderclass').html() == "Pre-Booked") {
					$(row).children('td.typeoforderclass').html('<span class="typeoforder-Pre-Booked">&#9679; Pre-Booked</span>');

				}
			},
			rowCallback: (row: Node, data: any, index: number) => {
				const self = this;
				$('td', row).click(function () {
					let navigationExtras: NavigationExtras = {
						queryParams: {
							"data": encodeURIComponent(data.status),
						}
					}
					if (data.typeoforder == "Booked") {
						self.router.navigate(["/ordermanagement/order-booked"], navigationExtras);
					}
					else if (data.typeoforder == "Sample") {
						self.router.navigate(["/ordermanagement/order-sample"], navigationExtras);
					}
					else if (data.typeoforder == "Pre-Booked") {
						self.router.navigate(["/ordermanagement/order-prebook"], navigationExtras);
					}
				})
			}

		};
		this.estatetermStatus = '';
		this.estatetermOrigin = '';
		this.estatetermType = '';
		this.displayNumbers = '10';
		this.estatetermOriginMob = '';
		this.estatetermStatusMob = '';
		this.estatetermTypeMob = '';
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
		this.getMROrdersData();
		//get table data

	}


	language() {
		this.appLanguage = this.globals.languageJson;
		this.estateOrdersActive++;
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
	setOriginMob(term: any) {
		this.estatetermOriginMob = term;

	}
	setTypeMob(term: any) {
		this.estatetermTypeMob = term;

	}
	setStatusMob(term: any) {
		this.estatetermStatusMob = term;

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
	toggleOriginMob() {
		this.showOriginMob = !this.showOriginMob;
		if (this.showOriginMob == false) {
			document.getElementById('OrginMob-id').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('OrginMob-id').style.border = "1px solid #d6d6d6";

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
	toggleTypeMob() {
		this.showTypeMob = !this.showTypeMob;
		if (this.showTypeMob == false) {
			document.getElementById('type_id_Mob').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('type_id_Mob').style.border = "1px solid #d6d6d6";

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
	toggleStatusMob() {
		this.showStatusMob = !this.showStatusMob;
		if (this.showStatusMob == false) {
			document.getElementById('status_id_Mob').style.border = "1px solid #30855c";
		}
		else {
			document.getElementById('status_id_Mob').style.border = "1px solid #d6d6d6";

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

	displayData($event, group) {
		console.log("the incoming data  are " + group.type + "..." + group.status);

		if (group.status == "RECEIVED") {
			this.globals.ord_received_date = group.date_received;
		}
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"data": encodeURIComponent(group.status),
				"id": encodeURIComponent(group.id)
			}
		}
		if (group.type == "GC_ORDER") {
			this.router.navigate(["/ordermanagement/order-booked"], navigationExtras);
		}
		else if (group.type == "GC_ORDER_SAMPLE") {
			this.router.navigate(["/ordermanagement/order-sample"], navigationExtras);
		}
		else if (group.type == "PREBOOK_LOT") {
			this.router.navigate(["/ordermanagement/order-prebook"], navigationExtras);
		}

	}
	getMROrdersData() {
		this.roasterService.getMrOrders(this.roasterId).subscribe(
			data => {
				console.log(data);
				if (data['success'] == true) {
					this.data = data['result'];
					console.log(this.data);

				}
				else {
					this.toastrService.error(this.globals.languageJson.error_message);
				}
			}
		)
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
	GetCountry(data: any) {
		// console.log(data.toUpperCase());
		if (data) {
			this.countryValue = this.profileservice.countryList.find(con => con.isoCode == data.toUpperCase());
			if (this.countryValue) {
				return this.countryValue.name;
			}
		}
	}
	onOrderChange(groupRow) {
		if (groupRow && groupRow['id']) {
			this.changedID = groupRow['id'];
		}
		this.showContinueBtn = true;
	}
	continue() {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": encodeURIComponent(this.changedID),
				"orderType": 'MR'
			}
		}
		this.router.navigate(["/ordermanagement/raise-ticket-form"], navigationExtras);
	}
}
