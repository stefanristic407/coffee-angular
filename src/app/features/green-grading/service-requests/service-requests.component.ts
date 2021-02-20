import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { GenerateReportService } from '../generate-report/generate-report.service';

@Component({
    selector: 'app-service-requests',
    templateUrl: './service-requests.component.html',
    styleUrls: ['./service-requests.component.css'],
})
export class ServiceRequestsComponent implements OnInit {
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

    cuppingReportId: any;

    @ViewChild(DataTableDirective, { static: false })
    datatableElement: DataTableDirective;
    showDateRange: any;
    hideTable: any;

    @ViewChild('calendar')
    calendar: any;
    //dtInstance:DataTables.Api;

    // Static roaster Orders Data List
    public data: any;
    // public mainData: any[];
    title = 'angulardatatables';
    dtOptions: DataTables.Settings = {
        language: { search: '' },
    };
    roasterId: any;
    greendata: any[] = [];
    count: number;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public globals: GlobalsService,
        public generateReportService: GenerateReportService,
        public userService: UserserviceService,
        public roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public generateService: GenerateReportService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        // this.data = {};

        // this.mainData = this.data;
    }

    ngOnInit(): void {
        //Auth checking
        if (this.cookieService.get('Auth') == '') {
            this.router.navigate(['/auth/login']);
        }
        this.viewCuppingInviteList();
        this.appLanguage = this.globals.languageJson;
        this.getEstateOrdersData();
        // var editIcon = function ( data, type, row ) {
        // 	if ( type === 'display' ) {
        // 		return data + ' <span class="tooltiptext">Tooltip text</span>';
        // 	}
        // 	return data;
        // };
        this.dtOptions = {
            //ajax: this.data,
            data: this.data,
            pagingType: 'full_numbers',
            pageLength: 10,
            lengthMenu: [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, 'All'],
            ],
            processing: false,
            autoWidth: false,
            language: {
                search: '',
                emptyTable: this.globals.languageJson.no_table_data,
            },
            columns: [
                // {title: '<input type="checkbox" value="">' , data: null, className: "select-checkbox", defaultContent:'<input type="checkbox" value="">'},
                {
                    title:
                        '<label class="bestate-check "><input type="checkbox"  name="estate_all" [checked]="isAllCheckedRoaster()" (change)="checkAllRoaster($event)"><span class="estatecheckmark"></span></label>',

                    defaultContent:
                        '<label class="bestate-check"><input type="checkbox" name="sizecb[]" value="data.id" [(ngModel)]="data.state"  /><span class="estatecheckmark"></span>',
                },
                {
                    title: this.globals.languageJson.order_id,
                    data: 'id',
                },
                {
                    title: 'Estate name',
                    data: 'productname',
                    className: 'table_ellipsis',
                    render: function (data, type, row) {
                        // if ( type === 'display' ) {
                        return data + '<span class="tooltiptext">' + data + '</span>';
                        // }
                        // return data;
                    },
                },
                {
                    title: 'Ordered by',
                    data: 'orderedby',
                },
                {
                    title: this.globals.languageJson.date_ordered,
                    data: 'created_at',
                },
                {
                    title: this.globals.languageJson.origin,
                    data: 'origin',
                },
                {
                    title: 'Variety',
                    data: 'variety',
                },

                {
                    title: this.globals.languageJson.quantity,
                    data: 'quantity',
                },
                {
                    title: this.globals.languageJson.order_type,
                    data: 'typeOfOrder',
                    className: 'typeoforderclass',
                },
                {
                    title: this.globals.languageJson.status,
                    data: 'status',
                    className: 'status-es',
                },

                {
                    title: this.globals.languageJson.action,
                    defaultContent: 'View order',
                    className: 'view-order',
                },
            ],
            createdRow: (row: Node, data: any, index: number) => {
                const self = this;
                if ($(row).children('td.typeoforderclass').html() == 'Booked') {
                    $(row)
                        .children('td.typeoforderclass')
                        .html('<span class="typeoforder-Booked">&#9679; Booked</span>');
                }
                if ($(row).children('td.typeoforderclass').html() == 'Sample') {
                    $(row)
                        .children('td.typeoforderclass')
                        .html('<span class="typeoforder-Sample">&#9679; Sample</span>');
                }
                //   if($(row).children('td.typeoforderclass').html() == "Pre-Booked"){
                //     $(row).children('td.typeoforderclass').html('<span class="typeoforder-Pre-Booked">&#9679; Pre-Booked</span>');

                //   }
            },
            rowCallback: (row: Node, data: any, index: number) => {
                const self = this;
                $('td', row).click(function () {
                    let navigationExtras: NavigationExtras = {
                        queryParams: {
                            data: encodeURIComponent(data.status),
                        },
                    };
                    if (data.typeOfOrder == 'Booked') {
                        self.router.navigate(['/ordermanagement/mr-booked'], navigationExtras);
                    } else if (data.typeOfOrder == 'Sample') {
                        self.router.navigate(['/ordermanagement/mr-sample'], navigationExtras);
                    }
                    // else if (data.typeoforder == "Pre-Booked") {
                    //   self.router.navigate(["/ordermanagement/order-prebook"], navigationExtras);
                    // }
                });
            },
        };
        this.roastertermStatus = '';
        this.roastertermOrigin = '';
        this.roastertermType = '';
        this.displayNumbers = '10';
        this.estatetermOriginMob = '';
        this.estatetermStatusMob = '';
        this.estatetermTypeMob = '';
        $(document).ready(function () {
            $('.dataTables_length').ready(function () {
                $('.dataTables_length').hide();
                $('.dataTables_info').hide();
            });
            $("input[type='search']").ready(function () {
                // $(".dataTables_filter>label").css("color","#FFF");
                $("input[type='search']").attr('placeholder', 'Search by order id, roaster name');
            });
        });
        //Mobile card selection
        $(document).ready(function () {
            $('.order-raised').click(function () {
                $('li', $('.raised-mobile').parent()).removeClass('highlight');
                $(this).addClass('highlight');
                $('.raised-mobile').addClass('active');
            });
        });
    }

    // API -call cupping invite list

    viewCuppingInviteList() {
        this.userService.getCuppingInviteList(this.roasterId).subscribe((res) => {
            if (res['success'] == true) {
                console.log(res);
                this.greendata = res['result'];
            }
        });
    }

    setStatus(term: any) {
        this.roastertermStatus = term;
        this.datatableElement.dtInstance.then((table) => {
            table.column(9).search(this.roastertermStatus).draw();
        });
    }

    setOrigin(origindata: any) {
        this.roastertermOrigin = origindata;
        this.datatableElement.dtInstance.then((table) => {
            table.column(5).search(origindata).draw();
        });
    }
    setType(data: any) {
        this.roastertermType = data;
        this.datatableElement.dtInstance.then((table) => {
            table.column(8).search(data).draw();
        });
    }
    setDisplay(data: any) {
        this.displayNumbers = data;
        $('select').val(data).trigger('change');
    }

    openCalendar(event: any) {
        this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    }

    filterDate(event: any) {
        if (this.rangeDates[0] != null && this.rangeDates[1] != null) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var fDate = new Date(this.rangeDates[0]);
            var fromDate = JSON.stringify(fDate);
            fromDate = fromDate.slice(1, 11);
            var fSplit = fromDate.split('-');

            var fDateString = fSplit[2] + ' ' + months[parseInt(fSplit[1]) - 1] + ' ' + fSplit[0];
            var tDate = new Date(this.rangeDates[1]);
            var toDate = JSON.stringify(tDate);
            toDate = toDate.slice(1, 11);
            var tSplit = toDate.split('-');
            var tDateString = tSplit[2] + ' ' + months[parseInt(tSplit[1]) - 1] + ' ' + tSplit[0];
            console.log(tDate.getTime());
            console.log(fDate.getTime());
            this.showDateRange = fDateString + ' - ' + tDateString;
            this.calendar.overlayVisible = false;

            $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
                var min = new Date(fDateString).getTime();
                var max = new Date(tDateString).getTime();
                var startDate = new Date(data[3]).getTime();
                console.log(startDate);
                if (min == null && max == null) return true;
                if (min == null && startDate <= max) return true;
                if (max == null && startDate >= min) return true;
                if (startDate <= max && startDate >= min) return true;
                return false;
            });
            this.datatableElement.dtInstance.then((table) => {
                table.draw();
            });
        }
    }
    toggleOrigin() {
        this.showOrigin = !this.showOrigin;
        if (this.showOrigin == false) {
            document.getElementById('origin_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('origin_id').style.border = '1px solid #d6d6d6';
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
    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
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
    getEstateOrdersData() {
        this.roasterService.getMrOrders(this.roasterId).subscribe((data) => {
            console.log(data);
            if (data['success'] == true) {
                // if (data['result'] == null || data['result'].length == 0) {
                // 	// this.hideTable = true ;
                // }
                // else {
                // this.hideTable = false;
                this.data = data['result'];
                // }
                // this.estateOrdersActive++;
            } else {
                // this.estateOrdersActive++;
                this.toastrService.error(this.globals.languageJson.error_message);
            }
        });
    }

    OrderDetails($event, group) {
        // console.log("the incoming data  are " + group.type + "..." + group.status);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                data: encodeURIComponent(group.status),
            },
        };
        if (group.type == 'GC_ORDER') {
            this.router.navigate(['/ordermanagement/mr-booked'], navigationExtras);
        } else if (group.type == 'Sample') {
            this.router.navigate(['/ordermanagement/mr-sample'], navigationExtras);
        }
        // else if (group.typeoforder == "Pre-Booked") {
        //   this.router.navigate(["/ordermanagement/order-prebook"], navigationExtras);
        // }
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
            document.getElementById('OrginMob-id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('OrginMob-id').style.border = '1px solid #d6d6d6';
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
    toggleStatusMob() {
        this.showStatusMob = !this.showStatusMob;
        if (this.showStatusMob == false) {
            document.getElementById('status_id_Mob').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id_Mob').style.border = '1px solid #d6d6d6';
        }
    }
    selectedRow() {
        let getItem = this.greendata.filter((ele) => ele['state'] == true);
        this.count = getItem ? getItem.length : 0;
    }

    generateReportLink() {
        let getItem = this.greendata.filter((ele) => ele['state'] == true);

        if (getItem) {
            this.generateReportService.serviceRequestsList = getItem;
            this.generateReportService.cuppingDetails = getItem[0];

            // this.router.navigate(['/features/generate-report']);

            let navigationExtras: NavigationExtras = {
                queryParams: {
                    from: 'ServiceRequest',
                },
            };

            this.router.navigate(['/features/generate-report'], navigationExtras);
        }
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

    // generateReport(){
    // 	this.router.navigate(["/features/generate-report"]);
    // }
}
