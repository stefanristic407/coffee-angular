import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { DashboardserviceService, GlobalsService, RoasterserviceService } from '@services';
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
    showStatus = false;
    showOrigin = false;
    statusFilter = '';
    originFilter = '';
    termSearch = '';
    showPrice = false;
    priceFilter = '';
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

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public dashboard: DashboardserviceService,
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
        this.searchForm.controls['searchField'].valueChanges.subscribe((value) => {
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
            { label: '$0-$500', price_min: '0', price_max: '500' },
            { label: '$500-$1000', price_min: '500', price_max: '1000' },
        ];
        this.statusArray = [
            { label: 'In Stock', value: 'IN-STOCK' },
            { label: 'Sold', value: 'OUT-OF-STOCK' },
        ];
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/features/welcome-aboard',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.products,
            disabled: true,
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
    }
    getTableData(event?) {
        const postData = {};
        postData['origin'] = this.originFilter ? this.originFilter : '';
        if (this.priceFilter) {
            const priceRange = this.priceRangeArray.find((ele) => ele['label'] == this.priceFilter);
            postData['price_min'] = priceRange && priceRange['price_min'] ? priceRange['price_min'] : '';
            postData['price_max'] = priceRange && priceRange['price_max'] ? priceRange['price_max'] : '';
        }
        if (this.statusFilter) {
            const statusValue = this.statusArray.find((ele) => ele['label'] == this.statusFilter);
            postData['status'] = statusValue && statusValue['value'] ? statusValue['value'] : undefined;
        }
        postData['name'] = this.termSearch ? this.termSearch : '';
        // eslint-disable-next-line no-constant-condition
        postData['per_page'] = 100;
        this.roasterService.getSelectProductDetails(this.roasterID, postData).subscribe(
            (data) => {
                this.tableValue = [];
                if (data['success']) {
                    this.tableValue = data['result'];
                } else {
                    this.toastrService.error('Error while getting the agreement list!');
                }
            },
            (err) => {
                this.toastrService.error('Error while getting the agreement list!');
            },
        );
    }
    setType(priceRange): void {
        this.priceFilter = priceRange && priceRange['label'] ? priceRange['label'] : '';
        this.getTableData();
    }
    setOrigin(origin): void {
        this.originFilter = origin && origin['name'] ? origin['name'] : '';
        this.getTableData();
    }
    setStatus(status): void {
        this.statusFilter = status && status['label'] ? status['label'] : '';
        this.getTableData();
    }
    deleteproduct(): void {
        this.roasterService.deleteProductDetails(this.roasterID, this.deleteProductID).subscribe((res) => {
            if (res.success) {
                this.toastrService.success('Product deleted successfully');
                this.getTableData();
            }
        });
    }
    openDeleteModal(template1: TemplateRef<any>, deleteId: any) {
        this.modalRef = this.modalService.show(template1);
        this.deleteProductID = deleteId;
    }
}
