import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { GlobalsService, RoasterserviceService } from '@services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    statusFilter;
    originFilter;
    priceFilter;
    termSearch = '';
    showPrice = false;
    tableColumns = [];
    tableValue = [];
    totalCount = 0;
    selectedProducts = [];
    deleteProductID = '';
    modalRef: BsModalRef;
    roasterID: any = '';
    originArray: any = [];
    priceRangeArray: any = [];
    statusArray: any = [];
    searchForm: FormGroup;
    popupDisplay = false;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public modalService: BsModalService,
        public globals: GlobalsService,
        public sharedService: SharedServiceService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        this.roasterID = this.cookieService.get('roaster_id');
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.searchForm = this.fb.group({
            searchField: new FormControl({ value: '' }, Validators.compose([Validators.required])),
        });
        this.searchForm.setValue({ searchField: '' });
        this.searchForm.controls.searchField.valueChanges.subscribe((value) => {
            this.termSearch = value;
            this.getTableData();
        });

        this.loadFilterValues();
        this.tableColumns = [
            {
                field: 'name',
                header: 'Product Name',
                sortable: false,
                width: 15,
            },
            {
                field: 'origin',
                header: 'Origin',
                sortable: false,
                width: 10,
            },
            {
                field: 'estate_name',
                header: 'Estate Name',
                width: 15,
            },
            {
                field: 'roast_level',
                header: 'Roast Level',
                sortable: false,
                width: 10,
            },
            {
                field: 'weight',
                header: 'Weight',
                sortable: false,
                width: 10,
            },
            {
                field: 'status',
                header: 'Status',
                sortable: false,
                width: 10,
            },
            {
                field: 'price',
                header: 'Price',
                sortable: false,
                width: 10,
            },
            {
                field: 'actions',
                header: 'Actions',
                sortable: false,
                width: 15,
            },
        ];
        this.supplyBreadCrumb();
    }
    loadFilterValues() {
        this.originArray = this.globals.countryList;
        this.priceRangeArray = [
            { label: '$0-$500', value: { price_min: '0', price_max: '500' } },
            { label: '$500-$1000', value: { price_min: '500', price_max: '1000' } },
        ];
        this.statusArray = [
            { label: 'In Stock', value: 'IN-STOCK' },
            { label: 'Sold', value: 'OUT-OF-STOCK' },
        ];
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.products,
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
    }
    getTableData(event?) {
        const postData: any = {};
        postData.origin = this.originFilter ? this.originFilter : '';
        if (this.priceFilter) {
            postData.price_min = this.priceFilter.price_min;
            postData.price_max = this.priceFilter.price_max;
        }
        postData.status = this.statusFilter ? this.statusFilter : '';
        postData.name = this.termSearch ? this.termSearch : '';
        postData.per_page = 100;
        this.tableValue = [];
        this.roasterService.getSelectProductDetails(this.roasterID, postData).subscribe(
            (data: any) => {
                if (data.success) {
                    this.tableValue = data.result;
                } else {
                    this.toastrService.error('Error while getting the agreement list!');
                }
            },
            (err) => {
                this.toastrService.error('Error while getting the agreement list!');
            },
        );
    }
    filterCall() {
        this.getTableData();
    }
    deleteproduct(): void {
        this.roasterService.deleteProductDetails(this.roasterID, this.deleteProductID).subscribe(
            (res) => {
                if (res.success) {
                    this.toastrService.success('Product deleted successfully');
                    this.getTableData();
                } else {
                    this.toastrService.error('Error while deleting the product');
                }
                this.popupDisplay = false;
            },
            (err) => {
                this.popupDisplay = false;
                this.toastrService.error('Error while deleting the product');
            },
        );
    }
    openDeleteModal(deleteId: any) {
        this.popupDisplay = true;
        this.deleteProductID = deleteId;
    }
}
