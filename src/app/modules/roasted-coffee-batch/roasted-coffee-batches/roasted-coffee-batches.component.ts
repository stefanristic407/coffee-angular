import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, ResizeService, RoasterserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedServiceService } from '@app/shared/services/shared-service.service';
import { MenuItem } from 'primeng/api';
import { ConfirmComponent } from '@shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-roasted-coffee-batches',
    templateUrl: './roasted-coffee-batches.component.html',
    styleUrls: ['./roasted-coffee-batches.component.scss'],
})
export class RoastedCoffeeBatchesComponent extends ResizeableComponent implements OnInit {
    roasterId: number;
    batchId: string | number | boolean;
    profileArray: any = [];
    profileFilter;
    tableColumns = [];
    tableValue = [];
    totalCount = 0;
    termSearch = '';
    selectedProfiles = [];
    breadCrumbItem: MenuItem[] = [];
    disableAction = false;
    ordId: any;
    breadItems = [
        { label: 'Home', routerLink: '/' },
        { label: 'Inventory', routerLink: '/' },
        { label: 'Roasted coffee batches' },
    ];
    isLoadingRoastedBatches = true;

    constructor(
        public router: Router,
        public cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        private fb: FormBuilder,
        public sharedService: SharedServiceService,
        private dialogService: DialogService,
        private authService: AuthService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.sharedService.windowWidth = window.innerWidth;
        if (this.sharedService.windowWidth <= this.sharedService.responsiveStartsAt) {
            this.sharedService.isMobileView = true;
        }
        this.loadFilterValues();
        this.tableColumns = [
            {
                field: 'id',
                header: 'batch_id',
                sortable: true,
                width: 9,
            },
            {
                field: 'roast_batch_name',
                header: 'batch_name',
                sortable: true,
                width: 14,
            },
            {
                field: 'order_id',
                header: 'order_id',
                sortable: true,
                width: 9,
            },
            {
                field: 'estate_name',
                header: 'estate_name',
                sortable: true,
                width: 14,
            },
            {
                field: 'roaster_ref_no',
                header: 'roaster_ref_no',
                sortable: true,
                width: 15,
            },
            {
                field: 'created_at',
                header: 'created_on',
                sortable: true,
                width: 11,
            },
            {
                field: 'roasting_profile_quantity',
                header: 'quantity',
                sortable: true,
                width: 9,
            },
            {
                field: 'roasting_profile_name',
                header: 'roasting_profile',
                sortable: true,
                width: 14,
            },
            {
                field: 'actions',
                header: 'actions',
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

    getData(event = null): void {
        const queryParams = {
            sort_by: 'created_at',
            sort_order: 'desc',
            page: 1,
            per_page: 10,
            query: this.termSearch,
            roast_level: this.profileFilter,
        };
        if (event) {
            if (event.sortField) {
                queryParams.sort_by = event.sortField;
                queryParams.sort_order = event.sortOrder === -1 ? 'desc' : 'asc';
            }
            queryParams.page = event.first / event.rows + 1;
        }
        this.roasterCoffeeBatchsData(queryParams);
    }

    // Table data
    roasterCoffeeBatchsData(queryParams: any) {
        this.tableValue = [];
        this.isLoadingRoastedBatches = true;
        this.roasterService.getRoasterCoffeeBatchs(queryParams).subscribe(
            (data: any) => {
                this.isLoadingRoastedBatches = false;
                if (data.success) {
                    this.tableValue = data.result;
                    this.totalCount = data.result_info.total_count;
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

    deleteRoastedBatch(id: number) {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: 'Are you sure you want to delete this batch?',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.deleteRoastedCoffeeBatch(this.roasterId, id).subscribe(
                        (res) => {
                            if (res.success) {
                                this.toastrService.success('Roasted Coffee Batch deleted successfully');
                                this.roasterCoffeeBatchsData({});
                            } else {
                                this.toastrService.error('Error while deletign the roasting profile');
                            }
                        },
                        (err) => {
                            this.toastrService.error('Error while deletign the roasting profile');
                        },
                    );
                }
            });
    }

    menuClicked() {
        // Stop propagation
        this.disableAction = true;
        setTimeout(() => {
            this.disableAction = false;
        }, 100);
    }
}
