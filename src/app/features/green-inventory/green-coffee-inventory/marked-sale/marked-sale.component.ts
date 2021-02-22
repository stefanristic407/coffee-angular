import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PrimeTableService } from 'src/services/prime-table.service';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-marked-sale',
    templateUrl: './marked-sale.component.html',
    styleUrls: ['./marked-sale.component.scss'],
})
export class MarkedSaleComponent implements OnInit {
    termStatus: any;
    display: any;
    termOrigin: any;
    appLanguage?: any;
    mainData: any[] = [];
    roasterID: string;
    deleteId: any;
    popupDisplay = false;
    sellerItems = [
        { label: 'All origins', value: null },
        { label: 'Sweden', value: 'SE' },
        { label: 'UK', value: 'UK' },
        { label: 'India', value: 'IN' },
    ];
    statusItems = [
        { label: 'All', value: null },
        { label: 'In stock', value: 'IN_STOCK' },
        { label: 'Hidden', value: 'HIDDEN' },
        { label: 'Sold', value: 'SOLD' },
    ];
    displayItems = [
        { label: 'All', value: '' },
        { label: 'Display 10', value: 10 },
        { label: 'Display 20', value: 20 },
        { label: 'Display 25', value: 25 },
        { label: 'Display 50', value: 50 },
    ];
    @Input('form')
    set form(value: FormGroup) {
        this._form = value;
    }

    get form() {
        return this._form;
    }
    constructor(
        public globals: GlobalsService,
        public roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        public primeTableService: PrimeTableService,
        private toastrService: ToastrService,
    ) {
        this.termStatus = { name: 'All', statusCode: '' };
        this.display = '10';
        this.roasterID = this.cookieService.get('roaster_id');
        this.primeTableService.rows = 10;
        this.primeTableService.sortBy = 'created_at';
    }

    // tslint:disable: variable-name
    public _form: FormGroup;

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
                    field: 'status',
                    header: 'Status',
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
                    field: 'estate_name',
                    header: 'Estate Name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'origin',
                    header: 'Origin',
                    sortable: false,
                    width: 50,
                },
            ];
        } else {
            this.primeTableService.isMobileView = false;
            this.primeTableService.allColumns = [
                {
                    field: 'product_name',
                    header: 'Product Name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'estate_name',
                    header: 'Estate Name',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'origin',
                    header: 'Origin',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'varieties',
                    header: 'Variety',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'quantity',
                    header: 'Availability',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'cup_score',
                    header: 'Cup score',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'status',
                    header: 'Status',
                    sortable: false,
                    width: 50,
                },
                {
                    field: 'actions',
                    header: 'Actions',
                    sortable: false,
                    width: 50,
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
        this.popupDisplay = true;
        this.deleteId = item.order_id;
    }
    ngOnInit(): void {
        this.primeTableService.url = `/ro/${this.roasterID}/marked-sale-coffees`;

        this.initializeTable();

        this.primeTableService.form = this.form;

        this.primeTableService.form?.valueChanges.subscribe((data) =>
            setTimeout(() => {
                this.table.reset();
            }, 100),
        );
        this.appLanguage = this.globals.languageJson;
    }
    setStatus() {
        this.primeTableService.form?.patchValue({
            status: this.termStatus,
        });
        this.table.reset();
    }
    setOrigin() {
        this.primeTableService.form?.patchValue({
            origin: this.termOrigin,
        });
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
        link = [`/features/green-coffee-for-sale-details/${item.order_id}`];
        return link;
    }
    deleteProductFromList(deleteId) {
        this.roasterService.deleteProcuredCoffee(this.roasterID, deleteId).subscribe(
            (response) => {
                if (response && response.success) {
                    this.toastrService.success('Product deleted successfully');
                    this.popupDisplay = true;
                }
            },
            (err) => {
                this.toastrService.error('Error while deleting the ');
                console.log(err);
            },
        );
    }
}
