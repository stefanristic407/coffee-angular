// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Estate Orders List,Search and Filters.
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
    selector: 'app-estate-orders',
    templateUrl: './estate-orders.component.html',
    styleUrls: ['./estate-orders.component.css'],
})
export class EstateOrdersComponent implements OnInit {
    date3: Date;
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
        language: { search: '' },
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
    estatetermStatusText: any;
    displayNumbersText: any;
    estatetermTypeText: any;
    filterOrigin: any = [];

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public dashboard: DashboardserviceService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public modalService: BsModalService,
        public globals: GlobalsService,
        public profileservice: RoasteryProfileService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        // this.data = {};
        // this.data =
        // 	[{
        // 		"id": "1000",
        // 		"estatename": "Finca La Pampa",
        // 		"dataordered": "24 Jan 2020",
        // 		"origin": "Colombia",
        // 		"quantity": "-",
        // 		"typeoforder": "Sample",
        // 		"status": "Shipped",
        // 		"species": "Bourbon",
        // 		"price": "-"
        // 	},
        // 	{ id: '1001', estatename: 'Gesha', dataordered: '21 Jan 2020', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Booked', status: 'Shipped', species: 'Bourbon', price: '-' },
        // 	{ id: '1002', estatename: 'Finca La Toboba', dataordered: '22 Apr 2020', origin: 'Ethopia', quantity: '29kg', typeoforder: 'Booked', status: 'Order confirmed', species: 'Bourbon', price: '$1,480' },
        // 	{ id: '1003', estatename: 'Asoproaaa', dataordered: '24 Apr 2020', origin: 'Ethopia', quantity: '-', typeoforder: 'Booked', status: 'Order confirmed', species: 'Bourbon', price: '$2600' },
        // 	{ id: '1004', estatename: 'Cafe Directo', dataordered: '25 May 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Payment', species: 'Bourbon', price: '$1,480' },
        // 	{ id: '1005', estatename: 'La Isabela', dataordered: '26 May 2020', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'In transit', species: 'Bourbon', price: '$840' },
        // 	{ id: '1006', estatename: 'La Isabela', dataordered: '13 Oct 2020', origin: 'Colombia', quantity: '397kg', typeoforder: 'Sample', status: 'Order confirmed', species: 'Bourbon', price: '-' },
        // 	{ id: '1007', estatename: 'Cafe Directo', dataordered: '13 Dec 2020', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Sample', status: 'Shipped', species: 'Bourbon', price: '-' },
        // 	{ id: '1008', estatename: 'Asoproaaa', dataordered: '13 Jan 2019', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Harvest Ready', species: 'Bourbon', price: '$500' },
        // 	{ id: '1009', estatename: 'Finca La Toboba', dataordered: '14 Feb 2019', origin: 'Colombia', quantity: '-', typeoforder: 'Pre-Booked', status: 'Payment', species: 'Bourbon', price: '$3,200' },
        // 	{ id: '1010', estatename: 'Gesha', dataordered: '14 Jun 2019', origin: 'Ethopia', quantity: '297kg', typeoforder: 'Pre-Booked', status: 'In transit', species: 'Bourbon', price: '$1900' },
        // 	{ id: '1011', estatename: 'Finca La Pampa', dataordered: '13 Jul 2019', origin: 'Ethopia', quantity: '197kg', typeoforder: 'Booked', status: 'Order confirmed', species: 'Bourbon', price: '$2,377' },
        // 	{ id: '1012', estatename: 'Finca La Pampa', dataordered: '13 Mar 2018', origin: 'Colombia', quantity: '257kg', typeoforder: 'Booked', status: 'Cancelled', species: 'Bourbon', price: '$3000' },
        // 	{ id: '1013', estatename: 'Gesha', dataordered: '13 May 2018', origin: 'Colombia', quantity: '277kg', typeoforder: 'Booked', status: 'Received', species: 'Bourbon', price: '$2,377' },
        // 	{ id: '1014', estatename: 'Finca La Toboba', dataordered: '17 Aug 2018', origin: 'Ethopia', quantity: '-', typeoforder: 'Booked', status: 'Cancelled', species: 'Bourbon', price: '$6,560' },
        // 	{ id: '1015', estatename: 'Asoproaaa', dataordered: '13 Oct 2018', origin: 'Ethopia', quantity: '-', typeoforder: 'Sample', status: 'Received', species: 'Bourbon', price: '-' },
        // 	{ id: '1016', estatename: 'Finca La Toboba', dataordered: '19 Oct 2018', origin: 'Colombia', quantity: '297kg', typeoforder: 'Sample', status: 'Payment', species: 'Bourbon', price: '-' },
        // 	{ id: '1017', estatename: 'Finca La Pampa', dataordered: '23 Nov 2018', origin: 'Colombia', quantity: '-', typeoforder: 'Booked', status: 'Cancelled', species: 'Bourbon', price: '$3,200' },
        // 	];
        this.mainData = this.data;
    }

    ngOnInit(): void {
        this.getEstateOrdersData();
        //Auth checking
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        // this.appLanguage = this.globals.languageJson;
        this.language();

        this.estatetermStatus = '';
        this.estatetermOrigin = '';
        this.estatetermType = '';
        this.displayNumbers = '';
        this.estatetermOriginMob = '';
        this.estatetermStatusMob = '';
        this.estatetermTypeMob = '';

        /* pagination start */
        let listCount = 0;
        let elLen;
        let newliLen;

        $(document).ready(function () {
            var pLen = $('.pagination-content').length;
            console.log(pLen);
            for (var x = 0; x < pLen; x++) {
                var elements = $('.pagination-content')
                    .eq(x)
                    .find('.pagination-content-list .pagination-content-list__item');
                var index = 0;
                elLen = elements.length;
                newliLen = Math.floor(elLen / 4) + 1;
                var showNextFour = function (index) {
                    if (index >= elements.length) {
                        index = 0;
                    }

                    elements
                        .hide()
                        .slice(index, index + 4)
                        .show();
                };
                showNextFour(listCount);

                // $('.responsive-pagination-list')
                if (newliLen > 5) {
                    for (var i = 1; i <= 5; i++) {
                        var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
                        $('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
                        $('.pagination-content')
                            .eq(x)
                            .find('.responsive-pagination-list')
                            .find('.responsive-pagination-list__item:first-child')
                            .addClass('active');
                    }
                } else {
                    for (var i = 1; i <= newliLen; i++) {
                        var li = '<li class="responsive-pagination-list__item">' + i + '</li>';
                        $('.pagination-content').eq(x).find('.responsive-pagination-list').append(li);
                        $('.pagination-content')
                            .eq(x)
                            .find('.responsive-pagination-list')
                            .find('.responsive-pagination-list__item:first-child')
                            .addClass('active');
                    }
                }
            }
        });

        //Next page
        $('body').on('click', '.responsive-pagination__next', function () {
            var step = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item.active');
            var steps = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item');
            var stepNext = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item.active')
                .next('.responsive-pagination-list__item');
            var stepLastVal = parseInt(
                $(this)
                    .parents('.responsive-pagination')
                    .find('.responsive-pagination-list')
                    .find('.responsive-pagination-list__item:last-child')
                    .text(),
            );
            $(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
            var pageNew = parseInt($('.page-new').text());
            var pagefind = stepLastVal - pageNew;

            var elements = $(this)
                .parents('.pagination-content')
                .find('.pagination-content-list .pagination-content-list__item');
            elLen = elements.length;
            newliLen = Math.floor(elLen / 4) + 1;
            var index = 0;
            var showNextFour = function (index) {
                if (index >= elements.length) {
                    index = 0;
                }

                elements
                    .hide()
                    .slice(index, index + 4)
                    .show();
            };

            listCount = listCount + 4;
            showNextFour(listCount);

            var stepValue = stepNext.text();
            if (stepLastVal < newliLen) {
                stepNext.removeClass('active');
                stepNext.prev('.responsive-pagination-list__item').addClass('active');

                if (newliLen > 5) {
                    for (var i = 0; i <= 4; i++) {
                        var newStep = parseInt(steps.eq(i).text());

                        if (pageNew == stepLastVal - 1) {
                            return false;
                        } else {
                            steps.eq(i).text(newStep + 1);
                        }
                    }
                } else {
                    for (var i = 0; i <= newliLen; i++) {
                        var newStep = parseInt(steps.eq(i).text());

                        if (pageNew == stepLastVal - 1) {
                            return false;
                        } else {
                            steps.eq(i).text(newStep + 1);
                        }
                    }
                }
            } else {
                step.removeClass('active');
                stepNext.addClass('active');

                if (stepNext.is(':last-child')) {
                    $(this).addClass('disable');
                }
            }
        });

        //Prev page
        $('body').on('click', '.responsive-pagination__prev', function () {
            var step = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item.active:last');
            var steps = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item');
            var stepPrev = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item.active')
                .prev('.responsive-pagination-list__item');
            var stepFirst = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item:first-child');
            var stepLastVal = parseInt(
                $(this)
                    .parents('.responsive-pagination')
                    .find('.responsive-pagination-list')
                    .find('.responsive-pagination-list__item:last-child')
                    .text(),
            );
            var activeFirst = $(this)
                .parents('.responsive-pagination')
                .find('.responsive-pagination-list')
                .find('.responsive-pagination-list__item:first-child')
                .hasClass('active');

            listCount = listCount - 4;

            var elements = $(this)
                .parents('.pagination-content')
                .find('.pagination-content-list .pagination-content-list__item');
            elLen = elements.length;
            newliLen = Math.floor(elLen / 4) + 1;
            var index = 0;
            var showNextFour = function (index) {
                if (index >= elements.length) {
                    index = 0;
                }

                elements
                    .hide()
                    .slice(index, index + 4)
                    .show();
            };

            showNextFour(listCount);

            if (newliLen > 5) {
                for (var i = 0; i <= 4; i++) {
                    var newStep = parseInt(steps.eq(i).text());

                    if (stepLastVal <= 5) {
                        stepPrev.addClass('active');
                        step.removeClass('active');
                    } else {
                        steps.eq(i).text(newStep - 1);
                    }
                }
            } else {
                for (var i = 0; i <= newliLen; i++) {
                    var newStep = parseInt(steps.eq(i).text());

                    if (stepLastVal <= newliLen) {
                        stepPrev.addClass('active');
                        step.removeClass('active');
                    } else {
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
            $(this)
                .parents('.pagination-content')
                .find('.responsive-pagination-list__item')
                .not(this)
                .removeClass('active');
            $(this).addClass('active');
            var liStep = parseInt($(this).text());
            listCount = 4;
            if (liStep == 1) {
                $(this).parents('.pagination-content').find('.responsive-pagination__prev').addClass('disable');
                $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
                liStep = 0;
                listCount = 0;
                console.log(listCount);

                var elements = $(this)
                    .parents('.pagination-content')
                    .find('.pagination-content-list .pagination-content-list__item');
                elLen = elements.length;
                newliLen = Math.floor(elLen / 4) + 1;
                var index = 0;
                var showNextFour = function (index) {
                    if (index >= elements.length) {
                        index = 0;
                    }

                    elements
                        .hide()
                        .slice(index, index + 4)
                        .show();
                };

                showNextFour(listCount);
            } else {
                $(this).parents('.pagination-content').find('.responsive-pagination__prev').removeClass('disable');
                $(this).parents('.pagination-content').find('.responsive-pagination__next').removeClass('disable');
                listCount = liStep * listCount - 4;
                console.log(listCount);

                var elements = $(this)
                    .parents('.pagination-content')
                    .find('.pagination-content-list .pagination-content-list__item');
                elLen = elements.length;
                newliLen = Math.floor(elLen / 4) + 1;
                var index = 0;
                var showNextFour = function (index) {
                    if (index >= elements.length) {
                        index = 0;
                    }

                    elements
                        .hide()
                        .slice(index, index + 4)
                        .show();
                };

                showNextFour(listCount);
            }

            if (liStep == newliLen) {
                $(this).parents('.pagination-content').find('.responsive-pagination__next').addClass('disable');
            }
        });
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.estateOrdersActive++;
    }

    // setStatus(term: any) {
    // 	this.estatetermStatus = term;
    // 	this.datatableElement.dtInstance.then(table => {
    // 		table.column(9).search(this.estatetermStatus).draw();
    // 	});
    // }

    // setOrigin(origindata: any) {
    // 	this.estatetermOrigin = origindata;
    // 	this.datatableElement.dtInstance.then(table => {
    // 		table.column(4).search(origindata).draw();
    // 	});
    // }
    setOriginMob(term: any) {
        this.estatetermOriginMob = term;
    }
    setTypeMob(term: any) {
        this.estatetermTypeMob = term;
    }
    setStatusMob(term: any) {
        this.estatetermStatusMob = term;
    }

    // setType(data: any) {
    // 	this.estatetermType = data;
    // 	this.datatableElement.dtInstance.then(table => {
    // 		table.column(8).search(data).draw();
    // 	});
    // }
    // setDisplay(data: any) {
    // 	this.displayNumbers = data;
    // 	$("select").val(data).trigger('change');

    // }

    openCalendar(event: any) {
        this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    }

    toggleOrigin() {
        this.showOrigin = !this.showOrigin;
        if (this.showOrigin == false) {
            document.getElementById('origin_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('origin_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleOriginMob() {
        this.showOriginMob = !this.showOriginMob;
        if (this.showOriginMob == false) {
            document.getElementById('OrginMob-id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('OrginMob-id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleType() {
        this.showType = !this.showType;
        if (this.showType == false) {
            document.getElementById('type_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('type_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleTypeMob() {
        this.showTypeMob = !this.showTypeMob;
        if (this.showTypeMob == false) {
            document.getElementById('type_id_Mob').style.border = '1px solid #30855c';
        } else {
            document.getElementById('type_id_Mob').style.border = '1px solid #d6d6d6';
        }
    }
    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }
    toggleStatusMob() {
        this.showStatusMob = !this.showStatusMob;
        if (this.showStatusMob == false) {
            document.getElementById('status_id_Mob').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id_Mob').style.border = '1px solid #d6d6d6';
        }
    }
    toggleDisplay() {
        this.showDisplay = !this.showDisplay;
        if (this.showDisplay == false) {
            document.getElementById('display_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('display_id').style.border = '1px solid #d6d6d6';
        }
    }

    displayData($event, group) {
        console.log('the incoming data  are ' + group.type + '...' + group.status);

        if (group.status == 'RECEIVED') {
            this.globals.ord_received_date = group.date_received;
        }
        let navigationExtras: NavigationExtras = {
            queryParams: {
                data: encodeURIComponent(group.status),
                id: encodeURIComponent(group.id),
            },
        };
        if (group.type == 'GC_ORDER') {
            this.router.navigate(['/ordermanagement/order-booked'], navigationExtras);
        } else if (group.type == 'GC_ORDER_SAMPLE') {
            this.router.navigate(['/ordermanagement/order-sample'], navigationExtras);
        } else if (group.type == 'PREBOOK_LOT') {
            this.router.navigate(['/ordermanagement/order-prebook'], navigationExtras);
        }
    }
    getEstateOrdersData() {
        this.roasterService.getEstateOrders(this.roasterId).subscribe((data) => {
            console.log(data);
            if (data['success'] == true) {
                // if (data['result'] == null || data['result'].length == 0) {
                // 	this.hideTable = true ;
                // }
                // else {
                // 	this.hideTable = false;
                this.data = data['result'];
                // }
                // this.estateOrdersActive++;
            } else {
                // this.estateOrdersActive++;
                this.toastrService.error(this.globals.languageJson.error_message);
            }
        });
    }
    //  Function Name : Check box function.
    //  Description   : This function helps to Check all the rows of the Users list.
    checkAllEstate(ev) {
        if (ev) {
            this.data.forEach((x) => (x.state = ev.target.checked));
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
            this.countryValue = this.profileservice.countryList.find((con) => con.isoCode == data.toUpperCase());
            if (this.countryValue) {
                return this.countryValue.name;
            }
        }
    }
    setFilterValue(name: any, value: any, display: any) {
        const filterParams = [];
        switch (name) {
            case 'status':
                this.estatetermStatus = value;
                this.estatetermStatusText = display;
                console.log(this.estatetermStatus);
                break;
            case 'display':
                this.displayNumbers = value;
                this.displayNumbersText = display;
                console.log(this.displayNumbers);
                break;
            case 'type':
                this.estatetermType = value;
                this.estatetermTypeText = display;
                console.log(this.estatetermType);
                break;
        }

        if (this.estatetermStatus) {
            filterParams.push(`status=${this.estatetermStatus}`);
        }
        if (this.displayNumbers) {
            filterParams.push(`per_page=${this.displayNumbers}`);
        }
        if (this.estatetermType) {
            filterParams.push(`order_type=${this.estatetermType}`);
        }
        if (this.filterOrigin.length) {
            filterParams.push(`origin=${this.filterOrigin}`);
        }
        if (filterParams.length) {
            const queryParams = '?' + filterParams.join('&');
            console.log(queryParams);
            this.roasterService.getEstateOrders(this.roasterId, queryParams).subscribe((data) => {
                console.log(data);
                if (data['success'] == true) {
                    this.data = data['result'];
                } else {
                    this.toastrService.error(this.globals.languageJson.error_message);
                }
            });
        } else {
            this.roasterService.getEstateOrders(this.roasterId).subscribe((data) => {
                console.log(data);
                if (data['success'] == true) {
                    this.data = data['result'];
                } else {
                    this.toastrService.error(this.globals.languageJson.error_message);
                }
            });
        }
    }
    selectOrigin(event, value) {
        if (event.target.checked) {
            if (!this.filterOrigin.includes(value)) {
                this.filterOrigin.push(value);
            }
        } else {
            if (this.filterOrigin.includes(value)) {
                const index = this.filterOrigin.indexOf(value);
                this.filterOrigin.splice(index, 1);
            }
        }
    }
    clearFilter() {
        //   for(let i =0;i < this.filterVariety.length;i++){
        // 	this.filterVariety[i].isChecked = val;
        //   }
        this.filterOrigin = [];
        this.getEstateOrdersData();
    }
}
