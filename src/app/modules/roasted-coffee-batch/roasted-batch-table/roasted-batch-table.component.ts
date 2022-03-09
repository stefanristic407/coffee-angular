import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { RoastedBatch } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService, InventoryService, ResizeService } from '@services';
import { ConfirmComponent } from '@shared';
import { toSentenceCase } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-roasted-batch-table',
    templateUrl: './roasted-batch-table.component.html',
    styleUrls: ['./roasted-batch-table.component.scss'],
})
export class RoastedBatchTableComponent extends ResizeableComponent implements OnInit {
    isTestBatch = false;
    isLoading = true;
    roastLevelArray: MenuItem[] = [];
    profileFilter;
    tableColumns = [];
    tableValue = [];
    rows = 10;
    totalCount = 0;
    termSearch = '';

    constructor(
        private dialogService: DialogService,
        private generalService: GeneralService,
        private inventorySrv: InventoryService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
        this.route.data.subscribe((data) => {
            this.isTestBatch = !!data.isTestBatch;
            this.getData();
        });
    }

    ngOnInit(): void {
        this.getRoastLevels();
        this.tableColumns = [];
        this.tableColumns = this.tableColumns.concat([
            {
                field: 'id',
                header: 'batch_id',
                sortable: true,
                width: 10,
            },
            {
                field: 'name',
                header: 'batch_name',
                sortable: true,
                width: 12,
            },
            {
                field: 'gc_order_id',
                header: 'gc_order_id',
                sortable: true,
                width: 10,
            },
            {
                field: 'estate_name',
                header: 'estate_name',
                sortable: true,
                width: 12,
            },
            {
                field: 'order_ref_no',
                header: 'roasters_gc_ref',
                sortable: true,
                width: 13,
            },
            {
                field: 'created_at',
                header: 'created_on',
                sortable: true,
                width: 10,
            },
            {
                field: 'remaining_quantity',
                header: 'quantity',
                sortable: true,
                width: 8,
            },
            {
                field: 'roasting_profile_name',
                header: 'roasting_profile',
                sortable: true,
                width: 13,
            },
        ]);
        if (!this.resizeService.isMobile()) {
            this.tableColumns.push({
                field: 'actions',
                header: 'actions',
                width: 12,
            });
        }
    }

    getRoastLevels() {
        this.generalService.getRoastLevels().subscribe((res) => {
            if (res.success) {
                this.roastLevelArray = (res.result || []).map((ix) => ({ ...ix, name: toSentenceCase(ix.name) }));
            }
        });
    }

    getData(event = null): void {
        const queryParams = {
            sort_by: 'created_at',
            sort_order: 'desc',
            page: 1,
            per_page: this.rows,
            query: this.termSearch,
            roast_level: this.profileFilter,
            is_test_batch: this.isTestBatch,
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

    roasterCoffeeBatchsData(queryParams: any) {
        this.isLoading = true;
        this.inventorySrv.getRoastedBatches(queryParams).subscribe(
            (data: any) => {
                if (data.success) {
                    this.tableValue = data.result;
                    this.totalCount = data.result_info.total_count;
                } else {
                    this.toastrService.error('Error while getting the roasted coffee batch list!');
                }
                this.isLoading = false;
            },
            (err) => {
                this.toastrService.error('Error while getting the roasted coffee batch list!');
            },
        );
    }

    redirectToEdit(item: RoastedBatch) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                batchId: item.id || undefined,
                ordId: item.gc_order_id || undefined,
            },
        };
        this.router.navigate(['/roasted-coffee-batch/new-roasted-batch'], navigationExtras);
    }

    deleteRoastedBatch(id: number) {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.translator.instant('confirm_delete_roasted_batch_desp'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.inventorySrv.deleteRoastedBatch(id).subscribe(
                        (res) => {
                            if (res.success) {
                                this.toastrService.success('Roasted Coffee Batch deleted successfully');
                                this.getData();
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

    getMenuItemsForItem(item: RoastedBatch) {
        return [{ label: this.translator.instant('delete'), command: () => this.deleteRoastedBatch(item.id) }];
    }
}
