import { Component, Input, OnInit } from '@angular/core';
import { ResizeableComponent } from '@base-components';
import { OrganizationType } from '@enums';
import { Download } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService, ResizeService, RoasterService } from '@services';
import { ConfirmComponent } from '@shared';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-roaster-agreements',
    templateUrl: './roaster-agreements.component.html',
    styleUrls: ['./roaster-agreements.component.scss'],
})
export class RoasterAgreementsComponent extends ResizeableComponent implements OnInit {
    estatetermOrigin: any;
    customerMob: any;
    horecaList: any;
    newList: any = [];
    mainData: any = [];
    sortedMainData: any = [];
    selectedCustomers: any;
    isUpdate: boolean;
    selectedItemId: number;
    displayDeleteModal = false;
    displayAddEditModal = false;
    loading = false;

    @Input() searchTerm = '';
    @Input() customerType = OrganizationType.HORECA;

    constructor(
        private dialogSrv: DialogService,
        private roasterService: RoasterService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public downloadService: DownloadService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.estatetermOrigin = '';
        this.customerMob = '';
        this.getAgreements();
    }

    getAgreements(event?: any): void {
        this.mainData = [];
        this.loading = true;
        this.roasterService.getAgreements(this.customerType).subscribe((resp: any) => {
            if (resp.success) {
                this.loading = false;
                this.mainData = resp.result;
                if (resp.result === null) {
                    this.sortedMainData = resp.result;
                } else {
                    this.sortedMainData = this.mainData.sort((a, b) => b.created_at.localeCompare(a.created_at));
                    this.newList = this.sortedMainData.map((item) => {
                        const transformItem = { label: '', value: '' };
                        transformItem.label = item.customer_name;
                        transformItem.value = item.customer_name;
                        return transformItem;
                    });
                    this.newList = this.newList.filter((v, i, a) => a.findIndex((t) => t.label === v.label) === i);
                    this.newList = this.newList.sort((a, b) => a.label.localeCompare(b.label));
                }
            } else {
                this.toastrService.error(this.translator.instant('error_getting_horeca_list'));
            }
        });
    }

    onUpdateModal(itemId: any) {
        this.displayAddEditModal = true;
        this.isUpdate = true;
        this.selectedItemId = itemId;
    }

    filterAgrements() {
        if (!this.selectedCustomers || this.selectedCustomers === 'All') {
            this.sortedMainData = this.mainData;
        } else {
            this.sortedMainData = this.mainData.filter((item) => item.customer_name === this.selectedCustomers);
        }
    }

    onUploadModalOpen() {
        this.displayAddEditModal = true;
        this.selectedItemId = null;
        this.isUpdate = false;
    }

    onUpdateModalClose(event?) {
        this.displayAddEditModal = false;
    }

    onOpenDeleteModal(item) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.deleteAgreement(this.customerType, item).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success(this.translator.instant('success_deleting_agreement'));
                            this.getAgreements();
                        } else {
                            this.toastrService.error(this.translator.instant('error_deleting_agreement'));
                        }
                    });
                }
            });
    }

    onDownloadModal(item) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Please confirm!',
                    desp: 'Are you sure want to download',
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.downloadService.download(item.url, item.file_name, item.file_mime).subscribe(
                        (res: Download) => {
                            if (res.state === 'DONE') {
                                this.toastrService.success('Downloaded successfully');
                            }
                        },
                        (error) => {
                            this.toastrService.error('Download failed');
                        },
                    );
                }
            });
    }

    getMenuItems(item) {
        let menu = [
            this.resizeService.isMobile()
                ? {
                      label: this.translator.instant('update'),
                      routerLink: `/sales-contract/${this.customerType}/${item.id}`,
                  }
                : { label: this.translator.instant('update'), command: () => this.onUpdateModal(item.id) },
            { label: this.translator.instant('delete'), command: () => this.onOpenDeleteModal(item.id) },
        ];
        if (this.resizeService.isMobile()) {
            menu.push({ label: this.translator.instant('download'), command: () => this.onDownloadModal(item.id) });
        }
        return menu;
    }
}
