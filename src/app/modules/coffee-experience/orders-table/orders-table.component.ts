import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from '@services';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
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
    this.getMrOrdersData();
    this.tableColumns = [
      {
        field: 'id',
        header: 'Order ID',
        sortable: false,
        width: 13,
      },
      {
        field: 'product_name',
        header: 'Product name',
        sortable: false,
        width: 17,
      },
      {
        field: 'created_at',
        header: 'Date Ordered',
        sortable: false,
        width: 15,
      },
      {
        field: 'variety',
        header: 'Variety',
        sortable: false,
        width: 13,
      },
      {
        field: 'quantity',
        header: 'Quantity',
        sortable: false,
        width: 13,
      },
      {
        field: 'cupping_score',
        header: 'Cupping score',
        sortable: false,
        width: 15,
      },
      {
        field: '',
        header: 'Action',
        sortable: false,
        width: 14,
      },
    ];
  }

  getMrOrdersData() {
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
      this.getMrOrdersData();
    }
  }

  onChangeSearchQuery(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.getMrOrdersData();
    }
  }
}
