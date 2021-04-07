import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { RoasterserviceService } from '@services';
import { GlobalsService } from '@services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { ConfirmComponent } from '@shared';
import { COUNTRY_LIST } from '@constants';

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
    paginationValue = false;
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
    disableAction = false;
    perPage = 10;
    pageNumber = 1;
    rows = 10;
    originDataFilter: any[] = [];

    constructor(
        public dialogSrv: DialogService,
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
            {
                field: '',
                header: '',
                sortable: false,
                width: 5,
            },
        ];
        this.supplyBreadCrumb();
    }
    loadFilterValues() {
        this.originArray = COUNTRY_LIST;
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
            label: 'Inventory',
        };
        const obj3: MenuItem = {
            label: 'E-commerce catalog management',
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
    }

    getTableDataPaginate(event) {
        const currentPage = event.first / this.rows;
        this.pageNumber = currentPage + 1;
        this.getTableData();
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
        postData.per_page = this.perPage;
        postData.page = this.pageNumber;
        this.tableValue = [];
        this.roasterService.getSelectProductDetails(this.roasterID, postData).subscribe(
            (data: any) => {
                if (data.success) {
                    if (data.result && data.result.length) {
                        this.setOriginData(data.result);
                    }
                    this.tableValue = data.result;
                    this.totalCount = data.result_info.total_count;
                    this.rows = data.result_info.per_page;
                    if (this.totalCount > 10) {
                        this.paginationValue = true;
                    } else {
                        this.paginationValue = false;
                    }
                } else {
                    this.toastrService.error('Error while getting the agreement list!');
                }
            },
            (err) => {
                this.toastrService.error('Error while getting the agreement list!');
            },
        );
    }
    setOriginData(data: any) {
        const temp = [];
        this.originArray.map((item) => {
            data.map((itemj) => {
                if (item.isoCode === itemj.origin) {
                    temp.push(item);
                }
            });
        });
        this.originDataFilter = this.removeDuplicateData(temp);
    }

    removeDuplicateData(data) {
        return [...new Set(data)];
    }
    filterCall() {
        this.getTableData();
    }
    deleteproduct(deleteId): void {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.deleteProductDetails(this.roasterID, deleteId).subscribe(
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
            });
    }
    redirectToEdit(item) {
        if (!this.disableAction) {
            this.router.navigate(['/features/new-product/', item.id]);
        }
    }
    menuClicked() {
        // Stop propagation
        this.disableAction = true;
        setTimeout(() => {
            this.disableAction = false;
        }, 100);
    }
}
