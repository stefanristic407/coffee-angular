import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { GlobalsService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-estate-orders-table',
  templateUrl: './estate-orders-table.component.html',
  styleUrls: ['./estate-orders-table.component.scss']
})
export class EstateOrdersTableComponent implements OnInit {
  showStatus = true;
  showDisplay = true;
  appLanguage?: any;
  filterDisplay = '';
  rangeDates: any;
  searchQuery = '';
  pageNumber = 1;
  loading?: boolean;
  items = [
    { label: 'Home', routerLink: '/features/welcome-aboard' },
    { label: 'Farm link' },
    { label: 'The Coffee Experience' },
  ];
  displayItems = [
    { label: 'All', value: '' },
    { label: 'Display 10', value: 10 },
    { label: 'Display 20', value: 20 },
    { label: 'Display 25', value: 25 },
    { label: 'Display 50', value: 50 },
  ];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  showDateRange: any;
  @ViewChild('calendar') calendar: any;
  mainData: any[] = [];
  mrData: any[] = [];
  roasterId: any;
  tableColumns: any[];

  constructor(
      public globals: GlobalsService,
      // private roasterService: RoasterserviceService,
      public cookieService: CookieService,
      public toastrService: ToastrService,
  ) {
    this.roasterId = this.cookieService.get('micro_roaster_id');
  }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
    this.getOrdersData();
    this.tableColumns = [
      {
        field: 'id',
        header: 'Order ID',
        sortable: false,
      },
      {
        field: 'estate_name',
        header: 'Estate name',
        sortable: false,
      },
      {
        field: 'origin',
        header: 'Origin',
        sortable: false,
      },
      {
        field: 'created_at',
        header: 'Date ordered',
        sortable: false,
      },
      {
        field: 'date_received',
        header: 'Date received',
        sortable: false,
      },
      {
        field: 'varieties',
        header: 'Variety',
        sortable: false,
      },
      {
        field: 'quantity',
        header: 'Quantity',
        sortable: false,
      },
      {
        field: 'cup_score',
        header: 'Cupping score',
        sortable: false,
      },
      {
        field: '',
        header: 'Action',
        sortable: false,
      },
    ];
  }

  getOrdersData() {
    this.loading = true;
    let queryParams;
    queryParams = `?status=RECEIVED&order_type=GC_ORDER&page=${this.pageNumber}&per_page=${this.filterDisplay}`;
    if (this.searchQuery) {
      queryParams += `&search_query=${this.searchQuery}`;
    }
    if (this.rangeDates && this.rangeDates.length) {
      queryParams += `&start_date=${formatDate(this.rangeDates[0], 'yyyy-MM-dd', 'en-US')}`;
      queryParams += `&end_date=${formatDate(this.rangeDates[1], 'yyyy-MM-dd', 'en-US')}`;
    }
    // this.roasterService.getMrOrders(this.roasterId, queryParams).subscribe((data: any) => {
    //   this.loading = false;
    //   if (data.success) {
    //     this.mrData = data.result || [];
    //   } else {
    //     this.toastrService.error(this.globals.languageJson.error_message);
    //   }
    // });
  }

  filterDate() {
    if (this.rangeDates[0] && this.rangeDates[1]) {
      this.getOrdersData();
    }
  }

  onChangeSearchQuery(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.getOrdersData();
    }
  }
}
