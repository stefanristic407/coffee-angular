import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@services';

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

    constructor(public route: ActivatedRoute, private router: Router, public commonService: CommonService) {}

    ngOnInit(): void {
        this.type = this.route.snapshot.queryParams.type ? this.route.snapshot.queryParams.type : '';
        this.portalId = this.route.snapshot.params.id ?? '';
    }

    gotoListing() {
        this.router.navigate([
            `/customer-management/${this.type === 'Roaster' ? 'customer-listing' : 'partner-listing'}/${this.portalId}`,
        ]);
    }
}
