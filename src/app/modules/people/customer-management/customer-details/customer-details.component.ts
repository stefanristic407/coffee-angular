import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService, GlobalsService, ResizeService } from '@services';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent extends ResizeableComponent implements OnInit {
    appLanguage: any;
    portalId: any;
    portalDetails: any;
    topContacts: any;
    capabilities: any;
    certificates: any;
    breadCrumbData: any[] = [];
    type: string;
    orgType: string;
    currentServiceIndex: number;
    orgIndex: any = {
        hrc: 1,
        mr: 0,
    };
    employeeList: any[] = [];
    loading = true;

    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    public refreshData(feature, title) {
        this.breadCrumbData = [
            {
                label: 'Home',
                routerLink: ['/dashboard'],
                queryParams: {},
            },
            {
                label: 'People',
                routerLink: ['/customer-management'],
                queryParams: {},
            },
            {
                label: 'Customer Management',
                routerLink: ['/customer-management'],
                queryParams: {},
            },
            {
                label: feature,
                routerLink: ['/customer-management'],
                queryParams: { tab: this.orgIndex[feature] },
            },
            {
                label: title,
            },
        ];
    }

    ngOnInit(): void {
        this.portalId = this.route.snapshot.paramMap.get('id');
        this.type = this.route.snapshot.queryParamMap.get('type');
        this.orgType = this.type === 'mr' ? 'micro-roasters' : 'hrc';
        this.breadCrumbData = [
            {
                label: 'Home',
                routerLink: ['/dashboard'],
                queryParams: {},
            },
            {
                label: 'People',
                routerLink: ['/customer-management'],
                queryParams: {},
            },
            {
                label: 'Customer Management',
                routerLink: ['/customer-management'],
                queryParams: {},
            },
            {
                label: this.type,
                routerLink: ['/customer-management'],
                queryParams: { tab: this.orgIndex[this.type] },
            },
            {
                label: '',
            },
        ];
        this.getPortalDetails();
        this.getTopContacts();
        this.getCertificates();
        this.appLanguage = this.globals.languageJson;
    }

    getPortalDetails() {
        this.customerService.getCustomerDetails(this.orgType, this.portalId).subscribe((res) => {
            if (res.success && res.result) {
                this.portalDetails = res.result;
                this.capabilities = res.result.capabilities ? res.result.capabilities.split(',') : [];
                this.refreshData(this.type, this.portalDetails.name);
            } else {
                this.portalDetails = {};
            }
            this.loading = false;
        });
    }
    getTopContacts() {
        this.customerService.getTopContacts(this.type, this.portalId, 'top-contacts').subscribe((res) => {
            if (res.success && res.result) {
                this.topContacts = res.result;
            } else {
                this.topContacts = [];
            }
        });
    }
    getCertificates() {
        this.customerService.getCertificates(this.type, this.portalId).subscribe((res) => {
            if (res.success && res.result) {
                this.certificates = res.result;
            } else {
                this.certificates = [];
            }
        });
    }
}
