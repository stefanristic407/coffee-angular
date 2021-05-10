import { Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GlobalsService, PrimeTableService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { COUNTRY_LIST } from '@constants';
import { FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-outtake-orders',
    templateUrl: './outtake-orders.component.html',
    styleUrls: ['./outtake-orders.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class OuttakeOrdersComponent implements OnInit {
    searchTerm;
    breadItems = [
        { label: 'Home', routerLink: '/dashboard' },
        { label: 'Order Management', routerLink: '/dashboard' },
        { label: 'Outtake Order' },
    ];
    appLanguage?: any;
    originArray: any = [];
    roasterId: any;
    displayItems = [
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    forms: FormGroup;
    termStatus: any;
    termOrigin: any;
    display: number;
    @Input('form')
    set form(value: FormGroup) {
        this.forms = value;
    }

    get form() {
        return this.forms;
    }

    constructor(
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
        public globals: GlobalsService,
        public primeTableService: PrimeTableService,
        private toastrService: ToastrService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
    }

    @ViewChild('markedTable', { static: true }) table: Table;
    public isMobile = false;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    initializeTable() {
        this.primeTableService.windowWidth = window.innerWidth;

        if (this.primeTableService.windowWidth <= this.primeTableService.responsiveStartsAt) {
            this.primeTableService.isMobileView = true;
            this.primeTableService.allColumns = [
                {
                    field: 'order_id',
                    header: 'Order Id',
                    sortable: false,
                    width: 40,
                },
                {
                    field: 'product_name',
                    header: 'Product Name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'customer_name',
                    header: 'Customer Name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'type_of_customer',
                    header: 'Type of Customer',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'gc_odrer_id',
                    header: 'GC odrer ID',
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'date_placed',
                    header: 'Date Placed',
                    sortable: false,
                    width: 80,
                },
            ];
        } else {
            this.primeTableService.isMobileView = false;
            this.primeTableService.allColumns = [
                {
                    field: 'order_id',
                    header: 'Order ID',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'product_name',
                    header: 'Product Name',
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'customer_name',
                    header: 'Customer Name',
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'type_of_customer',
                    header: 'Type of Customer',
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'gc_odrer_id',
                    header: 'GC odrer ID',
                    sortable: false,
                    width: 80,
                },
                {
                    field: 'date_placed',
                    header: 'Date Placed',
                    sortable: false,
                    width: 60,
                },
                {
                    field: 'price',
                    header: 'Price',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: 'Quantity',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'actions',
                    header: 'Actions',
                    sortable: false,
                    width: 40,
                },
                {
                    field: 'options',
                    header: '',
                    sortable: false,
                    width: 30,
                },
            ];
        }
    }
    openModal(item) {
        // this.popupDisplay = true;
        // this.deleteId = item.order_id;
    }

    ngOnInit(): void {
        this.primeTableService.isMarkedForSale = false;
        this.primeTableService.url = `/ro/${this.roasterId}/outtake-orders`;

        this.initializeTable();
        this.originArray = COUNTRY_LIST;
        this.primeTableService.form = this.form;

        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );

        this.appLanguage = this.globals.languageJson;
    }
    setStatus() {
        this.primeTableService.status = this.termStatus;
        this.table.reset();
    }
    setOrigin() {
        this.primeTableService.origin = this.termOrigin;
        this.table.reset();
    }
    search(item) {
        this.primeTableService.searchQuery = item;
        this.table.reset();
    }
    setDisplay() {
        if (this.display) {
            this.primeTableService.rows = this.display;
        } else {
            this.primeTableService.rows = 10;
        }

        this.table.reset();
    }
    onEdit(item) {
        let link = [];
        link = [`/outtake-orders/view-order/${item.id}`];
        return link;
    }
    edit(item) {
        let link = [];
        link = [`/outtake-orders/edit-order/${item.id}`];
        return link;
    }
    onGreenCoffee(item) {
        let link = [];
        link = [`/green-coffee-management/procured-coffee/${item.order_id}`];
        return link;
    }
    formatStatus(stringVal) {
        let formatVal = '';
        if (stringVal) {
            formatVal = stringVal.toLowerCase().charAt(0).toUpperCase() + stringVal.slice(1).toLowerCase();
            formatVal = formatVal.replace('_', ' ');
        }
        return formatVal.replace('-', '');
    }
    deleteProductFromList(deleteId) {
        this.roasterService.deleteOuttakeOrders(this.roasterId, deleteId).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toastrService.success('Product deleted successfully');
                }
            },
            (err) => {
                this.toastrService.error('Error while deleting the order');
            },
        );
    }
}
