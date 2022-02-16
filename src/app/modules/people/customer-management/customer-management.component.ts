import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USER_STATUS_ITEMS } from '@constants';
import { InvitationStatus, OrganizationType } from '@enums';
import { AuthService, GlobalsService, RoasterService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-customer-management',
    templateUrl: './customer-management.component.html',
    styleUrls: ['./customer-management.component.scss'],
})
export class CustomerManagementComponent implements OnInit {
    readonly OrgType = OrganizationType;
    readonly USER_STSTUS_ITEMS = USER_STATUS_ITEMS;
    appLanguage?: any;
    customerActive: any = 0;
    searchTerm: any;
    searchTitle = this.globals.languageJson?.search_by_name_customer;
    selectedTab: any = 0;

    selectedStatus: any;
    sortedMainData: any;
    mainData: any;
    roasterId: number;
    odd: boolean;
    horecaActive: any;
    customerType: OrganizationType;
    navItems: MenuItem[];
    selectedNav: MenuItem;
    keyword?: string;
    pages: any;
    isLoading = false;
    totalRecords = 0;

    constructor(
        public globals: GlobalsService,
        private roasterService: RoasterService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        private route: ActivatedRoute,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.selectedTab = params.tab;
            if (this.selectedTab === '1') {
                this.customerType = OrganizationType.HORECA;
                this.getPartnerDetails();
            } else {
                this.customerType = OrganizationType.MICRO_ROASTER;
                this.getMicroRoaster();
            }
        });

        this.language();
        this.navItems = [
            { label: this.globals.languageJson?.menu_sales_management },
            { label: this.globals.languageJson?.customer_management },
        ];
        this.selectedNav = { label: this.globals.languageJson?.home, routerLink: '/' };
        this.sortedMainData = [];
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.customerActive++;
    }

    onTabChange(event) {
        if (event.index === 0) {
            this.customerType = OrganizationType.MICRO_ROASTER;
            this.pages = 0;
            this.searchTitle = this.globals.languageJson?.search_by_name_customer;
            this.getMicroRoaster();
        } else if (event.index === 1) {
            this.customerType = OrganizationType.HORECA;
            this.pages = 0;
            this.searchTitle = this.globals.languageJson?.search_by_name_customer;
            this.getPartnerDetails();
        } else if (event.index === 2) {
            this.customerType = null;
            this.pages = 0;
            this.searchTitle = this.globals.languageJson?.search_by_email;
            this.getInvitedUsers();
        }
    }

    getMicroRoaster() {
        this.isLoading = true;
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            page: this.pages ? this.pages + 1 : 1,
            per_page: 10,
        };
        this.sortedMainData = [];
        this.mainData = [];
        this.roasterService.getMicroRoasters(this.roasterId, params).subscribe((getRoaster: any) => {
            if (getRoaster.success) {
                if (getRoaster.result == null || getRoaster.result.length === 0) {
                    this.odd = true;
                    // this.toastrService.error('Table Data is empty');
                } else {
                    this.odd = false;
                    this.mainData = getRoaster.result;
                    this.totalRecords = getRoaster.result_info.total_count;
                    this.sortedMainData = this.mainData;
                }
            } else {
                this.odd = true;
                this.toastrService.error('Error while getting the table list!');
            }
            this.isLoading = false;
        });
    }

    getPartnerDetails() {
        this.isLoading = true;
        const params = {
            sort_by: 'created_at',
            sort_order: 'desc',
            page: this.pages ? this.pages + 1 : 1,
            per_page: 10,
        };
        this.sortedMainData = [];
        this.mainData = [];
        this.roasterService.getPartnerDetails(this.roasterId, params).subscribe((data: any) => {
            if (data.success) {
                if (data.result == null || data.result.length === 0) {
                    this.odd = true;
                    // this.toastrService.error('Table Data is empty');
                } else {
                    this.odd = false;
                    this.mainData = data.result;
                    this.sortedMainData = data.result;
                    this.totalRecords = data.result_info.total_count;
                }
                this.horecaActive++;
            } else {
                this.odd = true;
                this.toastrService.error('Error while getting the table list!');
            }
            this.isLoading = false;
        });
    }

    getInvitedUsers() {
        this.isLoading = true;
        const params = {
            status: InvitationStatus.PENDING,
            sort_by: 'created_at',
            sort_order: 'desc',
            page: this.pages ? this.pages + 1 : 1,
            per_page: 10,
        };
        this.sortedMainData = [];
        this.mainData = [];
        this.roasterService.getInviteUsers(params).subscribe((getRoaster: any) => {
            if (getRoaster.success) {
                if (getRoaster.result == null || getRoaster.result.length === 0) {
                    this.odd = true;
                    // this.toastrService.error('Table Data is empty');
                } else {
                    this.odd = false;
                    this.mainData = getRoaster.result;
                    this.totalRecords = getRoaster.result_info.total_count;
                    this.sortedMainData = this.mainData;
                }
            } else {
                this.odd = true;
                this.toastrService.error('Error while getting the table list!');
            }
            this.isLoading = false;
        });
    }

    filterStatus() {
        if (!this.selectedStatus) {
            this.sortedMainData = this.mainData;
        } else {
            this.sortedMainData = this.mainData.filter((item) => item.status === this.selectedStatus.toUpperCase());
        }
    }

    paginate(event: any) {
        this.pages = event.page;
        if (this.customerType === 'mr') {
            this.getMicroRoaster();
        } else if (this.customerType === 'hrc') {
            this.getPartnerDetails();
        } else {
            this.getInvitedUsers();
        }
    }
}
