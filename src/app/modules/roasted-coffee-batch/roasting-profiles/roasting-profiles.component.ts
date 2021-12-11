import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService, InventoryService, ResizeService, RoasterService, UserService } from '@services';
import { ConfirmComponent } from '@shared';
import { toSentenceCase } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-roasting-profiles',
    templateUrl: './roasting-profiles.component.html',
    styleUrls: ['./roasting-profiles.component.scss'],
})
export class RoastingProfilesComponent extends ResizeableComponent implements OnInit {
    roleId: any;
    profileID: any;
    breadItems = [
        { label: 'Home', routerLink: '/' },
        { label: 'Inventory' },
        { label: 'Roasted coffee', routerLink: '/roasted-coffee-batch/roasted-coffee-batchs' },
        { label: 'Roasting profiles' },
    ];
    roastLevelArray: any[];
    roastLevelFilter;
    tableColumns = [];
    tableValue = [];
    totalCount = 0;
    termSearch = '';
    selectedProfiles = [];
    disableAction = false;
    isLoadingProfiles = true;

    constructor(
        private dialogService: DialogService,
        private generalService: GeneralService,
        private roasterService: RoasterService,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        private inventorySrv: InventoryService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.getRoastLevels();
        this.tableColumns = [
            {
                field: 'roast_name',
                header: 'roast_name',
                width: 25,
            },
            {
                field: 'roast_level_id',
                header: 'roast_level',
                width: 20,
            },
            {
                field: 'temperature',
                header: 'temperature',
                width: 20,
            },
            {
                field: 'roast_duration',
                header: 'duration',
                width: 20,
            },
        ];
        if (!this.resizeService.isMobile()) {
            this.tableColumns.push({
                field: 'actions',
                header: 'actions',
                width: 15,
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
            per_page: 10,
            search_query: this.termSearch,
            roast_level: this.roastLevelFilter,
        };
        if (event) {
            if (event.sortField) {
                queryParams.sort_by = event.sortField;
                queryParams.sort_order = event.sortOrder === -1 ? 'desc' : 'asc';
            }
            queryParams.page = event.first / event.rows + 1;
        }
        this.getRoastingProfile(queryParams);
    }

    getRoastingProfile(queryParams: any) {
        this.isLoadingProfiles = true;
        this.inventorySrv.getRoastingProfiles(queryParams).subscribe(
            (data: any) => {
                this.isLoadingProfiles = false;
                if (data.success) {
                    this.tableValue = data.result || [];
                    this.totalCount = data.result_info.total_count;
                } else {
                    this.toastrService.error('Error while getting the roasting profile list!');
                }
            },
            (err) => {
                this.toastrService.error('Error while getting the roasting profile list!');
            },
        );
    }

    getRoastLevel(data: number): string {
        return this.roastLevelArray?.find((ix) => ix.id === data)?.name || '--';
    }

    redirectToEdit(item) {
        if (!this.disableAction) {
            this.profileID = item;
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    profileID: encodeURIComponent(this.profileID),
                },
            };
            this.router.navigate(['/roasted-coffee-batch/create-roasting-profile'], navigationExtras);
        }
    }

    deleteRoastingProfile(id: number) {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.translator.instant('confirm_delete_roast_profile_desp'),
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.inventorySrv.deleteRoastingProfile(id).subscribe(
                        (res) => {
                            if (res.success) {
                                this.toastrService.success('Roasted profile deleted successfully');
                                this.getData();
                            } else {
                                this.toastrService.error('Error while deleting roasting profile');
                            }
                        },
                        (err) => {
                            this.toastrService.error('Error while deleting roasting profile');
                        },
                    );
                }
            });
    }

    getMenuItemsForItem(item) {
        return [{ label: this.translator.instant('delete'), command: () => this.deleteRoastingProfile(item.id) }];
    }
}
