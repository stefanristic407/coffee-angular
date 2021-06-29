import { Component, Input, OnInit, HostListener } from '@angular/core';
import { GlobalsService, RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { CustomerServiceService } from '../customer-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { OrganizationType, UserStatus } from '@enums';
import { organizationTypes } from '@constants';
import { ToastrService } from 'ngx-toastr';

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
        private roasterService: RoasterserviceService,
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
                          header: 'Email address',
                          sortable: false,
                      },
                      {
                          field: 'created_at',
                          header: 'Created On',
                          sortable: false,
                      },
                      {
                          field: 'organization_type',
                          header: 'Organisation type',
                          sortable: false,
                          width: 200,
                      },
                      {
                          field: 'actions',
                          header: 'Actions',
                          sortable: false,
                          width: 150,
                      },
                  ]
                : [
                      {
                          field: 'admin_id',
                          header: 'Customer Id',
                          sortable: false,
                          width: 150,
                      },
                      {
                          field: 'name',
                          header: 'Name',
                          sortable: false,
                      },
                      {
                          field: 'created_at',
                          header: 'Created On',
                          sortable: true,
                      },
                      {
                          field: 'status',
                          header: 'Status',
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
                          header: 'Active Users',
                          sortable: false,
                          width: 130,
                      },
                      {
                          field: 'actions',
                          header: 'Actions',
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
        if (size.status === 'PENDING') {
            this.customer.emailId = size.email;
            if (this.customerType === OrganizationType.MICRO_ROASTER) {
                this.customer.pendingMrDetails();
            } else {
                this.customer.pendingHorecaDetails();
            }
            this.router.navigate(['/people/pending-details']);
        } else {
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    type: this.customerType,
                },
            };
            this.router.navigate([`/people/customer-details/${size.id}`], navigationExtras);
        }
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
