// AUTHOR : Gaurav Kunal
// PAGE DESCRIPTION : This page contains functions of sales contract roaster agreements.

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasteryProfileService } from '@services';
import { RoasterserviceService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-roaster-agreements',
    templateUrl: './roaster-agreements.component.html',
    styleUrls: ['./roaster-agreements.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RoasterAgreementsComponent implements OnInit {
    estatetermOrigin: any;
    customerMob: any;
    roasterId: string;
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

    @Input() searchTerm = '';
    @Input() customerType = 'hrc';

    constructor(
        public router: Router,
        public cookieService: CookieService,
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public roasteryProfileService: RoasteryProfileService,
        public globals: GlobalsService,
        public dialogSrv: DialogService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.estatetermOrigin = '';
        this.customerMob = '';
        this.getAgreements();
    }

    getCountryName(code: any): void {
        const country = this.roasteryProfileService.countryList.find((con) => con.isoCode === code);
        return country ? country.name : '';
    }

    getAgreements(event?: any): void {
        this.mainData = [];
        this.roasterService.getAgreements(this.roasterId, this.customerType).subscribe((resp: any) => {
            if (resp.success) {
                this.mainData = resp.result;
                this.sortedMainData = this.mainData.sort((a, b) => b.created_at.localeCompare(a.created_at));
                this.newList = this.sortedMainData.map((item) => {
                    const transformItem = { label: '', value: '' };
                    transformItem.label = item.customer_name;
                    transformItem.value = item.customer_name;
                    return transformItem;
                });
                const allOption = { label: 'All', value: 'All' };
                this.newList.push(allOption);
                this.newList = this.newList.filter((v, i, a) => a.findIndex((t) => t.label === v.label) === i);
                this.newList = this.newList.sort((a, b) => a.label.localeCompare(b.label));
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
                showHeader: false,
                styleClass: 'confirm-dialog',
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
