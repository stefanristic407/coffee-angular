import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-roasted-coffee-batches',
    templateUrl: './roasted-coffee-batches.component.html',
    styleUrls: ['./roasted-coffee-batches.component.scss'],
})
export class RoastedCoffeeBatchesComponent implements OnInit {
    appLanguage?: any;
    roasterId: string;
    batchId: string | number | boolean;
    deleteBatchId: '';
    searchForm: FormGroup;
    profileArray: any = [];
    profileFilter;
    tableColumns = [];
    tableValue = [];
    totalCount = 0;
    termSearch = '';
    selectedProfiles = [];
    popupDisplay = false;
    breadCrumbItem: MenuItem[] = [];

    ordId: any;
    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public globals: GlobalsService,
        private fb: FormBuilder,
        public sharedService: SharedServiceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.appLanguage = this.globals.languageJson;
        this.searchForm = this.fb.group({
            searchField: new FormControl({ value: '' }, Validators.compose([Validators.required])),
        });
        this.searchForm.setValue({ searchField: '' });
        this.searchForm.controls.searchField.valueChanges.subscribe((value) => {
            this.termSearch = value;
            this.roasterCoffeeBatchsData();
        });
        this.loadFilterValues();
        this.supplyBreadCrumb();
        this.tableColumns = [
            {
                field: 'roast_batch_name',
                header: 'Batch name',
                sortable: false,
                width: 12,
            },
            {
                field: 'order_id',
                header: 'Order ID',
                sortable: false,
                width: 8,
            },
            {
                field: 'estate_name',
                header: 'Estate name',
                width: 15,
            },
            {
                field: 'roaster_ref_no',
                header: 'Roaster Ref. No.',
                sortable: false,
                width: 15,
            },
            {
                field: 'created_at',
                header: 'Created on',
                sortable: false,
                width: 10,
            },
            {
                field: 'roasting_profile_quantity',
                header: 'Quantity',
                sortable: false,
                width: 8,
            },
            {
                field: 'roasting_profile_name',
                header: 'Roasting profile',
                sortable: false,
                width: 15,
            },
            {
                field: 'actions',
                header: 'Actions',
                sortable: false,
                width: 15,
            },
        ];
    }

    loadFilterValues() {
        this.profileArray = [
            { label: 'Light', value: 'Light' },
            { label: 'Light Medium', value: 'Light Medium' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Medium Dark', value: 'Medium Dark' },
            { label: 'Dark', value: 'Dark' },
        ];
    }
    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: 'Home',
            routerLink: '/',
            disabled: false,
        };
        const obj2: MenuItem = {
            label: 'Inventory',
            routerLink: '/',
            disabled: false,
        };
        const obj3: MenuItem = {
            label: 'New roasted coffee batch',
            disabled: false,
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
        this.breadCrumbItem.push(obj3);
    }
    // Table data
    roasterCoffeeBatchsData() {
        const postData: any = {};

        postData.status = this.profileFilter ? this.profileFilter : '';
        postData.name = this.termSearch ? this.termSearch : '';
        postData.per_page = 100;
        this.tableValue = [];
        this.roasterService.getRoasterCoffeeBatchs(this.roasterId, postData).subscribe(
            (data: any) => {
                if (data.success) {
                    this.tableValue = data.result;
                } else {
                    this.toastrService.error('Error while getting the roasted coffee batch list!');
                }
            },
            (err) => {
                this.toastrService.error('Error while getting the roasted coffee batch list!');
            },
        );
    }

    redirectToEdit(item) {
        this.batchId = item.id;
        this.globals.selected_order_id = item.order_id;
        this.ordId = item.order_id;

        const navigationExtras: NavigationExtras = {
            queryParams: {
                batchId: this.batchId ? this.batchId : undefined,
                ordId: this.ordId ? this.ordId : undefined,
            },
        };
        this.router.navigate(['/roasted-coffee-batch/new-roasted-batch'], navigationExtras);
    }

    deleteRoastedBatch() {
        this.roasterService.deleteRoastedCoffeeBatch(this.roasterId, this.deleteBatchId).subscribe(
            (res) => {
                if (res.success) {
                    this.toastrService.success('Roasted Coffee Batch deleted successfully');
                    this.roasterCoffeeBatchsData();
                } else {
                    this.toastrService.error('Error while deletign the roasting profile');
                }
                this.popupDisplay = false;
            },
            (err) => {
                this.popupDisplay = false;
                this.toastrService.error('Error while deletign the roasting profile');
            },
        );
    }
    filterCall() {
        this.roasterCoffeeBatchsData();
    }

    openDeleteModal(deleteId: any) {
        this.popupDisplay = true;
        this.deleteBatchId = deleteId;
    }
}
