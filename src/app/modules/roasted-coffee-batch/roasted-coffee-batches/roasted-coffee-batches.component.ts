import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
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
    profileArray: any = [];
    profileFilter;
    tableColumns = [];
    tableValue = [];
    totalCount = 0;
    termSearch = '';
    selectedProfiles = [];
    popupDisplay = false;
    breadCrumbItem: MenuItem[] = [];
    disableAction = false;
    ordId: any;
    breadItems = [
        { label: 'Home', routerLink: '/' },
        { label: 'Inventory', routerLink: '/' },
        { label: 'Roasted coffee batchs' },
    ];
    isLoadingRoastedBatches = false;

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
        this.roasterCoffeeBatchsData();
    }

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.appLanguage = this.globals.languageJson;
        this.loadFilterValues();
        this.tableColumns = [
            {
                field: 'id',
                header: 'batch_id',
                sortable: false,
                width: 12,
            },
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
            { label: 'Light', value: 1 },
            { label: 'Light Medium', value: 2 },
            { label: 'Medium', value: 3 },
            { label: 'Medium Dark', value: 4 },
            { label: 'Dark', value: 5 },
        ];
    }

    // Table data
    roasterCoffeeBatchsData() {
        const postData: any = {};

        postData.roast_level = this.profileFilter ? this.profileFilter : '';
        postData.batch = this.termSearch ? this.termSearch : '';
        postData.per_page = 100;
        postData.sort_by = 'created_at';
        postData.sort_order = 'desc';
        this.tableValue = [];
        this.isLoadingRoastedBatches = true;
        this.roasterService.getRoasterCoffeeBatchs(postData).subscribe(
            (data: any) => {
                this.isLoadingRoastedBatches = false;
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
        if (!this.disableAction) {
            this.batchId = item.id;
            this.ordId = item.order_id;

            const navigationExtras: NavigationExtras = {
                queryParams: {
                    batchId: this.batchId ? this.batchId : undefined,
                    ordId: this.ordId ? this.ordId : undefined,
                },
            };
            this.router.navigate(['/roasted-coffee-batch/new-roasted-batch'], navigationExtras);
        }
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

    menuClicked() {
        // Stop propagation
        this.disableAction = true;
        setTimeout(() => {
            this.disableAction = false;
        }, 100);
    }

    openDeleteModal(deleteId: any) {
        this.popupDisplay = true;
        this.deleteBatchId = deleteId;
    }
}
