import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CommonService, GlobalsService, RoasterService } from '@services';
import { ConfirmComponent } from '@shared';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-roaster-agreements',
    templateUrl: './roaster-agreements.component.html',
    styleUrls: ['./roaster-agreements.component.scss'],
})
export class RoasterAgreementsComponent implements OnInit {
    estatetermOrigin: any;
    customerMob: any;
    roasterId: number;
    deleteAgreementId: any;
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
    @Input() customerType = 'hrc';

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public roasterService: RoasterService,
        public toastrService: ToastrService,
        public globals: GlobalsService,
        public dialogSrv: DialogService,
        private commonService: CommonService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.estatetermOrigin = '';
        this.customerMob = '';
        this.getAgreements();
    }

    getAgreements(event?: any): void {
        this.mainData = [];
        this.loading = true;
        this.roasterService.getAgreements(this.roasterId, this.customerType).subscribe((resp: any) => {
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
                this.toastrService.error(this.globals.languageJson?.error_getting_horeca_list);
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
                    this.roasterService
                        .deleteAgreement(this.roasterId, this.customerType, item)
                        .subscribe((res: any) => {
                            if (res.success) {
                                // this.displayDeleteModal = false;
                                this.toastrService.success(this.globals.languageJson?.success_deleting_agreement);
                                this.getAgreements();
                            } else {
                                this.toastrService.error(this.globals.languageJson?.error_deleting_agreement);
                            }
                        });
                }
            });
    }
}
