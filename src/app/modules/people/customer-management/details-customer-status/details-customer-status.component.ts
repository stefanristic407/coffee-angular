import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-details-customer-status',
    templateUrl: './details-customer-status.component.html',
    styleUrls: ['./details-customer-status.component.scss'],
})
export class DetailsCustomerStatusComponent implements OnInit {
    roasterId: any;
    @Input() customerType: string;
    constructor(public customerService: CustomerServiceService, public cookieService: CookieService) {}

    ngOnInit(): void {}
}
