import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, CustomerService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-customer-contact-info',
    templateUrl: './customer-contact-info.component.html',
    styleUrls: ['./customer-contact-info.component.scss'],
})
export class CustomerContactInfoComponent implements OnInit {
    @Input() data: any;
    @Input() mobileView = false;
    portalId: any;
    type: any;
    employeeCount = 0;
    customerList: any[] = [];
    discountPercentage = 0;
    isEdit = false;

    constructor(
        public route: ActivatedRoute,
        private router: Router,
        public commonService: CommonService,
        private customerService: CustomerService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.type = this.route.snapshot.queryParams.type ? this.route.snapshot.queryParams.type : '';
        this.portalId = this.route.snapshot.params.id ?? '';
        this.discountPercentage = this.data.discount_percentage;
    }

    gotoListing() {
        this.router.navigate([
            `/customer-management/${this.type === 'Roaster' ? 'customer-listing' : 'partner-listing'}/${this.portalId}`,
        ]);
    }

    updateDiscount() {
        const orgType = this.type === 'mr' ? 'micro-roasters' : 'hrc';
        this.customerService.updateDiscount(orgType, this.portalId, this.discountPercentage).subscribe((res) => {
            if (res.success) {
                this.data.discount_percentage = this.discountPercentage;
            } else {
                this.toastrService.error('Failed to update discount percentage.');
            }
            this.isEdit = false;
        });
    }
}
