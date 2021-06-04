import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationType } from '@enums';
import { GlobalsService, RoasterserviceService } from '@services';
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
    appLanguage?: any;
    customerActive: any = 0;
    searchTerm: any;
    selectedTab: any = 0;

    selectedStatus: any;
    sortedMainData: any;
    mainData: any;
    statusList: any = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
    ];
    roasterId: string;
    odd: boolean;
    horecaActive: any;
    customerType: OrganizationType;
    navItems: MenuItem[];
    selectedNav: MenuItem;

    constructor(
        public globals: GlobalsService,
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        private route: ActivatedRoute,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            if (params.tab) {
                this.selectedTab = params.tab;
                if (params.tab === '1') {
                    this.customerType = OrganizationType.HORECA;
                    this.MicroRoastersHoreca();
                } else {
                    this.customerType = OrganizationType.MICRO_ROASTER;
                    this.getMicroRoaster();
                }
            }
        });

        this.language();
        this.navItems = [
            { label: this.globals.languageJson?.menu_sales_management },
            { label: this.globals.languageJson?.customer_management },
        ];
        this.selectedNav = { label: this.globals.languageJson?.home, routerLink: '/' };
    }
    language() {
        this.appLanguage = this.globals.languageJson;
        this.customerActive++;
    }

    onTabChange(event) {
        if (event.index === 0) {
            this.customerType = OrganizationType.MICRO_ROASTER;
            this.getMicroRoaster();
        } else if (event.index === 1) {
            this.customerType = OrganizationType.HORECA;
            this.MicroRoastersHoreca();
        }
    }

    getMicroRoaster() {
        this.roasterService.getMicroRoasters(this.roasterId).subscribe((getRoaster: any) => {
            if (getRoaster.success === true) {
                if (getRoaster.result == null || getRoaster.result.length === 0) {
                    this.odd = true;
                    this.toastrService.error('Table Data is empty');
                } else {
                    this.odd = false;
                    this.mainData = getRoaster.result;
                    this.sortedMainData = getRoaster.result;
                }
            } else {
                this.odd = true;
                this.toastrService.error('Error while getting the table list!');
            }
        });
    }

    MicroRoastersHoreca() {
        this.roasterService.getMicroRoastersHoreca(this.roasterId).subscribe((data: any) => {
            if (data.success === true) {
                if (data.result == null || data.result.length === 0) {
                    this.odd = true;
                    this.toastrService.error('Table Data is empty');
                } else {
                    this.odd = false;
                    this.mainData = data.result;
                    this.sortedMainData = data.result;
                }
                this.horecaActive++;
            } else {
                this.odd = true;
                this.toastrService.error('Error while getting the table list!');
            }
        });
    }

    filterStatus() {
        if (!this.selectedStatus) {
            this.sortedMainData = this.mainData;
        } else {
            this.sortedMainData = this.mainData.filter((item) => item.status === this.selectedStatus.toUpperCase());
        }
    }
}
