// AUTHOR : Gaurav Kunal
// PAGE DESCRIPTION : This page contains functions of sales contract roaster agreements.

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { RoasterserviceService } from '@services';

@Component({
    selector: 'app-roaster-agreements',
    templateUrl: './roaster-agreements.component.html',
    styleUrls: ['./roaster-agreements.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RoasterAgreementsComponent implements OnInit {
    appLanguage?: any;
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
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        // Auth checking
        if (this.cookieService.get('Auth') === '') {
            this.router.navigate(['/auth/login']);
        }
        this.estatetermOrigin = '';
        this.customerMob = '';
        this.getAgreements();
        if (this.customerType === 'micro-roasters') {
            this.getMicroRoastersList();
        } else if (this.customerType === 'hrc') {
            this.getHorecaList();
        }
    }

    // Function Name: Get Country Name
    // Description: This function helps to transfer country code to full country name.

    getCountryName(code: any): void {
        const country = this.roasteryProfileService.countryList.find((con) => con.isoCode === code);
        return country ? country.name : '';
    }

    // Function Name: Get Agreements
    // Description: This function helps to fetch the all agreemnts

    getAgreements(event?: any): void {
        this.mainData = [];
        // tslint:disable-next-line: deprecation
        this.roasterService.getAgreements(this.roasterId, this.customerType).subscribe((resp: any) => {
            if (resp.success) {
                this.mainData = resp.result;
                this.sortedMainData = this.mainData.sort((a, b) => b.created_at.localeCompare(a.created_at));
            } else {
                this.toastrService.error('Error while getting the agreement list!');
            }
        });
    }

    // Function Name: Get Micro Roaster
    // Description: This function helps to fetch the all micro roaster list

    getMicroRoastersList(): void {
        // tslint:disable-next-line: deprecation
        this.roasterService.getMicroRoastersList(this.roasterId).subscribe((res: any) => {
            this.newList = [];
            if (res.success) {
                this.horecaList = res.result;
                this.horecaList.forEach((element) => {
                    if (element.id > 0) {
                        this.newList.push(element);
                    }
                });
                this.newList = this.newList.map((item) => {
                    const transformItem = { label: '', value: '' };
                    transformItem.label = item.name;
                    transformItem.value = item.name;
                    return transformItem;
                });
                const allOption = { label: 'All', value: 'All' };
                this.newList.push(allOption);
                this.newList = this.newList.sort((a, b) => a.label.localeCompare(b.label));
            } else {
                this.toastrService.error('Error while getting HoReCa list');
            }
        });
    }

    // Function Name: Get Horeca List
    // Description: This function helps to fetch the all horeca list

    getHorecaList(): void {
        // tslint:disable-next-line: deprecation
        this.roasterService.getMicroRoastersHoreca(this.roasterId).subscribe((res: any) => {
            this.newList = [];
            if (res.success) {
                this.horecaList = res.result;
                this.horecaList.forEach((element) => {
                    if (element.id > 0) {
                        this.newList.push(element);
                    }
                });
                this.newList = this.newList.map((item) => {
                    const transformItem = { label: '', value: '' };
                    transformItem.label = item.name;
                    transformItem.value = item.name;
                    return transformItem;
                });
                const allOption = { label: 'All', value: 'All' };
                this.newList.push(allOption);
                this.newList = this.newList.sort((a, b) => a.label.localeCompare(b.label));
            } else {
                this.toastrService.error('Error while getting HoReCa list');
            }
        });
    }

    // Function Name: Update Modal
    // Description: This function helps to fetch the indiviual details of the column

    onUpdateModal(itemId: any) {
        this.displayAddEditModal = true;
        this.isUpdate = true;
        this.selectedItemId = itemId;
    }

    // Function Name: Filter Agreements
    // Description: This function helps to filter agrements based on dropdown

    filterAgrements() {
        if (!this.selectedCustomers || this.selectedCustomers === 'All') {
            this.sortedMainData = this.mainData;
        } else {
            this.sortedMainData = this.mainData.filter((item) => item.customer_name === this.selectedCustomers);
        }
    }

    // Function Name: Upload Modal Open
    // Description: This function helps to set the value of radio button when upload button is clicked

    onUploadModalOpen() {
        this.displayAddEditModal = true;
        this.selectedItemId = null;
        this.isUpdate = false;
    }

    // Function Name: Update Modal Close
    // Description: This function helps to close the dialog when cross button is clicked

    onUpdateModalClose(event?) {
        this.displayAddEditModal = false;
    }

    // Function Name: Delete Modal
    // Description: This function helps to capture indiviual agreement id to delete a agrement

    onOpenDeleteModal() {
        this.displayDeleteModal = true;
    }

    // Function Name: Delete Agreement
    // Description: This function helps to delete a agrement

    deleteAgreement(item: any) {
        // tslint:disable-next-line: deprecation
        this.roasterService.deleteAgreement(this.roasterId, this.customerType, item).subscribe((res: any) => {
            if (res.success) {
                this.displayDeleteModal = false;
                this.toastrService.success('The Selected agreement deleted successfully!');
                this.getAgreements();
            } else {
                this.toastrService.error('Error while deleting the agreement');
            }
        });
    }
}
