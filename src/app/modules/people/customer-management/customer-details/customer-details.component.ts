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
    type: string;
    orgType: string;
    currentServiceIndex: number;
    orgIndex: number;
    employeeList: any[] = [];
    loading = true;
    isLoading = true;
    partnersList: any[] = [];

    constructor(
        public globals: GlobalsService,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.type = this.route.snapshot.queryParamMap.get('type');
        this.route.params.subscribe((params) => {
            this.portalId = params.id;
            this.orgType = this.type === 'mr' ? 'micro-roasters' : 'hrc';
            this.orgIndex = this.type === 'mr' ? 0 : 1;
            this.getPortalDetails();
            this.getTopContacts();
            this.getCertificates();
            this.appLanguage = this.globals.languageJson;
            if (this.type === 'hrc') {
                this.getPartners();
            }
        });
    }

    getPortalDetails() {
        this.customerService.getCustomerDetails(this.orgType, this.portalId).subscribe((res) => {
            if (res.success && res.result) {
                this.portalDetails = res.result;
                this.capabilities = res.result.capabilities ? res.result.capabilities.split(',') : [];
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

    getPartners() {
        this.customerService.getPartners(this.portalId).subscribe((res) => {
            if (res.success) {
                this.partnersList = res.result ?? [];
            } else {
                this.partnersList = [];
            }
            this.isLoading = false;
        });
    }
}
