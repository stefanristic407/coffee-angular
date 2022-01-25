import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { organizationTypes } from '@constants';
import { OrganizationType, UserStatus } from '@enums';
import { GlobalsService, RoasterService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-customer-management-table',
    templateUrl: './customer-management-table.component.html',
    styleUrls: ['./customer-management-table.component.scss'],
})
export class CustomerManagementTableComponent implements OnInit {
    readonly OrgType = OrganizationType;
    readonly UserStatus = UserStatus;
    estatetermOrigin: any;
    appLanguage?: any;
    folderId: any;

    @Input() searchTerm = '';
    @Input() sortedMainData: any;
    @Input() customerType: OrganizationType;
    @Input() isPartners: boolean;
    @Input() isLoading = true;

    itemId: any;
    isMobileView = false;
    isTabletView = false;
    tableColumns: any[] = [];
    orgTypes: any = {
        HRC: 'hrc',
        MR: 'micro-roasters',
    };

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        public router: Router,
        public globals: GlobalsService,
        public cookieService: CookieService,
        public customer: CustomerServiceService,
        private toasterService: ToastrService,
        private roasterService: RoasterService,
    ) {}

    ngOnInit(): void {
        this.estatetermOrigin = '';
        this.initializeTable();
        this.language();
    }

    initializeTable() {
        if (window.innerWidth <= 767) {
            this.isMobileView = true;
            this.tableColumns = !this.customerType
                ? [
                      {
                          field: 'email',
                          header: 'Email address',
                          sortable: false,
                      },
                      {
                          field: 'organization_type',
                          header: 'Organisation type',
                          sortable: false,
                      },
                  ]
                : [
                      {
                          field: 'admin_id',
                          header: 'Customer ID',
                          sortable: false,
                      },
                      {
                          field: 'name',
                          header: 'Name',
                          sortable: false,
                      },
                      {
                          field: 'discount_percentage',
                          header: 'Discount %',
                          sortable: false,
                      },
                      {
                          field: 'active_users',
                          header: 'Active Users',
                          sortable: false,
                      },
                  ];
        } else {
            this.isMobileView = false;
            this.tableColumns = !this.customerType
                ? [
                      {
                          field: 'email',
                          header: 'email_address',
                          sortable: false,
                      },
                      {
                          field: 'created_at',
                          header: 'created_on',
                          sortable: false,
                      },
                      {
                          field: 'organization_type',
                          header: 'organization_type',
                          sortable: false,
                          width: 200,
                      },
                      {
                          field: 'actions',
                          header: 'actions',
                          sortable: false,
                          width: 150,
                      },
                  ]
                : [
                      {
                          field: 'admin_id',
                          header: 'customer_id',
                          sortable: false,
                          width: 150,
                      },
                      {
                          field: 'name',
                          header: 'name',
                          sortable: false,
                      },
                      {
                          field: 'created_at',
                          header: 'created_on',
                          sortable: true,
                      },
                      {
                          field: 'status',
                          header: 'status',
                          sortable: false,
                          width: 130,
                      },
                      {
                          field: 'discount_percentage',
                          header: 'Discount %',
                          sortable: false,
                      },
                      {
                          field: 'active_users',
                          header: 'active_users',
                          sortable: false,
                          width: 130,
                      },
                      {
                          field: 'actions',
                          header: 'actions',
                          sortable: false,
                          width: 150,
                      },
                  ];
        }
    }

    language() {
        this.appLanguage = this.globals.languageJson;
    }

    shareDetails(size: any) {
        if (!this.customerType) {
            return;
        }
        const navigationExtras: NavigationExtras = {
            queryParams: {
                type: this.customerType,
            },
        };
        this.router.navigate([`/people/customer-details/${size.id}`], navigationExtras);
        // if (size.status === 'PENDING') {
        //     this.customer.emailId = size.email;
        //     if (this.customerType === OrganizationType.MICRO_ROASTER) {
        //         this.customer.pendingMrDetails();
        //     } else {
        //         this.customer.pendingHorecaDetails();
        //     }
        //     this.router.navigate(['/people/pending-details']);
        // } else {
        //     const navigationExtras: NavigationExtras = {
        //         queryParams: {
        //             type: this.customerType,
        //         },
        //     };
        //     this.router.navigate([`/people/customer-details/${size.id}`], navigationExtras);
        // }
    }

    sendInite(event: any, row: any) {
        event.stopPropagation();
        if (row.status === 'PENDING') {
            this.roasterService.sendPortalInvite(row.email, this.orgTypes[row.organization_type]).subscribe((data) => {
                if (data.success === true) {
                    this.toasterService.success('Email has been sent successfully');
                } else {
                    this.toasterService.error('Error while sending email to the User');
                }
            });
        } else {
            this.toasterService.error('This user has been already consumed.');
        }
    }

    getOrgName(orgSlug) {
        const orgItem = organizationTypes.find((item) => item.value === orgSlug);
        return orgItem.title;
    }
}
